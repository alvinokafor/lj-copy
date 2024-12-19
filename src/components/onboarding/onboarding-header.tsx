import React from "react";
import { Flex, Text } from "../partials";
import { DimensionValue, Pressable, View } from "react-native";
import { BackIcon } from "@/icons";
// import StepIndicator from "./step-indicator";
import { theme } from "@/constants";
import { useRouter } from "expo-router";
import { StepIndicator } from "../partials/modules";

export default function OnboardingHeader({
  heading,
  subHeading,
  step = 0,
  indicator = true,
  headerSize = 4,
  headerSpacing = 4,
  headerWidth = "100%",
  totalSteps = 13,
}: {
  heading: string;
  subHeading?: string;
  step?: number;
  indicator?: boolean;
  headerSize?: number;
  headerWidth?: DimensionValue;
  headerSpacing?: number;
  totalSteps?: number;
}) {
  const router = useRouter();
  return (
    <Flex
      style={{
        paddingHorizontal: theme.space[16],
        paddingTop: theme.space[58],
      }}
      className=" bg-white "
      align="flex-start"
      gap={16}
    >
      <Flex direction="row" justify="space-between" className="w-full">
        <Pressable onPress={() => router.back()}>
          <BackIcon />
        </Pressable>

        {indicator && <StepIndicator step={step} totalSteps={totalSteps} />}
      </Flex>

      <View style={{ width: headerWidth }}>
        <Text
          style={{ lineHeight: 38 }}
          fontFamily="Merchant"
          //   @ts-ignore
          size={headerSize}
        >
          {heading}
        </Text>
        {subHeading && (
          <Text
            style={{
              //   @ts-ignore
              paddingTop: theme.space[headerSpacing],
              paddingBottom: theme.space[20],
            }}
            className="text-[#696963]"
          >
            {subHeading}
          </Text>
        )}
      </View>
    </Flex>
  );
}
