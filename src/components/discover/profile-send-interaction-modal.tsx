import React, { useCallback, useMemo, forwardRef } from "react";
import { View, Pressable, TouchableWithoutFeedback } from "react-native";
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
import { ModalCloseIcon } from "@/icons";
import { Button, Flex, Text } from "../partials";
import { SmallRoseIcon, SmallSuperLikeIcon } from "./icons";

const ProfileSendInteractionModal = forwardRef<BottomSheetModalMethods>(
  (_props, ref) => {
    const snapPoints = useMemo(() => ["38%", "38%"], []);

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
                  Send Superlike or Rose
                </Text>
              </Flex>

              <Text
                className="text-[#353531]"
                style={{ paddingTop: theme.space[12] }}
              >
                Get her attention by sending her a Superlike or Rose
              </Text>
            </View>

            <View
              style={{
                paddingTop: theme.space[32],
                display: "flex",
                gap: unit(13),
              }}
            >
              <Button
                title="Superlike"
                titleStyle={{
                  fontFamily: "BRSonoma-Medium",
                  fontSize: unit(14),
                  color: "#422618",
                }}
                backgroundColor="#F3F3F2"
                iconLeft={<SmallSuperLikeIcon />}
              />
              <Button
                title="Roses"
                titleStyle={{
                  fontFamily: "BRSonoma-Medium",
                  fontSize: unit(14),
                  color: "#422618",
                }}
                backgroundColor="#F3F3F2"
                iconLeft={<SmallRoseIcon />}
              />
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default ProfileSendInteractionModal;
