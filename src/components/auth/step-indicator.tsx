import React from "react";
import { View } from "react-native";
import { useSegments } from "expo-router";

export default function StepIndicator({
  step,
  imgArray,
}: {
  step: number;
  imgArray: any;
}) {
  const segments = useSegments();
  const bgColor = segments[0] === "(auth)" ? "bg-white" : "bg-[#F8F0EC]";
  return (
    <View className="bg-white/40  rounded-full  w-[52px] h-[20px] px-[9px] flex flex-row items-center justify-between">
      <View
        className={`${
          step === 0 ? "bg-coffee-500" : bgColor
        } rounded-full w-2 h-2`}
      ></View>
      <View
        className={`${
          step === 1 ? "bg-coffee-500" : bgColor
        } rounded-full w-2 h-2`}
      ></View>
      <View
        className={`${
          step === 2 ? "bg-coffee-500" : bgColor
        } rounded-full w-2 h-2`}
      ></View>
    </View>
  );
}
