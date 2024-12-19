import React, { useCallback, useMemo, forwardRef } from "react";
import { View, Pressable } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { theme, unit } from "@/constants";
import { ModalCloseIcon } from "@/icons";
import { Flex, Text, Button } from "../partials";
import { SpecIllustration } from "@/icons/illustrations";
import { useRouter } from "expo-router";

const SpecWelcomeBottomSheet = forwardRef<BottomSheetModal>((_props, ref) => {
  const router = useRouter();
  const snapPoints = useMemo(() => ["90%", "90%"], []);

  // renders backdrop for bottom sheet
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        style={{ zIndex: 1000 }}
        {...props}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      snapPoints={snapPoints}
      ref={ref}
      backdropComponent={renderBackdrop}
      index={1}
      style={{
        paddingHorizontal: theme.space[24],
        zIndex: 30,
      }}
      handleIndicatorStyle={{ backgroundColor: "#fff" }}
      enablePanDownToClose
    >
      <BottomSheetView>
        <View className="relative">
          <View
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
            className="h-full"
          >
            <Flex>
              <SpecIllustration />
              <Text
                style={{
                  paddingTop: theme.space[12],
                  paddingBottom: theme.space[15],
                }}
                size={5}
                fontFamily="Merchant"
              >
                Welcome to Spec
              </Text>
              <Text size={1} className="text-[#4F4F4A] text-center w-[90%]">
                Let’s set up spec for you by asking you purposed questions
              </Text>
            </Flex>
          </View>

          <Button
            title={`Continue`}
            weight="medium"
            style={{
              marginTop: unit(27),
              position: "absolute",
              bottom: unit(38),
              left: 0,
              right: 0,
            }}
            onPress={() =>
              router.push("/(app)/(spec-onboarding)/ethnic-background")
            }
          />
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default SpecWelcomeBottomSheet;
