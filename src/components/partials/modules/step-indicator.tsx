import React from "react";
import { View } from "react-native";

export default function StepIndicator({
  step,
  totalSteps,
}: {
  step: number;
  totalSteps: number;
}) {
  return (
    <View className="bg-grey rounded-full w-max h-[20px] px-[9px] flex flex-row items-center gap-x-[5px]">
      {Array.from({ length: totalSteps }, (_, index) => (
        <View
          key={index}
          className={`${
            step === index + 1 ? "bg-coffee-500" : "bg-[#E6E6E5]"
          } rounded-full w-2 h-2`}
        />
      ))}
    </View>
  );
}
