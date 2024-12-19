import React from "react";
import { Pressable, ScrollView, View } from "react-native";
import { Button, Text, Flex } from "@/components/partials";
import { BackIcon } from "@/icons";
import { useRouter } from "expo-router";
import { theme } from "@/constants";
import { LargeMapIcon } from "@/icons";
import { storeData } from "@/utils/data-store";

export default function AllowLocationPermissions() {
  const router = useRouter();

  const handleFinishOnboarding = async () => {
    await storeData("hasCompletedOnboarding", "true");
    router.push("/");
  };

  return (
    <>
      <ScrollView
        style={{ paddingLeft: theme.space[20], paddingRight: theme.space[10] }}
      >
        <View
          style={{
            marginTop: theme.space[58],
            display: "flex",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <Pressable onPress={() => router.back()}>
            <BackIcon />
          </Pressable>

          <View style={{ marginTop: theme.space[180] }}>
            <LargeMapIcon />
            <Flex
              gap={20}
              style={{ marginTop: theme.space[22] }}
              align="flex-start"
              className="w-full"
            >
              <Text fontFamily="Merchant" size={6} className=" leading-10">
                You never can tell if she’s right around the corner
              </Text>
              <Text size={2} className="text-[#4F4F4A]">
                We’ll use this to show you potential matches in your area.
              </Text>
            </Flex>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          paddingHorizontal: theme.space[20],
          paddingBottom: theme.space[48],
        }}
        className="absolute w-full bottom-0"
      >
        <Button
          onPress={() => handleFinishOnboarding()}
          title="Allow Location"
        />
      </View>
    </>
  );
}
