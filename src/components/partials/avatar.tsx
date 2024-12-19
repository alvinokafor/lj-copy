import { unit } from "@/constants";
import React from "react";
import { Image, View } from "react-native";

export default function Avatar({
  image,
  dimensions = 40,
}: {
  image: string;
  dimensions?: number;
}) {
  return (
    <View
      style={{
        width: unit(dimensions),
        height: unit(dimensions),
        borderRadius: unit(1000),
        backgroundColor: "#F2F2F2",
        overflow: "hidden",
      }}
    >
      <Image source={{ uri: image }} className="w-full h-full" />
    </View>
  );
}
