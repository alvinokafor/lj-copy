import { Text } from "@/components/partials";
import { theme, unit } from "@/constants";
import { BackIcon } from "@/icons";
import React, { useRef } from "react";
import { Pressable, View } from "react-native";
import { RightCaret } from "@/icons";
import { useRouter } from "expo-router";
import { Button } from "@/components/partials";
import { DeleteAccountIcon, LogoutIcon } from "@/components/settings/icons";
import {
  DeleteAccountModal,
  LogoutModal,
  HelpModal,
} from "@/components/settings";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import * as WebBrowser from "expo-web-browser";

export default function Settings() {
  const router = useRouter();

  const deleteAccountModalRef = useRef<BottomSheetModalMethods>(null);
  const logoutModalRef = useRef<BottomSheetModalMethods>(null);
  const helpModalRef = useRef<BottomSheetModalMethods>(null);

  const handleOpenWebView = async () => {
    await WebBrowser.openBrowserAsync("https://lovejollof.com/terms");
  };

  const generalSettings = [
    {
      title: "Account",
      onPress: () => {
        router.push("/(app)/(settings)/account");
      },
    },
    {
      title: "Notifications",
      onPress: () => {
        router.push("/(app)/(settings)/notifications");
      },
    },
    {
      title: "Subscription",
      onPress: () => {
        router.push("/(app)/(settings)/subscriptions");
      },
    },
    {
      title: "Invite a Friend",
      onPress: () => {
        router.push("/(app)/(settings)/invite-friends");
      },
    },
    {
      title: "Help & Support",
      onPress: () => {
        helpModalRef.current?.present();
      },
    },
  ];

  const legalSettings = [
    {
      title: "Terms & Conditions",
      onPress: () => {
        handleOpenWebView();
      },
    },
    {
      title: "Privacy",
      onPress: () => {
        router.push("/(app)/(settings)/privacy");
      },
    },
  ];

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
              paddingBottom: theme.space[8],
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              gap: unit(18),
            }}
          >
            <Pressable
              style={{ paddingRight: unit(18) }}
              onPress={() => router.back()}
            >
              <BackIcon />
            </Pressable>
            <Text size={4} weight="medium">
              Settings
            </Text>
          </View>

          <View style={{ paddingTop: unit(20) }}>
            <Text className="text-[#9C9C96]" size={0} weight="medium">
              General
            </Text>

            <View
              style={{ display: "flex", gap: unit(8), paddingTop: unit(3) }}
            >
              {generalSettings.map((item, index) => (
                <SettingsItem
                  key={index}
                  title={item.title}
                  onPress={item.onPress}
                />
              ))}
            </View>
          </View>

          <View style={{ paddingTop: unit(18) }}>
            <Text className="text-[#9C9C96]" size={0} weight="medium">
              Legal
            </Text>

            <View
              style={{ display: "flex", gap: unit(8), paddingTop: unit(8) }}
            >
              {legalSettings.map((item, index) => (
                <SettingsItem
                  key={index}
                  title={item.title}
                  onPress={item.onPress}
                />
              ))}
            </View>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: theme.space[14],
            display: "flex",
            gap: unit(25),
          }}
          className="absolute bottom-40 w-full"
        >
          <Button
            titleStyle={{ color: "#1E1E1C", fontFamily: "BRSonoma-Semibold" }}
            backgroundColor="#fff"
            style={{
              borderWidth: 1,
              borderColor: "#CECECA",
            }}
            title="Logout"
            iconRight={<LogoutIcon />}
            onPress={() => logoutModalRef.current?.present()}
          />
          <Button
            backgroundColor="#FFE7E5"
            title="Delete Account"
            iconRight={<DeleteAccountIcon />}
            titleStyle={{ color: "#CC0A00", fontFamily: "BRSonoma-Medium" }}
            onPress={() => deleteAccountModalRef.current?.present()}
          />
        </View>
      </View>

      <DeleteAccountModal ref={deleteAccountModalRef} />
      <LogoutModal ref={logoutModalRef} />
      <HelpModal ref={helpModalRef} />
    </>
  );
}

function SettingsItem({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: unit(12),
        borderBottomWidth: unit(1),
        borderBottomColor: "#F3F3F2",
      }}
      onPress={onPress}
    >
      <Text weight="medium">{title}</Text>

      <RightCaret />
    </Pressable>
  );
}
