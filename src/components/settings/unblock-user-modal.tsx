import React, { useCallback, useMemo, forwardRef } from "react";
import { View, Pressable } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { theme, unit } from "@/constants";
import { ModalCloseIcon } from "@/icons";
import { Button, Flex, Text } from "../partials";
import { useQueryClient } from "@tanstack/react-query";

const UnblockUserModal = forwardRef<BottomSheetModal>((_props, ref) => {
  const snapPoints = useMemo(() => ["32%", "32%"], []);
  const queryClient = useQueryClient();

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
        <View style={{ paddingBottom: theme.space[12] }}>
          {/* @ts-ignore */}
          <Pressable onPress={() => ref?.current?.dismiss()}>
            <ModalCloseIcon />
          </Pressable>

          <View style={{ paddingTop: theme.space[20] }}>
            <Flex direction="row" align="center" gap={8}>
              <Text size={4} fontFamily="Merchant">
                Unblock Profile
              </Text>
            </Flex>

            <Text
              className="text-[#353531]"
              style={{ paddingTop: theme.space[12] }}
            >
              Are you sure you want to unblock this profile?
            </Text>
          </View>

          <View
            style={{
              paddingTop: theme.space[32],
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
            }}
          >
            <Button
              title="Yes, Unblock"
              titleStyle={{
                fontFamily: "BRSonoma-Medium",
                fontSize: unit(16),
                color: "#fff",
              }}
              style={{ width: "50%" }}
              backgroundColor="#422618"
            />
            <Button
              title="Cancel"
              titleStyle={{
                fontFamily: "BRSonoma-Medium",
                fontSize: unit(16),
                color: "#1E1E1C",
              }}
              style={{ width: "50%" }}
              backgroundColor="#fff"
              //@ts-ignore
              onPress={() => ref?.current?.dismiss()}
            />
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default UnblockUserModal;
