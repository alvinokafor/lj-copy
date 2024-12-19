import React from "react";
import { Flex, Text } from "../partials";
import { DimensionValue, Pressable, View } from "react-native";
import { BackIcon } from "@/icons";
import { theme } from "@/constants";
import { useRouter } from "expo-router";

export default function UpdateProfileHeader({
  heading,
  subHeading,
  headerSize = 4,
  headerSpacing = 4,
  headerWidth = "100%",
}: {
  heading: string;
  subHeading?: string;
  headerSize?: number;
  headerWidth?: DimensionValue;
  headerSpacing?: number;
}) {
  const router = useRouter();
  return (
    <Flex
      style={{
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
