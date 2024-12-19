import React, { useCallback, useMemo, forwardRef } from "react";
import { View, Pressable, TouchableWithoutFeedback } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { theme, unit } from "@/constants";
import { ModalCloseIcon } from "@/icons";
import { Button, Flex, Text } from "../partials";
import { ScrollView } from "react-native-gesture-handler";
import { BlockIcon, MuteNotificationsIcon, ReportIcon } from "./icons";

const BlockBottomSheet = forwardRef<BottomSheetMethods>((_props, ref) => {
  const snapPoints = useMemo(() => ["32%", "32%"], []);

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
    <BottomSheet
      snapPoints={snapPoints}
      ref={ref}
      backdropComponent={renderBackdrop}
      index={-1}
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
          <Pressable onPress={() => ref?.current?.close()}>
            <ModalCloseIcon />
          </Pressable>

          <View style={{ paddingTop: theme.space[20] }}>
            <Flex direction="row" align="center" gap={8}>
              <BlockIcon />

              <Text size={4} fontFamily="Merchant">
                Block Toyosi Adebeyo
              </Text>
            </Flex>

            <Text
              className="text-[#353531]"
              style={{ paddingTop: theme.space[12] }}
            >
              Are you sure you want to block this profile your display photo?
              You can unblock this profile later
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
              title="Yes, Block"
              titleStyle={{ fontFamily: "BRSonoma-Medium", fontSize: unit(16) }}
              style={{ width: "50%" }}
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
            />
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
});

export default BlockBottomSheet;
