import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";

export default function SpecOnboardingLayout() {
  return (
    <BottomSheetModalProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#fff" },
        }}
      >
        <Stack.Screen
          name="settings"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="account"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="change-number"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="verify-number"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="subscriptions"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="privacy"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </BottomSheetModalProvider>
  );
}
