import React, { SetStateAction } from "react";
import { Pressable, View } from "react-native";
import { theme, unit } from "@/constants";
import { Text } from "@/components/partials";
import { NotInterestedIcon, CancelIcon } from "@/components/likes/icons";
import { MatchOverlayGradient } from "./gradients";

export default function NotInterestedOverlay({
  setMatched,
  setIsNotInterested,
}: {
  setMatched: React.Dispatch<SetStateAction<boolean>>;
  setIsNotInterested: React.Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      <View className="absolute z-20 flex justify-between inset-0 w-full h-full">
        <View
          style={{
            paddingTop: theme.sizes[14],
            paddingBottom: unit(19),
            paddingHorizontal: theme.space[14],
            display: "flex",
            flex: 1,
            gap: unit(147),
          }}
        >
          <Pressable
            onPress={() => {
              setMatched(false);
              setIsNotInterested(false);
            }}
            className="self-end "
          >
            <CancelIcon />
          </Pressable>

          <View className="self-center space-y-[13px] w-[70%]">
            <NotInterestedIcon className="mx-auto" />

            <Text
              size={5}
              fontFamily="Merchant"
              className="text-center text-white"
              weight="bold"
            >
              Not Interested
            </Text>
            <Text className="text-center text-white ">
              Don’t like the profile?
            </Text>
          </View>
        </View>
      </View>
      <View className="absolute z-10 inset-0 h-full w-full">
        <MatchOverlayGradient />
      </View>
    </>
  );
}
