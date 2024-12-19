import { theme } from "@/constants";
import React from "react";
import { Pressable, TouchableWithoutFeedback, View } from "react-native";
import { Text, ScreenContainer, Flex, Button } from "@/components/partials";
import { CheckedIcon, UncheckedIcon } from "@/icons";
import { useRouter } from "expo-router";
import { OnboardingNextController } from "@/components/onboarding";
import {
  OnboardingAdapter,
  useOnboardingMutation,
} from "@/adapters/OnboardingAdapter";

export default function Gender() {
  const router = useRouter();
  const [gender, setGender] = React.useState<string>("");
  const { mutateAsync, isPending } = useOnboardingMutation({
    mutationCallback: OnboardingAdapter.setGender,
  });

  const handleSetGender = async () => {
    try {
      await mutateAsync({
        gender,
      });
      router.navigate("/(onboarding)/relationship-status");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <ScreenContainer>
        <View
          style={{ display: "flex", justifyContent: "space-between", flex: 1 }}
        >
          <View>
            <Flex pt={20} align="flex-start" gap={16}>
              <TouchableWithoutFeedback onPress={() => setGender("male")}>
                <View
                  style={{ borderRadius: theme.sizes[12] }}
                  className={`${
                    gender === "male" ? "bg-coffee-100" : "bg-grey"
                  }`}
                >
                  <Flex
                    px={12}
                    direction="row"
                    justify="space-between"
                    className="w-full"
                    pt={15}
                    pb={15}
                  >
                    <Text weight="medium" className="text-soft-black" size={1}>
                      Male
                    </Text>
                    <Pressable onPress={() => setGender("male")}>
                      {gender === "male" ? <CheckedIcon /> : <UncheckedIcon />}
                    </Pressable>
                  </Flex>
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={() => setGender("female")}>
                <View
                  style={{ borderRadius: theme.sizes[12] }}
                  className={`${
                    gender === "female" ? "bg-coffee-100" : "bg-grey"
                  }`}
                >
                  <Flex
                    px={12}
                    direction="row"
                    justify="space-between"
                    className="w-full"
                    pt={15}
                    pb={15}
                  >
                    <Text weight="medium" className="text-soft-black" size={1}>
                      Female
                    </Text>
                    <Pressable onPress={() => setGender("female")}>
                      {gender === "female" ? (
                        <CheckedIcon />
                      ) : (
                        <UncheckedIcon />
                      )}
                    </Pressable>
                  </Flex>
                </View>
              </TouchableWithoutFeedback>
            </Flex>
          </View>
        </View>
      </ScreenContainer>
      <OnboardingNextController
        canSkip={false}
        isNextButtonDisabled={gender === ""}
        onPressHandler={handleSetGender}
        isLoading={isPending}
      />
    </>
  );
}
