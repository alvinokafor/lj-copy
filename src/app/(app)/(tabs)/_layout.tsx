import { Tabs } from "expo-router";
import React, { useRef } from "react";
import { ChatTabsIcon, LikesTabIcon, LJTabsIcon, SpecIcon } from "@/icons";
import { Text } from "@/components/partials";
import { theme, unit } from "@/constants";
import { Image, View } from "react-native";
import { PaywallBottomSheet } from "@/components/partials/modules";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { UserAdapter, useUserQuery } from "@/adapters/UserAdapter";
import { queryKeys } from "@/constants/query-keys";

export default function TabLayout() {
  const paywallBottomSheetRef = useRef<BottomSheetMethods>(null);

  const userMediaQuery = useUserQuery({
    queryCallback: UserAdapter.getUserMedia,
    queryKey: [queryKeys.USER_MEDIA],
  });

  const displayPhoto = userMediaQuery.data?.data.find(
    (item) => item.isDisplayImage
  );

  return (
    <BottomSheetModalProvider>
      <Tabs
        sceneContainerStyle={{
          backgroundColor: "#fff",
        }}
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            paddingTop: theme.space[12],
            paddingBottom: theme.space[40],
            paddingHorizontal: theme.space[10],
            height: unit(107),
            zIndex: 20,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Discover",
            tabBarIcon: ({ color, focused }) => (
              <LJTabsIcon color={focused ? "#422618" : "#9C9C96"} />
            ),
            tabBarLabel: ({ color, focused }) => (
              <Text
                weight="medium"
                size={0}
                className={`${
                  focused ? "text-coffee-500" : "text-light-grey "
                }`}
                style={{ paddingTop: theme.space[2] }}
              >
                Discover
              </Text>
            ),
          }}
        />
        <Tabs.Screen
          name="spec"
          options={{
            title: "Spec",
            tabBarIcon: ({ color, focused }) => (
              <SpecIcon color={focused ? "#422618" : "#9C9C96"} />
            ),
            tabBarLabel: ({ color, focused }) => (
              <Text
                weight="medium"
                size={0}
                className={`${
                  focused ? "text-coffee-500" : "text-light-grey "
                }`}
                style={{ paddingTop: theme.space[2] }}
              >
                Spec
              </Text>
            ),
          }}
        />
        <Tabs.Screen
          name="likes"
          options={{
            title: "Likes",
            tabBarIcon: ({ color, focused }) => (
              <LikesTabIcon color={focused ? "#422618" : "#9C9C96"} />
            ),
            tabBarLabel: ({ color, focused }) => (
              <Text
                weight="medium"
                size={0}
                className={`${
                  focused ? "text-coffee-500" : "text-light-grey "
                }`}
                style={{ paddingTop: theme.space[2] }}
              >
                Likes
              </Text>
            ),
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: "Chat",
            tabBarIcon: ({ color, focused }) => (
              <ChatTabsIcon color={focused ? "#422618" : "#9C9C96"} />
            ),
            tabBarLabel: ({ color, focused }) => (
              <Text
                weight="medium"
                size={0}
                className={`${
                  focused ? "text-coffee-500" : "text-light-grey "
                }`}
                style={{ paddingTop: theme.space[2] }}
              >
                Chat
              </Text>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, focused }) => (
              <View
                style={{
                  height: unit(24),
                  width: unit(24),
                  borderRadius: 100,
                  overflow: "hidden",
                  backgroundColor: "#bcbcbc",
                }}
              >
                <Image
                  source={{
                    uri: displayPhoto?.url,
                  }}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
            ),
            tabBarLabel: ({ color, focused }) => (
              <Text
                weight="medium"
                size={0}
                className={`${
                  focused ? "text-coffee-500" : "text-light-grey "
                }`}
                style={{ paddingTop: theme.space[2] }}
              >
                Profile
              </Text>
            ),
          }}
        />
      </Tabs>
      <PaywallBottomSheet ref={paywallBottomSheetRef} />
    </BottomSheetModalProvider>
  );
}
