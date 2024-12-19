import { Stack } from "expo-router";

export default function AppEntry() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(spec-onboarding)" options={{ headerShown: false }} />
      {/* <Stack.Screen name="chat-screen" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
