import { theme } from "@/constants";
import React, { useRef } from "react";
import { Pressable, View, TouchableWithoutFeedback } from "react-native";
import { Text, ScreenContainer, Flex, Button } from "@/components/partials";
import { BottomCaretIcon } from "@/icons";
import { useRouter } from "expo-router";
import {
  OnboardingHeader,
  OnboardingNextController,
} from "@/components/onboarding";
import BottomSheetMethods from "@gorhom/bottom-sheet";
import { BottomSheetSelector } from "@/components/partials/modules";
import { ethnicBackgrounds } from "@/utils/static";
import { SpecAdapter, useSpecMutation } from "@/adapters/SpecAdapter";

export default function EthnicBackground() {
  const router = useRouter();
  const [ethnicBackground, setEthnicBackground] = React.useState("");
  const [ethnicBackgroundFocused, setEthnicBackgroundFocused] =
    React.useState(false);

  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const handleOpenSelector = () => bottomSheetRef.current?.expand();

  const { mutateAsync, isPending } = useSpecMutation({
    mutationCallback: SpecAdapter.setupEthnicty,
  });

  const handleSetEthnicBackground = async () => {
    try {
      await mutateAsync({
        ethnicity: ethnicBackground,
      });
      router.navigate("/(spec-onboarding)/kid-tolerance");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}
      className="flex-1"
    >
      <OnboardingHeader
        heading="What's your cultural ethnic background?"
        step={1}
        totalSteps={8}
      />
      <ScreenContainer>
        <View
          style={{ display: "flex", justifyContent: "space-between", flex: 1 }}
        >
          <View>
            <TouchableWithoutFeedback
              onPress={() => {
                setEthnicBackgroundFocused(true);
              }}
            >
              <View>
                <View
                  style={[
                    {
                      paddingTop: theme.space[17],
                      display: "flex",
                      gap: theme.space[20],
                      borderBottomWidth: 1,
                      borderBottomColor: "#B5B5B0",
                      paddingBottom: theme.space[17],
                    },
                    ethnicBackgroundFocused &&
                      theme.actionStateStyles.inputFocused,
                  ]}
                >
                  <Flex
                    direction="row"
                    justify="space-between"
                    className="w-full"
                  >
                    <View className="text-soft-black">
                      <Text weight="medium" size={1}>
                        {!ethnicBackground
                          ? "Select Ethnic Background"
                          : ethnicBackground}
                      </Text>
                    </View>

                    <Pressable onPress={() => handleOpenSelector()}>
                      <BottomCaretIcon />
                    </Pressable>
                  </Flex>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ScreenContainer>
      <OnboardingNextController
        route="/(spec-onboarding)/kid-tolerance"
        canSkip={false}
        isNextButtonDisabled={false}
        onPressHandler={() => handleSetEthnicBackground()}
        isLoading={isPending}
      />

      <BottomSheetSelector
        itemList={ethnicBackgrounds}
        setValue={setEthnicBackground}
        value={ethnicBackground}
        title="Select Ethnic Background"
        placeHolder="Search for Ethnic Background"
        ref={bottomSheetRef}
      />
    </View>
  );
}
