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
import { ReportIcon } from "./icons";

const reportList = [
  "Nude Contents",
  "Improper Communication",
  "Harsh Words",
  "Fake Profile",
  "Scamming Activity",
  "Other",
];

const ReportBottomSheet = forwardRef<BottomSheetMethods>((_props, ref) => {
  const snapPoints = useMemo(() => ["80%", "80%"], []);

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
              <ReportIcon fill={"#1E1E1C"} />

              <Text size={4} fontFamily="Merchant">
                Report
              </Text>
            </Flex>

            <Text
              className="text-[#353531]"
              style={{ paddingTop: theme.space[12] }}
            >
              Why are you reporting this profile
            </Text>
          </View>

          <ScrollView
            contentContainerStyle={{
              gap: unit(8),
              paddingTop: unit(24),
              paddingBottom: unit(32),
            }}
          >
            {reportList.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                style={{ marginBottom: theme.space[12] }}
              >
                <View
                  style={{
                    borderRadius: theme.sizes[12],
                    paddingTop: unit(15),
                    paddingBottom: unit(15),
                    paddingHorizontal: unit(16),
                  }}
                  className={`bg-grey`}
                >
                  <Text weight="medium" className={"text-soft-black"} size={1}>
                    {item}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </ScrollView>

          <View>
            <Button
              title="Send"
              titleStyle={{ fontFamily: "BRSonoma-Medium" }}
            />
            <Button
              title="No, Cancel"
              titleStyle={{ fontFamily: "BRSonoma-Medium", color: "#1E1E1C" }}
              backgroundColor="#F3F3F2"
              style={{ marginTop: unit(13) }}
            />
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
});

export default ReportBottomSheet;
