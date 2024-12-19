import { Stack } from "expo-router";

export default function PermissionsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="allow-push-notifications"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="allow-location" options={{ headerShown: false }} />
    </Stack>
  );
}
