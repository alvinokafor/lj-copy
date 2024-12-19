import React from "react";
import { View } from "react-native";

export default function StepIndicator({ step }: { step: number }) {
  return (
    <View className="bg-grey  rounded-full  w-max h-[20px] px-[9px] flex flex-row items-center gap-[5px]">
      <View
        className={`${
          step === 1 ? "bg-coffee-500" : "bg-[#E6E6E5]"
        } rounded-full w-2 h-2`}
      ></View>
      <View
        className={`${
          step === 2 ? "bg-coffee-500" : "bg-[#E6E6E5]"
        } rounded-full w-2 h-2`}
      ></View>
      <View
        className={`${
          step === 3 ? "bg-coffee-500" : "bg-[#E6E6E5]"
        } rounded-full w-2 h-2`}
      ></View>
      <View
        className={`${
          step === 4 ? "bg-coffee-500" : "bg-[#E6E6E5]"
        } rounded-full w-2 h-2`}
      ></View>
      <View
        className={`${
          step === 5 ? "bg-coffee-500" : "bg-[#E6E6E5]"
        } rounded-full w-2 h-2`}
      ></View>
      <View
        className={`${
          step === 6 ? "bg-coffee-500" : "bg-[#E6E6E5]"
        } rounded-full w-2 h-2`}
      ></View>
      <View
        className={`${
          step === 7 ? "bg-coffee-500" : "bg-[#E6E6E5]"
        } rounded-full w-2 h-2`}
      ></View>
      <View
        className={`${
          step === 8 ? "bg-coffee-500" : "bg-[#E6E6E5]"
        } rounded-full w-2 h-2`}
      ></View>
      <View
        className={`${
          step === 9 ? "bg-coffee-500" : "bg-[#E6E6E5]"
        } rounded-full w-2 h-2`}
      ></View>
      <View
        className={`${
          step === 10 ? "bg-coffee-500" : "bg-[#E6E6E5]"
        } rounded-full w-2 h-2`}
      ></View>
      <View
        className={`${
          step === 11 ? "bg-coffee-500" : "bg-[#E6E6E5]"
        } rounded-full w-2 h-2`}
      ></View>
      <View
        className={`${
          step === 12 ? "bg-coffee-500" : "bg-[#E6E6E5]"
        } rounded-full w-2 h-2`}
      ></View>
      <View
        className={`${
          step === 13 ? "bg-coffee-500" : "bg-[#E6E6E5]"
        } rounded-full w-2 h-2`}
      ></View>
    </View>
  );
}
