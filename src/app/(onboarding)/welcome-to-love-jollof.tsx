import React from "react";
import { Button, Flex, ScreenContainer, Text } from "@/components/partials";
import { View, Image, ScrollView } from "react-native";
import { useOnboardingStore } from "@/stores";
import { theme } from "@/constants";
import { communityGuidelines } from "@/utils/static";
import { useRouter } from "expo-router";

export default function WelcomeToLoveJollof() {
  const router = useRouter();
  const { displayImage, name } = useOnboardingStore();

  return (
    <View style={{ paddingTop: theme.space[58] }}>
      <ScreenContainer>
        <View
          style={{ display: "flex", flex: 1, justifyContent: "space-between" }}
        >
          <Flex>
            <View
              style={{
                width: 72,
                height: 72,
                borderRadius: 1000,
                overflow: "hidden",
                marginBottom: theme.space[17],
              }}
            >
              <Image
                source={{ uri: displayImage }}
                style={{ width: "100%", height: "100%" }}
              />
            </View>

            <Text
              style={{ paddingBottom: theme.space[6] }}
              className="text-[#4F4F4A]"
              size={2}
            >
              Welcome to Love Jollof{" "}
            </Text>
            <Text className="text-coffee-500" fontFamily="Merchant" size={8}>
              {name}
            </Text>
          </Flex>

          <HouseRules />

          <Button
            onPress={() =>
              router.push("/(permissions)/allow-push-notifications")
            }
            title="I'll keep to the house rules"
          />
        </View>
      </ScreenContainer>
    </View>
  );
}

function HouseRules() {
  return (
    <View
      style={{
        paddingHorizontal: theme.space[20],
        paddingTop: theme.space[16],
        paddingBottom: theme.space[16],
        borderWidth: 1,
        borderColor: "#F0D7A8",
        backgroundColor: "#FBF5E9",
        borderRadius: theme.space[21],
        marginTop: theme.space[17],
        marginBottom: theme.space[15],
      }}
    >
      <Text className="text-coffee-500" size={2} weight="semibold">
        House Rules
      </Text>

      <ScrollView
        contentContainerStyle={{
          gap: theme.space[18],
          paddingTop: theme.space[17],
        }}
      >
        {communityGuidelines.map((guideline, index) => (
          <Text key={index} size={1} className="text-[#0D0D0C] leading-5">
            {`\u2022 ${guideline}`}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}
