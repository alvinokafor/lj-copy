import React, { useCallback, useMemo, forwardRef } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import {
  BottomSheetMethods,
  BottomSheetModalMethods,
} from "@gorhom/bottom-sheet/lib/typescript/types";
import { theme, unit } from "@/constants";
import { Text, Button, Flex } from "../partials";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import {
  MediaIcon,
  ReportIcon,
  MuteNotificationsIcon,
  BlockIcon,
} from "./icons";
import { act } from "react-test-renderer";
import { useRouter } from "expo-router";

interface IProps {
  reportBottomSheetRef: React.RefObject<BottomSheetMethods>;
  muteNotificationsBottomSheetRef: React.RefObject<BottomSheetMethods>;
  blockBottomSheetRef: React.RefObject<BottomSheetMethods>;
}

const MoreOptionsModal = forwardRef<BottomSheet, IProps>((props, ref) => {
  const snapPoints = useMemo(() => ["40%", "40%"], []);
  const router = useRouter();

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

  const moreOptions = [
    {
      title: "Media",
      icon: <MediaIcon />,
      action: () => router.push("/(app)/chat-screen/media"),
    },

    {
      title: "Mute Notifications",
      icon: <MuteNotificationsIcon />,
      action: () => props.muteNotificationsBottomSheetRef?.current?.expand(),
    },

    {
      title: "Block",
      icon: <BlockIcon />,
      action: () => props.blockBottomSheetRef?.current?.expand(),
    },
    {
      title: "Report",
      icon: <ReportIcon />,
      action: () => props.reportBottomSheetRef?.current?.expand(),
    },
  ];

  return (
    <BottomSheet
      snapPoints={snapPoints}
      ref={ref}
      backdropComponent={renderBackdrop}
      index={-1}
      style={{
        paddingHorizontal: unit(24),
        zIndex: 30,
      }}
      handleIndicatorStyle={{
        backgroundColor: "#CECECA",
        marginTop: unit(20),
        marginBottom: unit(12),
      }}
      enablePanDownToClose
    >
      <BottomSheetView>
        <View style={{ paddingBottom: unit(28) }}>
          <ScrollView>
            {moreOptions.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                style={{ marginBottom: theme.space[12] }}
                onPress={item.action}
              >
                <View
                  style={{ borderRadius: theme.sizes[12] }}
                  className={`bg-grey`}
                >
                  <Flex
                    px={12}
                    direction="row"
                    gap={8}
                    className="w-full"
                    pt={15}
                    pb={15}
                  >
                    {item.icon}
                    <Text
                      weight="medium"
                      className={
                        item.title === "Report"
                          ? "text-[#CC0A00]"
                          : "text-soft-black"
                      }
                      size={1}
                    >
                      {item.title}
                    </Text>
                  </Flex>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </ScrollView>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
});

export default MoreOptionsModal;
