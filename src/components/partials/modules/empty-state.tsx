import { theme, unit } from "@/constants";
import React from "react";
import { View } from "react-native";
import Text from "../text";

interface IProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}
export default function EmptyState({ title, description, icon }: IProps) {
  return (
    <View
      style={{ paddingTop: unit(166) }}
      className="flex items-center justify-center w-full"
    >
      <View
        style={{ paddingBottom: theme.space[15] }}
        className="mx-auto w-max"
      >
        {icon}
      </View>

      <Text
        size={5}
        fontFamily="Merchant"
        className="text-center text-soft-black"
      >
        {title}
      </Text>

      <Text
        style={{ paddingTop: theme.space[12] }}
        className="text-center text-[#4F4F4A] w-[70%]"
      >
        {description}
      </Text>
    </View>
  );
}
