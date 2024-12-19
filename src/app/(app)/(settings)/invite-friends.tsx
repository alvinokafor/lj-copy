import { Flex, Text } from "@/components/partials";
import { theme, unit } from "@/constants";
import { BackIcon } from "@/icons";
import React, { useRef } from "react";
import { Pressable, Share, View } from "react-native";
import { RightCaret } from "@/icons";
import { useRouter } from "expo-router";
import { Button } from "@/components/partials";
import {
  InviteFriendsIllustration,
  MasterCardIcon,
} from "@/components/settings/icons";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants/query-keys";
import { UserProfileResponse } from "@/adapters/types/UserAdapterTypes";

export default function InviteFriends() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const userProfile = queryClient.getQueryData<UserProfileResponse>([
    queryKeys.USER,
  ]);

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: "Refer your friends to join Love Jollof",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View
        style={{
          marginTop: theme.space[80],
          height: "100%",
        }}
        className="relative"
      >
        <View
          style={{
            paddingHorizontal: theme.space[14],
          }}
        >
          <View
            style={{
              paddingBottom: theme.space[32],
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Pressable
              style={{ paddingRight: unit(12) }}
              onPress={() => router.back()}
            >
              <BackIcon />
            </Pressable>
            <Text size={4} weight="medium">
              Invite a Friend
            </Text>
          </View>

          <View
            style={{
              paddingVertical: unit(16),
              paddingHorizontal: unit(18),
              backgroundColor: "#F8F0EC",
              borderRadius: unit(9),
            }}
          >
            <View className="mx-auto">
              <InviteFriendsIllustration />
            </View>

            <View style={{ paddingTop: unit(21) }}>
              <Text
                className="mx-auto w-[70%] text-center"
                size={4}
                weight="medium"
              >
                Refer your Friends to Join Love Jollof
              </Text>

              <Text
                weight="medium"
                className="text-[#696963] mx-auto w-[70%] text-center"
                style={{ paddingTop: unit(14) }}
              >
                Invite your friends to connect with their special one on love
                jollof.{" "}
              </Text>
            </View>

            <View
              style={{
                padding: unit(16),
                borderRadius: unit(14),
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: unit(21),
              }}
            >
              <Flex align="flex-start">
                <Text weight="medium">Your Referral Code</Text>
                <Text size={5} weight="medium">
                  {userProfile?.data?.referral}
                </Text>
              </Flex>

              <Pressable
                style={{
                  paddingVertical: unit(8),
                  paddingHorizontal: unit(12.5),
                  borderWidth: 1,
                  borderColor: "#1E1E1C",
                  borderRadius: unit(8),
                }}
              >
                <Text>Copy Code</Text>
              </Pressable>
            </View>
          </View>
          <View style={{ paddingTop: unit(24) }}>
            <Button
              title="Share Invite Link"
              titleStyle={{ fontFamily: "BRSonoma-Medium" }}
              onPress={handleShare}
            />
          </View>
        </View>
      </View>
    </>
  );
}
