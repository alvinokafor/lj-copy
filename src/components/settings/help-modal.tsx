import React, {
  useCallback,
  useMemo,
  forwardRef,
  Dispatch,
  SetStateAction,
} from "react";
import { View, Pressable } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { theme, unit } from "@/constants";
import { CameraIcon, PhotoIcon } from "@/icons";
import { Flex, Text } from "../partials";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { EmailIcon, HelpIcon } from "./icons";

const HelpModal = forwardRef<BottomSheetModal>((_props, ref) => {
  const snapPoints = useMemo(() => ["27%", "27%"], []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
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
      }}
      handleIndicatorStyle={{
        backgroundColor: "#CECECA",
        marginTop: unit(20),
        marginBottom: unit(12),
      }}
      enablePanDownToClose
    >
      <BottomSheetView>
        <ScrollView>
          <Pressable
            style={{
              marginBottom: theme.space[12],
              borderRadius: theme.sizes[12],
            }}
            className={
              "bg-grey active:bg-[#F1DAAE] transition-all duration-150 group"
            }
          >
            <Flex
              px={12}
              direction="row"
              gap={8}
              className="w-full"
              pt={15}
              pb={15}
            >
              <EmailIcon />
              <Text
                weight="medium"
                className="text-soft-black capitalize group-active:text-coffee-500"
                size={1}
              >
                Email Us
              </Text>
            </Flex>
          </Pressable>

          <Pressable
            style={{
              marginBottom: theme.space[12],
              borderRadius: theme.sizes[12],
            }}
            className={
              "bg-grey active:bg-[#F1DAAE] transition-all duration-150 group"
            }
          >
            <Flex
              px={12}
              direction="row"
              gap={8}
              className="w-full"
              pt={15}
              pb={15}
            >
              <HelpIcon />
              <Text
                weight="medium"
                className="text-soft-black capitalize group-active:text-coffee-500"
                size={1}
              >
                Help Center
              </Text>
            </Flex>
          </Pressable>
        </ScrollView>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default HelpModal;
