import { OnboardingHeader } from "@/components/onboarding";
import { Stack } from "expo-router";

export default function SpecOnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#fff" },
      }}
    >
      <Stack.Screen
        name="ethnic-background"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="kid-tolerance"
        options={{
          headerShown: true,
          header: () => (
            <OnboardingHeader
              heading="How many kids do you want?"
              step={2}
              totalSteps={6}
            />
          ),
        }}
      />
      <Stack.Screen
        name="traditional-family-roles"
        options={{
          headerShown: true,
          header: () => (
            <OnboardingHeader
              heading="How do you feel about traditional family roles?"
              step={3}
              totalSteps={6}
            />
          ),
        }}
      />
      <Stack.Screen
        name="traditional-food-attire"
        options={{
          headerShown: true,
          header: () => (
            <OnboardingHeader
              heading="How often do you eat traditional foods or wear traditional attire?"
              step={4}
              totalSteps={6}
            />
          ),
        }}
      />
      <Stack.Screen
        name="cultural-heritage"
        options={{
          headerShown: true,
          header: () => (
            <OnboardingHeader
              heading="How important is your cultural heritage to you?"
              step={5}
              totalSteps={6}
            />
          ),
        }}
      />
      <Stack.Screen
        name="marriage-customs"
        options={{
          headerShown: true,
          header: () => (
            <OnboardingHeader
              heading="Do you believe in traditional marriage customs like paying bride price?"
              step={6}
              totalSteps={6}
            />
          ),
        }}
      />
    </Stack>
  );
}
