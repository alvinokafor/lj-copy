import { Text } from "@/components/partials";
import { theme, unit } from "@/constants";
import { BackIcon } from "@/icons";
import React, { useRef } from "react";
import { Pressable, View } from "react-native";
import { RightCaret } from "@/icons";
import { useRouter } from "expo-router";
import { Button } from "@/components/partials";
import { DeleteAccountIcon, LogoutIcon } from "@/components/settings/icons";
import { NotificationManagementModal } from "@/components/settings";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

export default function Notifications() {
  const router = useRouter();

  const newLikesModalRef = useRef<BottomSheetModalMethods>(null);
  const newMatchesModalRef = useRef<BottomSheetModalMethods>(null);
  const superlikesModalRef = useRef<BottomSheetModalMethods>(null);
  const rosesModalRef = useRef<BottomSheetModalMethods>(null);
  const newMessagesModalRef = useRef<BottomSheetModalMethods>(null);

  const likesSettings = [
    {
      title: "New Likes",
      onPress: () => {
        newLikesModalRef.current?.present();
      },
    },
    {
      title: "New Matches",
      onPress: () => {
        newMatchesModalRef.current?.present();
      },
    },
  ];

  const superlikesAndRosesSettings = [
    {
      title: "Superlikes",
      onPress: () => {
        superlikesModalRef.current?.present();
      },
    },
    {
      title: "Roses",
      onPress: () => {
        rosesModalRef.current?.present();
      },
    },
  ];

  return (
    <>
      <View
        style={{
          marginTop: theme.space[80],
          height: "100%",
        }}
        className="relative"
      >
        <View
          style={{
            paddingHorizontal: theme.space[14],
          }}
        >
          <View
            style={{
              paddingBottom: theme.space[8],
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Pressable
              style={{ paddingRight: unit(12) }}
              onPress={() => router.back()}
            >
              <BackIcon />
            </Pressable>
            <Text size={4} weight="medium">
              Notifications
            </Text>
          </View>

          <View style={{ paddingTop: unit(20) }}>
            <Text className="text-[#9C9C96]" size={0} weight="medium">
              Likes & Matches
            </Text>

            <View
              style={{ display: "flex", gap: unit(8), paddingTop: unit(3) }}
            >
              {likesSettings.map((item, index) => (
                <SettingsItem
                  key={index}
                  title={item.title}
                  onPress={item.onPress}
                />
              ))}
            </View>
          </View>

          <View style={{ paddingTop: unit(18) }}>
            <Text className="text-[#9C9C96]" size={0} weight="medium">
              Superlikes & Roses
            </Text>

            <View
              style={{ display: "flex", gap: unit(8), paddingTop: unit(8) }}
            >
              {superlikesAndRosesSettings.map((item, index) => (
                <SettingsItem
                  key={index}
                  title={item.title}
                  onPress={item.onPress}
                />
              ))}
            </View>
          </View>

          <View style={{ paddingTop: unit(18) }}>
            <Text className="text-[#9C9C96]" size={0} weight="medium">
              Chats
            </Text>

            <View
              style={{ display: "flex", gap: unit(8), paddingTop: unit(8) }}
            >
              <SettingsItem
                title={"New Messages"}
                onPress={() => {
                  newMessagesModalRef.current?.present();
                }}
              />
            </View>
          </View>
        </View>
      </View>

      <NotificationManagementModal ref={newLikesModalRef} title="New Likes" />
      <NotificationManagementModal
        ref={newMatchesModalRef}
        title="New Matches"
      />
      <NotificationManagementModal
        ref={superlikesModalRef}
        title="Superlikes"
      />
      <NotificationManagementModal ref={rosesModalRef} title="Roses" />
      <NotificationManagementModal
        ref={newMessagesModalRef}
        title="New Messages"
      />
    </>
  );
}

function SettingsItem({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: unit(12),
        borderBottomWidth: unit(1),
        borderBottomColor: "#F3F3F2",
      }}
      onPress={onPress}
    >
      <Text weight="medium">{title}</Text>

      <RightCaret />
    </Pressable>
  );
}
