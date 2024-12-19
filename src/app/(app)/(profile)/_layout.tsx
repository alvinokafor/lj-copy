import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#fff" },
      }}
    >
      <Stack.Screen
        name="update-bio"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="update-dob"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="update-country"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="update-language"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="update-religion"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="update-job"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
