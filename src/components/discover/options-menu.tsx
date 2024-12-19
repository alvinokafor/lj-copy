import { SmallCaret } from "@/icons";
import React from "react";
import { Pressable } from "react-native";
import { Text } from "../partials";
import { theme } from "@/constants";

export default function OptionsMenu({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={{
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#422618",
        paddingHorizontal: theme.space[16],
        paddingTop: theme.space[6],
        paddingBottom: theme.space[6],
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        gap: theme.space[6],
      }}
      className="w-min"
      onPress={onPress}
    >
      <Text weight="medium" size={1}>
        {title}
      </Text>

      <SmallCaret />
    </Pressable>
  );
}
