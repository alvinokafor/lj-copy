import { theme, unit } from "@/constants";
import React from "react";
import { Image, View } from "react-native";
import { Flex, Text } from "../partials";
import { VerifiedIcon } from "@/icons";
import { UserProfile } from "@/adapters/types/MatchingAdapterTypes";

export default function ProfileCard({ user }: { user: UserProfile }) {
  return (
    <View
      className={`w-full h-[556px] rounded-2xl overflow-hidden bg-grey `}
      style={{
        borderRadius: theme.sizes[16],
      }}
    >
      <Image
        source={{
          uri: user.media.length > 0 ? user.media[0].url : user.profile_pic,
        }}
        className="w-full h-full"
      />

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
              New Here
            </Text>
          </View>
          <Flex align="center" direction="row" gap={9}>
            <Text size={4} className="text-white">
              <Text size={4} weight="semibold">
                {user?.firstName},
              </Text>{" "}
              25
            </Text>

            <VerifiedIcon />
          </Flex>
        </Flex>
      </View>
    </View>
  );
}
