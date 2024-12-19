import { Flex, Text } from "@/components/partials";
import { theme, unit } from "@/constants";
import { BackIcon } from "@/icons";
import React from "react";
import { Pressable, View } from "react-native";
import { useRouter } from "expo-router";
import { UserListItem } from "@/components/settings";

export default function Privacy() {
  const router = useRouter();

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
              paddingBottom: theme.space[20],
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
              Privacy
            </Text>
          </View>

          <View>
            <Text size={0} weight="medium" className="text-[#9C9C96]">
              Blocked Users
            </Text>

            <View style={{ marginTop: unit(8) }}>
              <UserListItem image="" name="Toyosi Adebayo" messages={0} />
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
