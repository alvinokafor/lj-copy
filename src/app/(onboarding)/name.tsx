import { theme } from "@/constants";
import React, { useMemo } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Text, ScreenContainer, Flex, Button } from "@/components/partials";
import { useRouter } from "expo-router";
import { OnboardingNextController } from "@/components/onboarding";
import { useOnboardingStore } from "@/stores";
import {
  useOnboardingMutation,
  OnboardingAdapter,
} from "@/adapters/OnboardingAdapter";

export default function Name() {
  const router = useRouter();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [firstNameFocused, setFirstNameFocused] = React.useState(false);
  const [lastNameFocused, setLastNameFocused] = React.useState(false);
  const updateOnboardingData = useOnboardingStore(
    (state) => state.updateOnboardingData
  );

  const { mutateAsync, isPending } = useOnboardingMutation({
    mutationCallback: OnboardingAdapter.setName,
  });

  const isButtonDisabled = useMemo(() => {
    return firstName.trim() === "" || lastName.trim() === "";
  }, [firstName, lastName]);

  const handleSetFullName = async () => {
    try {
      await mutateAsync({
        firstName,
        lastName,
      });
      updateOnboardingData("name", `${firstName} ${lastName}`);
      router.replace("/(onboarding)/age");
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
                paddingTop: theme.space[32],
                display: "flex",
                gap: theme.space[37],
              }}
            >
              <Flex align="flex-start" gap={4} className="w-full">
                {firstNameFocused ||
                  (firstName && (
                    <Text className="text-[#696963]" weight="medium" size={0}>
                      First Name
                    </Text>
                  ))}
                <TextInput
                  style={[
                    {
                      borderBottomWidth: 1,
                      borderBottomColor: "#B5B5B0",
                      paddingBottom: theme.space[8],
                      fontFamily: "BRSonoma-Medium",
                    },
                    firstNameFocused && styles.inputFocused,
                  ]}
                  onChangeText={setFirstName}
                  value={firstName}
                  placeholder={!firstNameFocused ? "First Name" : ""}
                  className="text-soft-black w-full"
                  onFocus={() => setFirstNameFocused(true)}
                  onBlur={() => setFirstNameFocused(false)}
                />
              </Flex>
              <Flex align="flex-start" gap={4} className="w-full">
                {lastNameFocused ||
                  (lastName && (
                    <Text className="text-[#696963]" weight="medium" size={0}>
                      Last Name
                    </Text>
                  ))}
                <TextInput
                  style={[
                    {
                      borderBottomWidth: 1,
                      borderBottomColor: "#B5B5B0",
                      paddingBottom: theme.space[8],
                      fontFamily: "BRSonoma-Medium",
                    },
                    lastNameFocused && styles.inputFocused,
                  ]}
                  onChangeText={setLastName}
                  value={lastName}
                  placeholder={!lastNameFocused ? "Last Name" : ""}
                  className="text-soft-black w-full"
                  onFocus={() => setLastNameFocused(true)}
                  onBlur={() => setLastNameFocused(false)}
                />
              </Flex>
            </View>
          </View>
        </View>
      </ScreenContainer>
      <OnboardingNextController
        route="/(onboarding)/age"
        canSkip={false}
        isNextButtonDisabled={isButtonDisabled}
        onPressHandler={handleSetFullName}
        isLoading={isPending}
      />
    </>
  );
}

const styles = StyleSheet.create({
  inputFocused: {
    borderBottomColor: "#F1DAAE", // You can change this to your preferred focus color
  },
});
