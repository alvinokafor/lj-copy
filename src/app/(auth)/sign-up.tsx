import { View, Pressable, ActivityIndicator, Alert } from "react-native";
import { GoogleIcon, FaceBookIcon, AppleIcon } from "@/icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { AuthWrapper } from "@/components/auth";
import { Text } from "@/components/partials";
import { theme } from "@/constants";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { AuthAdapter, useAuthMutation } from "@/adapters/AuthAdapter";
import { useOnboardingStore } from "@/stores";
import { clearData, storeData } from "@/utils/data-store";
import { showToast } from "@/utils";

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
      console.log(res);
      await clearData("accessToken");
      await storeData("accessToken", res.token);

      router.push("/(onboarding)/verify-mobile-number");
    } catch (error) {
      setIsLoading(false);
      showToast({
        type: "error",
        body: "Something went wrong",
        title: "Error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthWrapper translateY={-50}>
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
          <Text className=" text-center text-text-dark" size={3}>
            Let’s connect with a potential partner
          </Text>

          <View style={{ display: "flex", gap: theme.space[13] }}>
            <Pressable
              style={{
                paddingLeft: theme.space[80],
                paddingRight: theme.space[56],
                paddingVertical: theme.space[16],
              }}
              className="bg-grey rounded-xl active:bg-grey/70 "
              onPress={handleSignInWithGoogle}
            >
              <View className="flex flex-row items-center gap-2 mx-auto">
                {isLoading ? (
                  <View style={{ flexBasis: "12%" }}>
                    <ActivityIndicator color="#696963" />
                  </View>
                ) : (
                  <View style={{ flexBasis: "12%" }}>
                    <GoogleIcon />
                  </View>
                )}
                <Text
                  style={{ flexBasis: "80%" }}
                  weight="medium"
                  className="text-left text-dark-grey"
                >
                  {isLoading ? "Signing in..." : "Continue with Google"}
                </Text>
              </View>
            </Pressable>

            <Pressable
              style={{
                paddingLeft: theme.space[80],
                paddingRight: theme.space[56],
                paddingVertical: theme.space[15],
              }}
              className="bg-grey rounded-xl active:bg-grey/70"
              onPress={() => router.navigate("/(auth)/welcome")}
            >
              <View className="flex flex-row items-center gap-2 mx-auto">
                <View style={{ flexBasis: "12%" }}>
                  <AppleIcon />
                </View>
                <Text
                  style={{ flexBasis: "80%" }}
                  weight="medium"
                  className=" text-left text-[#1E1E1C]"
                >
                  Continue with Apple
                </Text>
              </View>
            </Pressable>

            <Pressable
              style={{
                paddingLeft: theme.space[80],
                paddingRight: theme.space[58],
                paddingVertical: theme.space[15],
              }}
              className="bg-grey rounded-xl active:bg-grey/70  "
            >
              <View className="flex flex-row items-center gap-2 mx-auto">
                <View style={{ flexBasis: "12%" }}>
                  <FaceBookIcon />
                </View>
                <Text
                  style={{ flexBasis: "80%" }}
                  weight="medium"
                  className=" text-left text-[#1E1E1C]"
                >
                  Continue with Facebook
                </Text>
              </View>
            </Pressable>
          </View>
        </View>

        <View
          style={{
            borderColor: "#F3F3F2",
            borderStyle: "solid",
            borderTopWidth: 1,
            paddingTop: theme.space[20],
          }}
          className="flex  flex-row items-center w-full justify-center gap-1 mx-auto"
        >
          <Text size={2} className="text-center  text-[#696963]">
            Do you have an account?
          </Text>
          <Pressable onPress={() => router.push("/(auth)/sign-in")}>
            <Text weight="bold" size={2} className=" text-text-dark">
              Sign In
            </Text>
          </Pressable>
        </View>
      </View>
    </AuthWrapper>
  );
}
