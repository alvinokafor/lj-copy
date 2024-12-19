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

interface IProps {
  title: string;
}

const NotificationManagementModal = forwardRef<BottomSheetModal, IProps>(
  (props, ref) => {
    const snapPoints = useMemo(() => ["35%", "35%"], []);
    const [isPushEnabled, setIsPushEnabled] = useState(false);
    const [isEmailEnabled, setIsEmailEnabled] = useState(false);

    const togglePushSwitch = () =>
      setIsPushEnabled((previousState) => !previousState);
    const toggleEmailSwitch = () =>
      setIsEmailEnabled((previousState) => !previousState);

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
                <Text size={4}>{props.title}</Text>
              </Flex>

              <View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingVertical: unit(24),
                    borderBottomWidth: unit(1),
                    borderBottomColor: "#F3F3F2",
                  }}
                >
                  <Text weight="medium">Push Notifications</Text>

                  <Switch
                    ios_backgroundColor="#767577"
                    onValueChange={togglePushSwitch}
                    value={isPushEnabled}
                    trackColor={{ false: "#767577", true: "#422618" }}
                  />
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingVertical: unit(12),
                  }}
                >
                  <Flex align="flex-start">
                    <Text weight="medium">Email Notifications</Text>
                    <Text
                      className="text-[#9C9C96] pt-[7px]"
                      size={0}
                      weight="medium"
                    >
                      You’ll receive email at alvin2k99@gmail.com
                    </Text>
                  </Flex>

                  <Switch
                    ios_backgroundColor="#767577"
                    onValueChange={toggleEmailSwitch}
                    value={isEmailEnabled}
                    trackColor={{ false: "#767577", true: "#422618" }}
                  />
                </View>
              </View>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default NotificationManagementModal;
