import React, { useCallback, useMemo, forwardRef } from "react";
import { View, Pressable, Image, TextInput, ScrollView } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { theme, unit } from "@/constants";
import { CoinStoreIcon, LargeSendSuperLikeIcon, ModalCloseIcon } from "@/icons";
import Text from "../text";
import Flex from "../flex";
import Button from "../button";
import Toast from "react-native-toast-message";
import {
  useMatchingMutation,
  MatchingAdapter,
} from "@/adapters/MatchingAdapter";
import { set } from "zod";

interface IProps {
  name: string;
  image: string;
  icon: any;
  interaction: "Rose" | "Superlike";
  userId: string;
  setHasSufficientCoins: React.Dispatch<React.SetStateAction<boolean>>;
  coinStoreRef: any;
}

const SendInteractionModal = forwardRef<BottomSheetModalMethods, IProps>(
  (props, ref) => {
    const [message, setMessage] = React.useState("");
    const snapPoints = useMemo(() => ["85%", "85%"], []);
    const interactionType =
      props.interaction === "Superlike" ? "SUPERLIKE" : "ROSES";
    const { dismiss, dismissAll } = useBottomSheetModal();

    const { mutateAsync, isPending } = useMatchingMutation({
      mutationCallback: MatchingAdapter.createNewInteraction,
    });

    const handleInteraction = async () => {
      try {
        await mutateAsync({
          targetUserId: props.userId,
          interactionType: interactionType,
          message: message,
        });
        Toast.show({
          type:
            props.interaction === "Superlike"
              ? "superLikeNotification"
              : "roseNotification",
          text1: `${props.name} has been sent a ${props.interaction}`,
          text2: `${props.name} will recieve the ${props.interaction} shortly`,
        });
      } catch (error) {
        // props.setHasSufficientCoins(false);
        Toast.show({
          type:
            props.interaction === "Superlike"
              ? "superLikeNotification"
              : "roseNotification",
          text1: `Insufficient Coins`,
          text2: `Balance is insufficient to send a ${props.interaction}`,
        });
        dismiss();
        props.coinStoreRef.current.present();
      }
    };

    // renders backdrop for bottom sheet
    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          style={{ zIndex: 1000 }}
          {...props}
        />
      ),
      []
    );

    return (
      <BottomSheetModal
        snapPoints={snapPoints}
        ref={ref}
        backdropComponent={renderBackdrop}
        index={1}
        style={{
          paddingHorizontal: theme.space[24],
          zIndex: 30,
        }}
        handleIndicatorStyle={{ backgroundColor: "#fff" }}
        enablePanDownToClose
      >
        <BottomSheetView>
          <View style={{ paddingBottom: theme.space[13] }}>
            {/* @ts-ignore */}
            <Pressable onPress={() => ref?.current?.dismiss()}>
              <ModalCloseIcon />
            </Pressable>
            <View style={{ paddingTop: unit(29) }} className="mx-auto ">
              <View className="w-[60%] mx-auto">
                <Text
                  fontFamily="Merchant"
                  weight="bold"
                  size={5}
                  className="text-center leading-[160%]"
                  style={{ lineHeight: 40 }}
                >
                  Send{" "}
                  <Text
                    fontFamily="Merchant"
                    weight="bold"
                    size={5}
                    className="text-center leading-[160%] text-coffee-500"
                    style={{ lineHeight: 40 }}
                  >
                    {props.interaction}
                  </Text>{" "}
                  to {props.name}
                </Text>
              </View>
              <Text
                style={{
                  color: "#4F4F4A",
                  paddingTop: theme.space[6],
                  maxWidth: "55%",
                }}
                className="text-center mx-auto"
                weight="medium"
              >
                We’ll make sure she gets your message promptly
              </Text>

              <View>
                <Flex
                  direction="row"
                  className="mx-auto relative left-[40%]"
                  style={{
                    marginTop: unit(30),
                    transform: [{ translateX: -50 }],
                  }}
                  justify="center"
                >
                  <View
                    style={{
                      width: unit(164),
                      height: unit(164),
                      borderRadius: unit(124),
                    }}
                    className="mx-auto overflow-hidden"
                  >
                    <Image
                      //@ts-ignore
                      source={{ uri: props.image }}
                      className="w-full h-full object-cover"
                    />
                  </View>

                  <View
                    className="relative -left-16 mx-auto"
                    style={{ width: unit(164), height: unit(164) }}
                  >
                    <Image
                      className="w-full h-full object-cover"
                      source={props.icon}
                    />
                  </View>
                </Flex>
              </View>

              <View style={{ marginTop: unit(30) }}>
                <TextInput
                  style={{
                    paddingTop: theme.space[17],
                    paddingBottom: theme.space[17],
                    marginBottom: unit(29),
                    borderBottomColor: "#B5B5B0",
                    borderBottomWidth: 1,
                    fontFamily: "BRSonoma-Medium",
                  }}
                  placeholder="Say something nice"
                  placeholderTextColor={"#1E1E1C"}
                  value={message}
                  onChangeText={setMessage}
                />

                <View>
                  <Text className="text-light-grey">
                    You can use our catchline
                  </Text>

                  <ScrollView
                    scrollEnabled
                    horizontal
                    contentContainerStyle={{ gap: unit(17) }}
                    style={{ paddingTop: unit(10) }}
                    showsHorizontalScrollIndicator={false}
                  >
                    {[
                      "Can I be your number 1? I am a keeper",
                      "Hey, I love you always",
                    ].map((item, index) => (
                      <Pressable
                        onPress={() => setMessage(item)}
                        style={{
                          paddingTop: theme.space[16],
                          paddingBottom: theme.space[16],
                          paddingHorizontal: theme.space[10],
                          borderRadius: theme.sizes[9],
                          borderWidth: 1,
                          borderColor: "#CECECA",
                        }}
                        key={index}
                      >
                        <Text weight="medium" className="text-soft-black">
                          {item}
                        </Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                </View>

                <View style={{ paddingBottom: theme.space[13] }}>
                  <Button
                    title={"Send"}
                    weight="semibold"
                    style={{ marginTop: unit(28) }}
                    onPress={() => handleInteraction()}
                    isLoading={isPending}
                  />
                </View>
              </View>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default SendInteractionModal;
