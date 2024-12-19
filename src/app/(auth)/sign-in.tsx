import React, { useState } from "react";
import { View, Pressable, ActivityIndicator } from "react-native";
import { GoogleIcon } from "@/icons";
import { useRouter } from "expo-router";
import { AuthWrapper } from "@/components/auth";
import { theme } from "@/constants";
import { Text } from "@/components/partials";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { AuthAdapter, useAuthMutation } from "@/adapters/AuthAdapter";
import { storeData } from "@/utils/data-store";

export default function GetStarted() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync, isPending, error } = useAuthMutation({
    mutationCallback: AuthAdapter.googleSignOn,
  });

  GoogleSignin.configure({
    webClientId:
      "20834141401-fh823bn1sa9448g2e6lkh24hrutbaamr.apps.googleusercontent.com",
  });

  async function handleSignInWithGoogle() {
    setIsLoading(true);
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      // Get the users ID token
      const userData = await GoogleSignin.signIn();
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(
        userData.data?.idToken!
      );

      // Sign-in the user with the credential
      const userCredential = await auth().signInWithCredential(
        googleCredential
      );

      const res = await mutateAsync({
        data: {
          displayName: userCredential.user.displayName!,
          email: userCredential.user.email!,
          emailVerified: userCredential.user.emailVerified!,
          photoURL: userCredential.user.photoURL!,
        },
      });

      await storeData("accessToken", res.token);

      router.push("/");
    } catch (error) {
      //@ts-ignore
      console.error("Error", error.request?._response);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthWrapper>
      <View
        style={{
          borderTopEndRadius: theme.space[20],
          borderTopStartRadius: theme.space[20],
          paddingTop: theme.space[23],
          paddingBottom: theme.space[46],
          paddingHorizontal: theme.space[24],
          display: "flex",
          gap: theme.space[20],
        }}
        className="w-full bg-white"
      >
        <View style={{ display: "flex", gap: theme.space[12] }}>
          <Text
            className="text-center text-text-dark"
            size={2}
            weight="regular"
          >
            You signed in with Google the last time
          </Text>
          <Pressable
            style={{
              paddingHorizontal: theme.space[56],
              paddingVertical: theme.space[15],
              borderRadius: theme.space[12],
            }}
            className="bg-grey active:bg-grey/70"
            onPress={handleSignInWithGoogle}
            disabled={isLoading}
          >
            <View className="flex flex-row items-center gap-2 mx-auto">
              {isLoading ? (
                <ActivityIndicator color="#696963" />
              ) : (
                <GoogleIcon />
              )}
              <Text weight="medium" className="text-center text-dark-grey">
                {isLoading ? "Signing in..." : "Continue with Google"}
              </Text>
            </View>
          </Pressable>
        </View>
        <View
          style={{
            borderColor: "#F3F3F2",
            borderStyle: "solid",
            borderTopWidth: 1,
            paddingTop: theme.space[20],
          }}
          className="flex flex-row items-center w-full justify-center gap-1 mx-auto"
        >
          <Text className="text-center text-[#696963]" size={2}>
            Don't have an account?
          </Text>
          <Pressable onPress={() => router.push("/(auth)/sign-up")}>
            <Text weight="bold" size={2}>
              Sign Up
            </Text>
          </Pressable>
        </View>
      </View>
    </AuthWrapper>
  );
}
