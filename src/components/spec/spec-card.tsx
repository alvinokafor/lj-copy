import React from "react";
import { Image, View } from "react-native";
import { theme, unit } from "@/constants";
import { Flex, Text } from "@/components/partials";
import { RoseIcon, SuperLikeIcon, VerifiedIcon } from "@/icons";

export default function SpecCard({
  isCurrentCard,
  details,
}: {
  isCurrentCard?: boolean;
  details: {
    info: string;
    name: string;
    age: string;
    image: string;
  };
}) {
  return (
    <View
      className={`
        rounded-2xl w-full overflow-hidden `}
      style={{
        borderRadius: theme.sizes[16],
        height: "100%",
        // width: unit(345),
      }}
    >
      <Image source={{ uri: details.image }} className="w-full h-full" />

      <View
        style={{
          bottom: theme.space[24],
          left: theme.space[17],
          right: theme.space[17],
        }}
        className="absolute flex flex-row items-end justify-between"
      >
        <Flex align="flex-start" gap={12}>
          <View
            style={{
              paddingTop: theme.space[7],
              paddingBottom: theme.space[7],
              paddingHorizontal: theme.space[12],
              borderRadius: theme.sizes[20],
            }}
            className="bg-[#F1DAAE]"
          >
            <Text className="text-center" weight="medium">
              {details.info}
            </Text>
          </View>
          <Flex align="center" direction="row" gap={9}>
            <Text size={4} className="text-white">
              <Text size={4} weight="semibold">
                {details.name},
              </Text>{" "}
              {details.age}
            </Text>

            <VerifiedIcon />
          </Flex>
        </Flex>

        <Flex gap={18}>
          <View
            style={{
              height: theme.sizes[48],
              width: theme.sizes[48],
              borderRadius: unit(38),
            }}
            className="bg-white flex items-center justify-center"
          >
            <RoseIcon />
          </View>
          <View
            style={{
              height: theme.sizes[48],
              width: theme.sizes[48],
              borderRadius: unit(38),
            }}
            className="bg-white flex items-center justify-center"
          >
            <SuperLikeIcon />
          </View>
        </Flex>
      </View>
    </View>
  );
}
