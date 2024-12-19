import { theme } from "@/constants";
import React from "react";
import { View, TextInput } from "react-native";
import { Text, ScreenContainer, Flex } from "@/components/partials";
import { OnboardingNextController } from "@/components/onboarding";
import { useRouter } from "expo-router";
import {
  useOnboardingMutation,
  OnboardingAdapter,
} from "@/adapters/OnboardingAdapter";

export default function About() {
  const router = useRouter();
  const [about, setAbout] = React.useState("");
  const [aboutFocused, setAboutFocused] = React.useState(false);
  const [numOfLines, setNumOfLines] = React.useState(0);

  const { mutateAsync, isPending } = useOnboardingMutation({
    mutationCallback: OnboardingAdapter.setBio,
  });

  const handleSetBio = async () => {
    try {
      await mutateAsync({
        aboutMe: about,
      });
      router.navigate("/(onboarding)/interests");
    } catch (e) {
      console.log(e);
    }
  };

  const setLines = (text: string) => {
    if (text) {
      //calculate how many lines
      const lines = text.split("\n").length;
      console.log(`total lines count: ${lines}`);
      setNumOfLines(Math.min(5, lines));
    }
  };

  React.useEffect(() => {
    setLines(about);
  }, []);

  return (
    <>
      <ScreenContainer>
        <View
          style={{ display: "flex", justifyContent: "space-between", flex: 1 }}
        >
          <View>
            <View
              style={{
                paddingTop: theme.space[20],
                display: "flex",
                gap: theme.space[20],
              }}
            >
              <Flex align="flex-start" gap={4} className="w-full">
                {aboutFocused && (
                  <Text className="text-[#696963]" weight="medium" size={0}>
                    About me
                  </Text>
                )}
                <TextInput
                  style={[
                    {
                      borderBottomWidth: 1,
                      borderBottomColor: "#B5B5B0",
                      paddingBottom: theme.space[8],
                      fontFamily: "BRSonoma-Medium",
                      textAlignVertical: "top",
                    },
                    aboutFocused && theme.actionStateStyles.inputFocused,
                  ]}
                  onChangeText={setAbout}
                  value={about}
                  placeholder={!aboutFocused ? "About me" : ""}
                  className="text-soft-black w-full"
                  onFocus={() => setAboutFocused(true)}
                  onBlur={() => setAboutFocused(false)}
                  multiline
                  numberOfLines={numOfLines}
                />
              </Flex>
            </View>
          </View>
        </View>
      </ScreenContainer>
      <OnboardingNextController
        route="/(onboarding)/interests"
        canSkip
        isNextButtonDisabled={false}
        isLoading={isPending}
        onPressHandler={handleSetBio}
      />
    </>
  );
}
