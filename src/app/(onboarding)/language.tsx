import { theme } from "@/constants";
import React, { useRef } from "react";
import { Pressable, View, TouchableWithoutFeedback } from "react-native";
import { Text, ScreenContainer, Flex } from "@/components/partials";
import { BottomCaretIcon, StylizedGreyCheckIcon } from "@/icons";
import { useRouter } from "expo-router";
import {
  OnboardingHeader,
  OnboardingNextController,
} from "@/components/onboarding";
import BottomSheetMethods from "@gorhom/bottom-sheet";
import { africanLanguages } from "@/utils/static";
import { LanguageSelector } from "@/components/onboarding";
import {
  useOnboardingMutation,
  OnboardingAdapter,
} from "@/adapters/OnboardingAdapter";

export default function Language() {
  const router = useRouter();
  const [languages, setLanguages] = React.useState<string[] | null>([]);
  const [languageFocused, setLanguageFocused] = React.useState(false);

  const { mutateAsync, isPending } = useOnboardingMutation({
    mutationCallback: OnboardingAdapter.setLanguages,
  });

  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const handleOpenSelector = () => bottomSheetRef.current?.expand();

  const handleSetLanguages = async () => {
    try {
      await mutateAsync({
        lang: "English",
        otherlang: languages!,
      });
      router.navigate("/(onboarding)/religion");
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
      <OnboardingHeader heading="What languages do you speak?" step={7} />
      <ScreenContainer>
        <View
          style={{ display: "flex", justifyContent: "space-between", flex: 1 }}
        >
          <View>
            <View
              style={{
                paddingBottom: theme.space[31],
                paddingTop: theme.space[20],
              }}
            >
              <View
                style={{
                  borderRadius: theme.sizes[12],
                  backgroundColor: "#F3F3F2",
                  marginBottom: theme.space[12],
                }}
              >
                <Flex
                  px={12}
                  direction="row"
                  justify="space-between"
                  className="w-full"
                  pt={14}
                  pb={14}
                >
                  <Text weight="medium" className="text-[#696963]" size={1}>
                    English
                  </Text>
                  <StylizedGreyCheckIcon />
                </Flex>
              </View>

              <Text size={0} className="text-light-grey">
                English has been selected as your default language.
              </Text>
            </View>

            <View>
              <Text size={1}>What other languages do you speak?</Text>

              <TouchableWithoutFeedback
                onPress={() => {
                  setLanguageFocused(true);
                }}
                style={{ paddingTop: theme.space[14] }}
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
                      languageFocused && theme.actionStateStyles.inputFocused,
                    ]}
                  >
                    <Flex
                      direction="row"
                      justify="space-between"
                      className="w-full"
                    >
                      <View className="text-soft-black">
                        <Text weight="medium" size={1}>
                          {languages?.length === 0
                            ? "Select Languages"
                            : languages?.join()}
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
        </View>
      </ScreenContainer>
      <OnboardingNextController
        route="/(onboarding)/religion"
        canSkip
        isNextButtonDisabled={false}
        isLoading={isPending}
        onPressHandler={handleSetLanguages}
      />

      <LanguageSelector
        itemList={africanLanguages}
        setValue={setLanguages}
        value={languages}
        title="Select your Language"
        placeHolder="Search for Language"
        ref={bottomSheetRef}
      />
    </View>
  );
}
