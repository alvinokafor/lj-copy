import { theme, unit } from "@/constants";
import React, { useRef } from "react";
import { Pressable, View, TouchableWithoutFeedback } from "react-native";
import { Text, ScreenContainer, Flex, Button } from "@/components/partials";
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
import { UserAdapter, useUserMutation } from "@/adapters/UserAdapter";
import { queryKeys } from "@/constants/query-keys";
import { useQueryClient } from "@tanstack/react-query";
import { UpdateProfileHeader } from "@/components/profile";

export default function UpdateLanguage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [languages, setLanguages] = React.useState<string[] | null>([]);
  const [languageFocused, setLanguageFocused] = React.useState(false);

  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const handleOpenSelector = () => bottomSheetRef.current?.expand();

  const { mutateAsync, isPending } = useUserMutation({
    mutationCallback: UserAdapter.editUserProfile,
  });

  const handleUpdateLanguage = async () => {
    try {
      const res = await mutateAsync({ language: languages?.join() });
      queryClient.invalidateQueries({ queryKey: [queryKeys.USER] });
      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}
      className="flex-1"
    >
      <ScreenContainer>
        <UpdateProfileHeader heading="What languages do you speak?" />
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
      <View
        style={{
          paddingHorizontal: theme.space[15],
          paddingBottom: unit(50),
        }}
      >
        <Button
          title="Save"
          isLoading={isPending}
          onPress={handleUpdateLanguage}
        />
      </View>

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
