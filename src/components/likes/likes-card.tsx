import React, { Dispatch, SetStateAction } from "react";
import { Image, Pressable, TextInput, View } from "react-native";
import { theme, unit } from "@/constants";
import { Button, Flex, Text } from "@/components/partials";
import { BigPadlockIcon, SmallPadlockIcon, VerifiedIcon } from "@/icons";
import { CancelIcon, SendIcon } from "@/components/likes/icons";
import { MatchOverlayGradient } from "./gradients";
import NotInterestedOverlay from "./not-interested-overlay";

export default function LikeCard({
  details,
}: {
  details: {
    info: string;
    name: string;
    age: string;
    image: string;
  };
}) {
  const [matched, setMatched] = React.useState(false);
  const [isNotInterested, setIsNotInterested] = React.useState(false);
  return (
    <View>
      <View
        className={`
        rounded-2xl w-full overflow-hidden `}
        style={{
          borderRadius: theme.sizes[16],
          height: matched || isNotInterested ? unit(534) : unit(424),
          width: unit(329),
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

        {matched && <MatchedOverlay setMatched={setMatched} />}
        {isNotInterested && (
          <NotInterestedOverlay
            setMatched={setMatched}
            setIsNotInterested={setIsNotInterested}
          />
        )}
      </View>
      {!matched && (
        <View>
          <Button
            style={{ marginTop: unit(27), marginBottom: theme.space[16] }}
            title="Match"
            iconRight={<SmallPadlockIcon />}
            iconProps={{ gap: unit(6) }}
            py={9}
            onPress={() => setMatched(true)}
          />
          <Pressable onPress={() => setIsNotInterested(true)}>
            <Text weight="medium" className="text-center">
              Not Interested
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

function MatchedOverlay({
  setMatched,
}: {
  setMatched: React.Dispatch<SetStateAction<boolean>>;
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
            <BigPadlockIcon className="mx-auto" />

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
