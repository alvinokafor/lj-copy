import { View } from "react-native";
import { Text } from "@/components/partials";
import React from "react";
import { theme } from "@/constants";
import { SuperlikesNotificationIcon, RoseToastNotificationIcon } from "@/icons";

const toastConfig = {
  superLikeNotification: ({
    text1,
    text2,
  }: {
    text1: string;
    text2: string;
  }) => (
    <View
      style={{
        height: 60,
        paddingTop: theme.space[10],
        paddingBottom: theme.space[10],
        paddingHorizontal: theme.space[14],
        borderRadius: theme.sizes[16],
        gap: theme.space[14],
        width: "95%",
      }}
      className="bg-[#242424]/80 flex flex-row items-center"
    >
      <View>
        <SuperlikesNotificationIcon />
      </View>
      <View className="space-y-[2px]">
        <Text size={2} weight="semibold" className="text-white">
          {text1}
        </Text>
        <Text className="text-white">{text2}</Text>
      </View>
    </View>
  ),
  roseNotification: ({ text1, text2 }: { text1: string; text2: string }) => (
    <View
      style={{
        height: 60,
        paddingTop: theme.space[10],
        paddingBottom: theme.space[10],
        paddingHorizontal: theme.space[14],
        borderRadius: theme.sizes[16],
        gap: theme.space[14],
        width: "95%",
      }}
      className="bg-[#242424]/80 flex flex-row items-center"
    >
      <View>
        <RoseToastNotificationIcon />
      </View>
      <View className="space-y-[2px]">
        <Text size={2} weight="semibold" className="text-white">
          {text1}
        </Text>
        <Text className="text-white">{text2}</Text>
      </View>
    </View>
  ),
};

export default toastConfig;
