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
import { countries } from "@/utils/static";
import {
  OnboardingAdapter,
  useOnboardingMutation,
} from "@/adapters/OnboardingAdapter";

export default function Country() {
  const router = useRouter();
  const [country, setCountry] = React.useState("");
  const [countryFocused, setCountryFocused] = React.useState(false);

  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const handleOpenSelector = () => bottomSheetRef.current?.expand();

  const { mutateAsync, isPending } = useOnboardingMutation({
    mutationCallback: OnboardingAdapter.setCountry,
  });

  const handleSetCountry = async () => {
    try {
      await mutateAsync({
        country,
      });
      router.navigate("/(onboarding)/language");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}
      className="flex-1"
    >
      <OnboardingHeader heading="What country are you from?" step={6} />
      <ScreenContainer>
        <View
          style={{ display: "flex", justifyContent: "space-between", flex: 1 }}
        >
          <View>
            <TouchableWithoutFeedback
              onPress={() => {
                setCountryFocused(true);
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
                    countryFocused && theme.actionStateStyles.inputFocused,
                  ]}
                >
                  <Flex
                    direction="row"
                    justify="space-between"
                    className="w-full"
                  >
                    <View className="text-soft-black">
                      <Text weight="medium" size={1}>
                        {!country ? "Select Country" : country}
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
        route="/(onboarding)/language"
        canSkip
        isNextButtonDisabled={false}
        onPressHandler={handleSetCountry}
        isLoading={isPending}
      />

      <BottomSheetSelector
        itemList={countries}
        setValue={setCountry}
        value={country}
        title="Select Country"
        placeHolder="Search for Country"
        ref={bottomSheetRef}
      />
    </View>
  );
}
