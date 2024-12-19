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
import { MuteNotificationsIcon, ReportIcon } from "./icons";

const list = ["24 Hours", "7 Days", "30 Days", "Forever"];

const MuteNotificationsBottomSheet = forwardRef<BottomSheetMethods>(
  (_props, ref) => {
    const snapPoints = useMemo(() => ["55%", "55%"], []);

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
                <MuteNotificationsIcon fill={"#1E1E1C"} />

                <Text size={4} fontFamily="Merchant">
                  Mute Notifications
                </Text>
              </Flex>

              <Text
                className="text-[#353531]"
                style={{ paddingTop: theme.space[12] }}
              >
                How long do you want to mute this chat for?
              </Text>
            </View>

            <ScrollView
              contentContainerStyle={{
                gap: unit(8),
                paddingTop: unit(17),
                paddingBottom: unit(17),
              }}
            >
              {list.map((item, index) => (
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
                    <Text
                      weight="medium"
                      className={"text-soft-black"}
                      size={1}
                    >
                      {item}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              ))}
            </ScrollView>

            <View>
              <Button
                title="Save"
                titleStyle={{ fontFamily: "BRSonoma-Medium" }}
              />
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

export default MuteNotificationsBottomSheet;
