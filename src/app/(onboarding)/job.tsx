import { theme } from "@/constants";
import React from "react";
import { View, TextInput } from "react-native";
import { Text, ScreenContainer, Flex } from "@/components/partials";
import { useRouter } from "expo-router";
import { OnboardingNextController } from "@/components/onboarding";
import {
  useOnboardingMutation,
  OnboardingAdapter,
} from "@/adapters/OnboardingAdapter";

export default function Job() {
  const router = useRouter();
  const [job, setJob] = React.useState("");
  const [jobFocused, setJobFocused] = React.useState(false);

  const { mutateAsync, isPending } = useOnboardingMutation({
    mutationCallback: OnboardingAdapter.setJob,
  });

  const handleSetJob = async () => {
    try {
      await mutateAsync({
        job,
      });
      router.navigate("/(onboarding)/degree");
    } catch (e) {
      console.log(e);
    }
  };

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
                {jobFocused && (
                  <Text className="text-[#696963]" weight="medium" size={0}>
                    Job Title
                  </Text>
                )}
                <TextInput
                  style={[
                    {
                      borderBottomWidth: 1,
                      borderBottomColor: "#B5B5B0",
                      paddingBottom: theme.space[8],
                      fontFamily: "BRSonoma-Medium",
                    },
                    jobFocused && theme.actionStateStyles.inputFocused,
                  ]}
                  onChangeText={setJob}
                  value={job}
                  placeholder={!jobFocused ? "Job Title" : ""}
                  className="text-soft-black w-full"
                  onFocus={() => setJobFocused(true)}
                  onBlur={() => setJobFocused(false)}
                />
              </Flex>
            </View>
          </View>
        </View>
      </ScreenContainer>
      <OnboardingNextController
        route="/(onboarding)/degree"
        canSkip
        isNextButtonDisabled={false}
        isLoading={isPending}
        onPressHandler={handleSetJob}
      />
    </>
  );
}
