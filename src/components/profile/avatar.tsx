import React from "react";
import { Text } from "../partials";
import { View, Image, Pressable } from "react-native";
import { unit } from "@/constants";
import {
  OnboardingAdapter,
  useOnboardingQuery,
} from "@/adapters/OnboardingAdapter";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

export default function Avatar({
  uri,
  completeProfileModalRef,
}: {
  uri?: string;
  completeProfileModalRef: React.RefObject<BottomSheetModalMethods>;
}) {
  const onboardingProgressQuery = useOnboardingQuery({
    queryCallback: OnboardingAdapter.getOnboardingProgress,
    queryKey: ["ONBOARDING_PROGRESS"],
  });

  return (
    <View>
      <View
        style={{
          height: unit(106),
          width: unit(106),
          borderRadius: 9999,
          overflow: "hidden",
          marginTop: unit(21),
          borderWidth: onboardingProgressQuery.data?.data.score === 100 ? 0 : 5,
          borderColor: "#9DBA78",
        }}
        className="mx-auto"
      >
        <Image
          resizeMode="cover"
          source={{
            uri: uri
              ? uri
              : "https://images.unsplash.com/photo-1541216970279-affbfdd55aa8?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          style={{ height: unit(106), width: unit(106) }}
        />
      </View>
      {onboardingProgressQuery.data?.data.score !== 1000 && (
        <Pressable
          style={{
            backgroundColor: "#6A8745",
            borderRadius: unit(26),
            position: "relative",
            top: unit(-9),
          }}
          className="mx-auto"
          onPress={() => completeProfileModalRef.current?.present()}
        >
          <Text
            size={0}
            style={{
              paddingHorizontal: unit(10),
              paddingTop: unit(4),
              paddingBottom: unit(4),
              color: "#fff",
            }}
          >
            Complete Profile {onboardingProgressQuery.data?.data.score}%
          </Text>
        </Pressable>
      )}
    </View>
  );
}
