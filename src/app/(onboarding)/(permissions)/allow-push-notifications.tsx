import React, { useEffect } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { Button, Text, Flex } from "@/components/partials";
import { BackIcon } from "@/icons";
import { useRouter } from "expo-router";
import { theme } from "@/constants";
import { LargeBellIcon } from "@/icons";
// import { useLocationPermissions } from "@/hooks/useLocation";

export default function AllowPushNotifications() {
  const router = useRouter();

  // const { location, errorMsg, permissionStatus, requestLocationPermissions } =
  //   useLocationPermissions();

  // useEffect(() => {
  //   requestLocationPermissions();
  // }, []);

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
            <LargeBellIcon />
            <Flex
              gap={20}
              style={{ marginTop: theme.space[22] }}
              align="flex-start"
              className="w-full"
            >
              <Text
                fontFamily="Merchant"
                size={6}
                className="w-[70%] leading-10"
              >
                You cannot be caught slacking
              </Text>
              <Text size={2} className="text-[#4F4F4A]">
                Turn on your notification so we can let you know when you have
                new matches, like or messages.
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
          onPress={() =>
            router.push("/(onboarding)/(permissions)/allow-location")
          }
          title="Allow Push Notifications"
        />
      </View>
    </>
  );
}
