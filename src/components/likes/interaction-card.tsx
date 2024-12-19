import { theme, unit } from "@/constants";
import React from "react";
import { Pressable, View } from "react-native";
import { SuperlikeCardIcon, ViewMoreIcon } from "./icons";
import { Button, Text } from "../partials";
import { truncateText } from "@/utils";
// import { InteractionProfileCard } from ".";
import { SmallPadlockIcon } from "@/icons";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import InteractionProfileCard from "./interaction-profile-card";
import CommentModal from "./comment-modal";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

export default function InteractionCard({
  details,
  headerIcon,
  title,
  backgroundColor,
  expandTriggerColor,
  matchedIconColor,
}: {
  details: { info: string; name: string; age: string; image: string };
  headerIcon: React.ReactNode;
  title: string;
  backgroundColor: string;
  expandTriggerColor: string;
  matchedIconColor: string;
}) {
  const [expandText, setExpandText] = React.useState(false);
  const [matched, setMatched] = React.useState(false);
  const [isNotInterested, setIsNotInterested] = React.useState(false);

  const commentModalRef = React.useRef<BottomSheetModalMethods>(null);

  return (
    <>
      <View
        style={{
          paddingHorizontal: matched || isNotInterested ? 0 : theme.space[14],
          paddingTop: matched || isNotInterested ? 0 : theme.space[16],
          paddingBottom: matched || isNotInterested ? 0 : theme.space[16],
          borderRadius: unit(19),
          backgroundColor: backgroundColor,
        }}
      >
        <View>
          {/* Animated header content */}
          {!matched && !isNotInterested && (
            <Animated.View
              entering={FadeIn.duration(300)}
              exiting={FadeOut.duration(300)}
            >
              <View
                style={{ gap: theme.space[11] }}
                className="flex items-center flex-row"
              >
                {headerIcon}
                <Text fontFamily="Merchant" size={20}>
                  {details.name} {title}
                </Text>
              </View>

              <View
                style={{ paddingBottom: theme.space[11] }}
                className="flex flex-row items-end"
              >
                <Text
                  weight="medium"
                  size={1}
                  className="text-[#696963]"
                  style={{ paddingTop: unit(10) }}
                >
                  {!expandText
                    ? truncateText(
                        "Can I be your number 1? I am very interested in you and would love to see you again.",
                        30
                      )
                    : "Can I be your number 1? I am very interested in you and would love to see you again."}
                </Text>

                <Pressable
                  onPress={() => commentModalRef.current?.present()}
                  className="flex flex-row items-center"
                  style={{
                    position: "relative",
                    left: expandText ? unit(-60) : 0,
                  }}
                >
                  <Text
                    weight="medium"
                    size={1}
                    style={{ color: expandTriggerColor }}
                  >
                    {!expandText ? "View More" : "View Less"}
                  </Text>
                  <ViewMoreIcon color={expandTriggerColor} />
                </Pressable>
              </View>
            </Animated.View>
          )}

          <InteractionProfileCard
            details={details}
            matched={matched}
            isNotInterested={isNotInterested}
            setIsNotInterested={setIsNotInterested}
            setMatched={setMatched}
            matchedIconColor={matchedIconColor}
          />

          {/* Animated buttons */}
          {!matched && !isNotInterested && (
            <Animated.View
              className="flex flex-row items-center justify-between w-full"
              style={{ paddingTop: theme.space[11] }}
              entering={FadeIn.duration(300)}
              exiting={FadeOut.duration(300)}
            >
              <Button
                backgroundColor="#1A1A19"
                title="Match"
                iconRight={<SmallPadlockIcon />}
                titleStyle={{ fontSize: theme.fontSize[2] }}
                weight="medium"
                style={{ width: "50%" }}
                onPress={() => setMatched(true)}
              />

              <Pressable
                style={{ width: "50%" }}
                onPress={() => setIsNotInterested(true)}
              >
                <Text className="text-center">Not Interested</Text>
              </Pressable>
            </Animated.View>
          )}
        </View>
      </View>

      <CommentModal
        ref={commentModalRef}
        commentIcon={<ViewMoreIcon color={expandTriggerColor} />}
        message={
          "Can I be your number 1? I am very interested in you and would love to see you again."
        }
        setIsNotInterested={setIsNotInterested}
        setMatched={setMatched}
      />
    </>
  );
}
