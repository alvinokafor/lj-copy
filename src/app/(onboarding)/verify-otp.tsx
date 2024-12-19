import { theme } from "@/constants";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, View, TextInput, ActivityIndicator } from "react-native";
import { Text, ScreenContainer } from "@/components/partials";
import { useRouter } from "expo-router";
import {
  useOnboardingMutation,
  OnboardingAdapter,
} from "@/adapters/OnboardingAdapter";
import { useOnboardingStore } from "@/stores";

export default function VerifyMobileNumber() {
  const router = useRouter();
  const [timer, setTimer] = useState(59);
  const [otp, setOtp] = useState("");
  const [isResendVisible, setIsResendVisible] = useState(false);

  const phoneNumber = useOnboardingStore((state) => state.phoneNumber);
  const countryCode = useOnboardingStore((state) => state.countryCode);

  const { mutateAsync, isPending } = useOnboardingMutation({
    mutationCallback: OnboardingAdapter.verifyPhoneNumber,
  });

  const handleVerifyPhoneNumber = async () => {
    try {
      await mutateAsync({
        phoneNumber,
        countryCode,
        otp,
      });
      router.replace("/(onboarding)/name");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (otp.length === 6) handleVerifyPhoneNumber();
  }, [otp]);

  useEffect(() => {
    let countdown: any;

    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else {
      setIsResendVisible(true);
      clearInterval(countdown);
    }

    return () => {
      clearInterval(countdown);
    };
  }, [timer]);

  const formatTimer = useCallback(() => {
    // Format the timer to display as '09' when it's less than 10
    return timer < 10 ? `0${timer}` : timer;
  }, [timer]);

  return (
    <>
      <ScreenContainer>
        <View
          style={{ display: "flex", justifyContent: "space-between", flex: 1 }}
        >
          <View style={{ display: "flex", gap: theme.space[11] }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: theme.space[14],
                borderBottomWidth: 1,
                borderBottomColor: "#B5B5B0",
              }}
              className="w-full"
            >
              <TextInput
                style={{
                  fontFamily: "BRSonoma-Medium",
                  fontSize: theme.fontSize[20],
                }}
                onChangeText={setOtp}
                value={otp}
                placeholder="******"
                placeholderTextColor={"#9C9C96"}
                maxLength={6}
              />

              {isPending && otp.length === 6 && <ActivityIndicator />}
            </View>

            <Text size={0}>
              <Text size={0} className="text-light-grey">
                Code will expire in
              </Text>{" "}
              0:{formatTimer()}
            </Text>
          </View>
        </View>
      </ScreenContainer>
      <Pressable
        style={{ margin: theme.space[42] }}
        onPress={() => router.push("/(onboarding)/name")}
        disabled={timer > 0}
      >
        <Text
          weight="semibold"
          className={`${
            timer > 0 ? "text-gray-400" : "text-coffee-500"
          } text-center`}
        >
          Didn’t get code? Resend{" "}
        </Text>
      </Pressable>
    </>
  );
}