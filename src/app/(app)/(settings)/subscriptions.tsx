import { Flex, Text } from "@/components/partials";
import { theme, unit } from "@/constants";
import { BackIcon } from "@/icons";
import React, { useRef } from "react";
import { Pressable, View } from "react-native";
import { RightCaret } from "@/icons";
import { useRouter } from "expo-router";
import { Button } from "@/components/partials";
import { MasterCardIcon } from "@/components/settings/icons";
import { PaywallBottomSheet } from "@/components/partials/modules";
import {
  BottomSheetMethods,
  BottomSheetModalMethods,
} from "@gorhom/bottom-sheet/lib/typescript/types";
import { CancelMembershipModal, ExtendPlanModal } from "@/components/settings";

export default function Subscriptions() {
  const router = useRouter();

  const extendPlanModalRef = useRef<BottomSheetModalMethods>(null);
  const cancelMembershipModalRef = useRef<BottomSheetModalMethods>(null);

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
              Subscriptions
            </Text>
          </View>

          <View
            style={{
              paddingVertical: unit(16),
              paddingHorizontal: unit(18),
              backgroundColor: "#F3F3F2",
              borderRadius: unit(9),
            }}
          >
            <View>
              <Flex
                style={{ borderBottomWidth: 1, borderBottomColor: "#E6E6E5" }}
                align="center"
                justify="space-between"
                direction="row"
                pb={14}
              >
                <View>
                  <Text
                    className="text-[#9C9C96] pb-[4px]"
                    weight="medium"
                    size={0}
                  >
                    Monthly Plan
                  </Text>
                  <Text weight="medium" size={20}>
                    Love Jollof Plus
                  </Text>
                  <Text className="text-[#9C9C96] pt-[4px]" size={0}>
                    Member since March 2024
                  </Text>
                </View>

                <Text weight="medium" size={20}>
                  $50
                </Text>
              </Flex>

              <View style={{ paddingTop: unit(14) }}>
                <Flex direction="row" align="center" gap={11}>
                  <MasterCardIcon />
                  <Text weight="medium" size={2}>
                    **** **** **** 5192
                  </Text>
                </Flex>

                <Text
                  style={{ paddingTop: unit(8) }}
                  className="text-[#9C9C96]"
                >
                  Your next billing date is 10 December 2024
                </Text>
              </View>

              <View style={{ paddingTop: unit(32) }}>
                <Text weight="medium">Alvin Okafor</Text>
                <Text weight="medium" size={0} className="text-[#B5B5B0]">
                  alvin2k99@gmail.com
                </Text>
              </View>

              <View style={{ paddingTop: unit(18) }}>
                <Button
                  title="Extend Plan"
                  titleStyle={{ fontFamily: "BRSonoma-Medium" }}
                  onPress={() => extendPlanModalRef.current?.present()}
                />
                <Button
                  title="Downgrade to Basic"
                  titleStyle={{
                    fontFamily: "BRSonoma-Medium",
                    color: "#1E1E1C",
                  }}
                  style={{ marginTop: unit(12), backgroundColor: "#F3F3F2" }}
                  onPress={() => cancelMembershipModalRef.current?.present()}
                />
              </View>
            </View>
          </View>
        </View>
      </View>

      <ExtendPlanModal ref={extendPlanModalRef} />
      <CancelMembershipModal ref={cancelMembershipModalRef} />
    </>
  );
}
