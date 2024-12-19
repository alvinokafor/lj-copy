import { theme, unit } from "@/constants";
import React, { useEffect } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Flex, Text } from "@/components/partials";
import {
  ChatDeliveredIcon,
  GoBackIcon,
  KebabMenuIcon,
} from "@/components/chat/icons";
import {
  ChatInput,
  ReportBottomSheet,
  MoreOptionsModal,
  MuteNotificationsBottomSheet,
  BlockBottomSheet,
} from "@/components/chat";
import { useRouter } from "expo-router";
import { useRef } from "react";
import {
  BottomSheetMethods,
  BottomSheetModalMethods,
} from "@gorhom/bottom-sheet/lib/typescript/types";
import { setDoc, doc, Timestamp, collection, addDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { UserAdapter, useUserQuery } from "@/adapters/UserAdapter";
import { queryKeys } from "@/constants/query-keys";

export default function ChatScreen() {
  const [text, setText] = React.useState("");
  const [image, setImage] = React.useState("");

  const { data, isPending } = useUserQuery({
    queryCallback: UserAdapter.getUserProfile,
    queryKey: [queryKeys.USER],
  });

  const moreOptionsModalRef = useRef<BottomSheetMethods>(null);
  const reportBottomSheetRef = useRef<BottomSheetMethods>(null);
  const muteNotificationsBottomSheetRef = useRef<BottomSheetMethods>(null);
  const blockBottomSheetRef = useRef<BottomSheetMethods>(null);

  const router = useRouter();

  useEffect(() => {
    const createRoom = async () => {
      let roomId = "room_1";
      await setDoc(doc(db, "rooms", roomId), {
        roomId,
        createdAt: Timestamp.fromDate(new Date()),
      });
    };

    createRoom();
  }, []);

  const handleSendMessage = async () => {
    try {
      const docRef = doc(db, "rooms", "room_1");
      const messagesCollection = collection(docRef, "messages");
      const newMessage = await addDoc(messagesCollection, {
        message: text,
        createdAt: Timestamp.fromDate(new Date()),
        userId: data?.data._id,
        senderName: data?.data.firstName + " " + data?.data.lastName,
      });

      console.log(newMessage.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <View
          style={{
            marginTop: theme.space[80],
          }}
        >
          <Flex
            className="pr-[21px]"
            direction="row"
            align="center"
            justify="space-between"
            style={{ borderBottomWidth: 1, borderBottomColor: "#F3F3F2" }}
          >
            <View style={styles.chatHeader}>
              <Pressable onPress={() => router.back()}>
                <GoBackIcon />
              </Pressable>
              <Flex direction="row" align="center" gap={12}>
                <Avatar image="https://images.unsplash.com/photo-1541216970279-affbfdd55aa8?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                <Flex gap={4} align="flex-start">
                  <Text size={2} weight="semibold" className="text-[#1A1A19]">
                    Toyosi Adebayo
                  </Text>
                  <Pressable>
                    <Text size={0} className="text-light-grey">
                      View Profile
                    </Text>
                  </Pressable>
                </Flex>
              </Flex>
            </View>
            <Pressable onPress={() => moreOptionsModalRef?.current?.expand()}>
              <KebabMenuIcon />
            </Pressable>
          </Flex>

          <ScrollView
            style={{ paddingTop: unit(30), paddingHorizontal: theme.space[18] }}
            contentContainerStyle={{ gap: theme.space[2] }}
          >
            <ChatBubble
              message="How are you doing?"
              isLocalUser
              isDelivered
              time="5:00 AM"
            />
            <ChatBubble
              message="I am doing very okay, what about you?"
              isLocalUser={false}
              isDelivered
              time="5:00 AM"
            />
            <ChatBubble
              message="How are you doing?"
              isLocalUser
              isDelivered
              time="5:00 AM"
            />
            <ChatBubble
              message="I am doing very okay, what about you?"
              isLocalUser={false}
              isDelivered
              time="5:00 AM"
            />
            <ChatBubble
              message="How are you doing?"
              isLocalUser
              isDelivered
              time="5:00 AM"
            />
            <ChatBubble
              message="I am doing very okay, what about you?"
              isLocalUser={false}
              isDelivered
              time="5:00 AM"
            />
          </ScrollView>
        </View>

        <View
          style={{ paddingHorizontal: unit(22), bottom: unit(40) }}
          className="absolute w-full bg-white"
        >
          <ChatInput
            handleSendMessage={handleSendMessage}
            text={text}
            setText={setText}
            setImage={setImage}
          />
        </View>
      </View>
      <MoreOptionsModal
        reportBottomSheetRef={reportBottomSheetRef}
        muteNotificationsBottomSheetRef={muteNotificationsBottomSheetRef}
        blockBottomSheetRef={blockBottomSheetRef}
        ref={moreOptionsModalRef}
      />
      <ReportBottomSheet ref={reportBottomSheetRef} />
      <MuteNotificationsBottomSheet ref={muteNotificationsBottomSheetRef} />
      <BlockBottomSheet ref={blockBottomSheetRef} />
    </>
  );
}

function ChatBubble({
  message,
  time,
  isDelivered,
  isLocalUser,
}: {
  message: string;
  time: string;
  isDelivered: boolean;
  isLocalUser: boolean;
}) {
  return (
    <View>
      <View
        style={[
          styles.chatBubbleContainer,
          { backgroundColor: isLocalUser ? "#FBF5E9" : "#F3F3F2" },
        ]}
        className={isLocalUser ? "self-end" : ""}
      >
        <Text className="text-[#1A1A19] text-left">{message}</Text>
      </View>

      <Flex
        direction="row"
        align="center"
        gap={6}
        className={isLocalUser ? "self-end" : ""}
        pt={5}
      >
        <Text size={10} className="text-light-grey ">
          {time} {"  "} Delivered
        </Text>
        {isDelivered && <ChatDeliveredIcon />}
      </Flex>
    </View>
  );
}

const styles = StyleSheet.create({
  chatHeader: {
    paddingBottom: theme.space[13],
    display: "flex",
    alignItems: "center",
    paddingHorizontal: theme.space[14],
    flexDirection: "row",
    gap: theme.space[8],
    // borderBottomWidth: 1,
    // borderBottomColor: "#F3F3F2", // You can change this to your preferred focus color
  },

  chatBubbleContainer: {
    paddingHorizontal: theme.space[18],
    paddingVertical: theme.space[12],
    borderRadius: unit(10),
    maxWidth: unit(200),
  },
});
