import React, { useCallback, useMemo, forwardRef, useState } from "react";
import { View, Pressable, Switch } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { theme, unit } from "@/constants";
import { ModalCloseIcon } from "@/icons";
import { Button, Flex, Text } from "../partials";
import { useQueryClient } from "@tanstack/react-query";

const CancelMembershipModal = forwardRef<BottomSheetModal>((_props, ref) => {
  const snapPoints = useMemo(() => ["45%", "45%"], []);

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
        paddingHorizontal: theme.space[20],
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
            <Flex align="flex-start" gap={17}>
              <Text size={4} fontFamily="Merchant">
                Cancel Your Membership
              </Text>
              <Text>
                Whatever you choose, it’ll take effect on{" "}
                <Text weight="semibold">9 December 2024.</Text>
                You’ll still be able to use love jollof until then.
              </Text>

              <View
                style={{
                  paddingVertical: unit(12),
                  backgroundColor: "#F0D7A8",
                  borderRadius: theme.sizes[8],
                }}
                className="w-full"
              >
                <Text className="text-center">Member Since March 2024</Text>
              </View>
            </Flex>

            <Button title="Contact Support" style={{ marginTop: unit(26) }} />
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default CancelMembershipModal;
