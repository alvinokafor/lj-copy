import React, { SetStateAction } from "react";
import { Dimensions, Image, Pressable, TextInput, View } from "react-native";
import { theme, unit } from "@/constants";
import { Button, Flex, Text } from "@/components/partials";
import { BigPadlockIcon, SmallPadlockIcon, VerifiedIcon } from "@/icons";
import { CancelIcon, SendIcon } from "@/components/likes/icons";
import { MatchOverlayGradient } from "./gradients";
import NotInterestedOverlay from "./not-interested-overlay";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function InteractionProfileCard({
  details,
  matched,
  isNotInterested,
  setMatched,
  setIsNotInterested,
  matchedIconColor,
}: {
  details: {
    info: string;
    name: string;
    age: string;
    image: string;
  };
  matched: boolean;
  isNotInterested: boolean;
  setMatched: React.Dispatch<SetStateAction<boolean>>;
  setIsNotInterested: React.Dispatch<SetStateAction<boolean>>;
  matchedIconColor: string;
}) {
  // Pre-calculate unit values
  const COLLAPSED_WIDTH = unit(333);
  const COLLAPSED_HEIGHT = unit(373);
  const EXPANDED_HEIGHT = unit(541);

  // Calculate available width (screen width minus padding on both sides)
  const screenWidth = Dimensions.get("window").width;
  const availableWidth = screenWidth - 2 * unit(14);

  // Animation progress value
  const progress = useSharedValue(matched || isNotInterested ? 1 : 0);

  // Animated styles for container
  const containerStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(
        progress.value,
        [0, 1],
        [COLLAPSED_WIDTH, availableWidth]
      ),
      alignSelf: "center", // Center the card in the container
    };
  });

  // Animated styles for content
  const contentStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(
        progress.value,
        [0, 1],
        [COLLAPSED_WIDTH, availableWidth]
      ),
      height: interpolate(
        progress.value,
        [0, 1],
        [COLLAPSED_HEIGHT, EXPANDED_HEIGHT]
      ),
    };
  });

  // Update progress when matched or isNotInterested changes
  React.useEffect(() => {
    progress.value = withTiming(matched || isNotInterested ? 1 : 0, {
      duration: 300,
    });
  }, [matched, isNotInterested]);
  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: unit(14),
      }}
    >
      <Animated.View style={containerStyle}>
        <Animated.View
          style={[
            contentStyle,
            {
              borderRadius: theme.sizes[16],
              overflow: "hidden",
            },
          ]}
          className="rounded-2xl"
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
          </View>

          {matched && (
            <MatchedOverlay
              setMatched={setMatched}
              matchedIconColor={matchedIconColor}
            />
          )}
          {isNotInterested && (
            <NotInterestedOverlay
              setMatched={setMatched}
              setIsNotInterested={setIsNotInterested}
            />
          )}
        </Animated.View>
      </Animated.View>
    </View>
  );
}

function MatchedOverlay({
  setMatched,
  matchedIconColor,
}: {
  setMatched: React.Dispatch<SetStateAction<boolean>>;
  matchedIconColor: string;
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
            justifyContent: "space-between",
          }}
        >
          <Pressable onPress={() => setMatched(false)} className="self-end ">
            <CancelIcon />
          </Pressable>

          <View className="self-center space-y-[13px] w-[70%]">
            <BigPadlockIcon className="mx-auto" color={matchedIconColor} />

            <Text
              size={5}
              fontFamily="Merchant"
              className="text-center text-white"
              weight="bold"
            >
              You Matched!
            </Text>
            <Text className="text-center text-white ">
              You have been matched with Oluwaseun. You can now chat with her.{" "}
            </Text>
          </View>

          <Flex
            py={14}
            px={11}
            className="w-full bg-white"
            style={{
              borderRadius: theme.sizes[7],
              paddingTop: unit(8),
              paddingBottom: unit(8),
              paddingHorizontal: unit(11),
            }}
            direction="row"
            justify="space-between"
          >
            <TextInput
              placeholder="Be the first to say hello!"
              style={{ fontFamily: "BRSonoma-Medium" }}
            />

            <Pressable
              style={{
                width: unit(38),
                height: unit(38),
                borderRadius: theme.sizes[7],
              }}
              className="flex justify-center items-center bg-[#F3F3F2]"
            >
              <SendIcon />
            </Pressable>
          </Flex>
        </View>
      </View>
      <View className="absolute z-10 inset-0 h-full w-full">
        <MatchOverlayGradient />
      </View>
    </>
  );
}
