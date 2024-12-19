import { OnboardingHeader } from "@/components/onboarding";
import { useOnboardingStore } from "@/stores";
import { Stack } from "expo-router";

export default function OnboardingLayout() {
  const phoneNumber = useOnboardingStore((state) => state.phoneNumber);
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#fff" },
      }}
    >
      <Stack.Screen
        name="verify-mobile-number"
        options={{
          headerShown: true,
          header: () => (
            <OnboardingHeader
              heading="Verify your mobile number with a code"
              subHeading="We’ll send a code to you to secure your account."
              indicator={false}
              headerSize={6}
              headerWidth={"95%"}
              headerSpacing={8}
            />
          ),
        }}
      />
      <Stack.Screen
        name="verify-otp"
        options={{
          headerShown: true,
          header: () => (
            <OnboardingHeader
              heading={`Enter 6 digits code sent to ${phoneNumber}`}
              subHeading="We sent a code to you to help keep your account secure. "
              indicator={false}
              headerSize={6}
              headerWidth={"100%"}
              headerSpacing={8}
            />
          ),
        }}
      />
      <Stack.Screen
        name="name"
        options={{
          headerShown: true,
          header: () => (
            <OnboardingHeader heading="What is your name?" step={1} />
          ),
        }}
      />
      <Stack.Screen
        name="age"
        options={{
          headerShown: true,
          header: () => (
            <OnboardingHeader heading="What’s your date of birth?" step={2} />
          ),
        }}
      />
      <Stack.Screen
        name="gender"
        options={{
          headerShown: true,
          header: () => (
            <OnboardingHeader heading="What’s your gender?" step={3} />
          ),
        }}
      />
      <Stack.Screen
        name="relationship-status"
        options={{
          headerShown: true,
          header: () => (
            <OnboardingHeader
              heading="What’s your relationship status?"
              step={4}
            />
          ),
        }}
      />
      <Stack.Screen
        name="height"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="country"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="language"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="religion"
        options={{
          headerShown: true,
          header: () => (
            <OnboardingHeader
              heading="What religion do you practice?"
              step={8}
            />
          ),
        }}
      />
      <Stack.Screen
        name="job"
        options={{
          headerShown: true,
          header: () => (
            <OnboardingHeader
              heading="What job do you do?"
              subHeading="It is completely okay not to say, but it can plus for you."
              step={9}
            />
          ),
        }}
      />
      <Stack.Screen
        name="degree"
        options={{
          headerShown: true,
          header: () => (
            <OnboardingHeader
              heading="What was your highest degree?"
              step={10}
            />
          ),
        }}
      />
      <Stack.Screen
        name="about"
        options={{
          headerShown: true,
          header: () => (
            <OnboardingHeader
              heading="Tell people about yourself"
              subHeading="What are the things you like to do "
              step={10}
            />
          ),
        }}
      />
      <Stack.Screen
        name="interests"
        options={{
          headerShown: true,
          header: () => (
            <OnboardingHeader
              heading="What initiatives do you support?"
              step={12}
            />
          ),
        }}
      />
      <Stack.Screen
        name="upload-photos"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
