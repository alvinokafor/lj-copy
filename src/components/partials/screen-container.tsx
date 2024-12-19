import { ScrollView } from "react-native";
import React from "react";
import { theme } from "@/constants";

export default function ScreenContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScrollView
      style={{
        paddingHorizontal: theme.space[16],
        paddingBottom: theme.space[14],
      }}
      className="relative"
    >
      {children}
    </ScrollView>
  );
}
