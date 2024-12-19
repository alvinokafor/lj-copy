import React from "react";
import { Flex, Text } from "../partials";
import { Image, Pressable, View } from "react-native";
import { theme, unit } from "@/constants";
import { GreenVerificationIcon } from "@/icons";
import { useRouter } from "expo-router";
import UnblockUserModal from "./unblock-user-modal";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

export default function UserListItem({
  image,
  name,
  messages,
}: {
  image: string;
  name: string;
  messages: number;
}) {
  const router = useRouter();
  const unblockUserModalRef = React.useRef<BottomSheetModalMethods>(null);
  return (
    <>
      <Pressable>
        <Flex
          mb={12}
          align="center"
          justify="space-between"
          direction="row"
          pt={4}
          pb={4}
        >
          <Flex gap={7} direction="row" align="center">
            <View>
              <View
                style={{
                  width: unit(40),
                  height: unit(40),
                  borderRadius: unit(71),
                  backgroundColor: "#F2F2F2",
                  overflow: "hidden",
                }}
              >
                <Image source={{ uri: image }} className="w-full h-full" />
              </View>

              <View
                style={{
                  width: unit(8),
                  height: unit(8),
                  borderRadius: unit(1000),
                  backgroundColor: "#E8C37D",
                  overflow: "hidden",
                  position: "absolute",
                  bottom: unit(0),
                  right: unit(0),
                }}
              ></View>
            </View>

            <View className="space-y-2">
              <Flex direction="row" align="center" gap={4}>
                <Text size={0} weight="medium" className="text-soft-black">
                  Toyosi Adebayo
                </Text>

                <GreenVerificationIcon />
              </Flex>
              <Text size={10} weight="medium" className="text-light-grey">
                Blocked 2 years ago
              </Text>
            </View>
          </Flex>

          <View className="space-y-2">
            <Pressable
              style={{
                paddingVertical: unit(9),
                paddingHorizontal: unit(13),
                borderRadius: unit(33),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="bg-coffee-500 self-end"
              onPress={() => unblockUserModalRef.current?.present()}
            >
              <Text size={0} weight="medium" className="text-white">
                Unblock
              </Text>
            </Pressable>
          </View>
        </Flex>
      </Pressable>

      <UnblockUserModal ref={unblockUserModalRef} />
    </>
  );
}
