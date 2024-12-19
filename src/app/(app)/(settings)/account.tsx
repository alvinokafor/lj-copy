import { Flex, Text } from "@/components/partials";
import { theme, unit } from "@/constants";
import { BackIcon } from "@/icons";
import React from "react";
import { Pressable, View } from "react-native";
import { RightCaret } from "@/icons";
import { useRouter } from "expo-router";
import { Button } from "@/components/partials";
import { DeleteAccountIcon, LogoutIcon } from "@/components/settings/icons";

export default function Account() {
  const router = useRouter();

  return (
    <View
      style={{
        marginTop: theme.space[80],
        height: "100%",
      }}
      className="relative"
    >
      <View
        style={{
          paddingHorizontal: theme.space[18],
        }}
      >
        <View
          style={{
            paddingBottom: theme.space[8],
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            rowGap: unit(18),
          }}
        >
          <Pressable onPress={() => router.back()}>
            <BackIcon />
          </Pressable>
          <Text size={4} weight="medium">
            Account
          </Text>
        </View>

        <View style={{ paddingTop: unit(20) }}>
          <Pressable
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "space-between",
              paddingVertical: unit(12),
              borderBottomWidth: unit(1),
              borderBottomColor: "#F3F3F2",
            }}
          >
            <Text weight="medium">Linked Account</Text>
            <Text className="text-[#9C9C96] pt-[7px]" size={0} weight="medium">
              alvin2k99@gmail.com
            </Text>
          </Pressable>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: unit(12),
              borderBottomWidth: unit(1),
              borderBottomColor: "#F3F3F2",
            }}
          >
            <Flex align="flex-start">
              <Text weight="medium">Update Phone Number</Text>
              <Text
                className="text-[#9C9C96] pt-[7px]"
                size={0}
                weight="medium"
              >
                07036322953
              </Text>
            </Flex>

            <Pressable
              style={{
                backgroundColor: "#F3F3F2",
                paddingHorizontal: unit(11),
                paddingVertical: unit(3),
                borderRadius: unit(22),
              }}
              onPress={() => router.push("/(app)/(settings)/change-number")}
            >
              <Text weight="medium" size={0}>
                Change
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
