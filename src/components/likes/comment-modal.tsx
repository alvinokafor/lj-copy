import React, { useCallback, useMemo, forwardRef, SetStateAction } from "react";
import { View, Pressable } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { theme, unit } from "@/constants";
import { ModalCloseIcon, SmallPadlockIcon } from "@/icons";
import { Button, Flex, Text } from "../partials";

interface IProps {
  message: string;
  commentIcon: React.ReactNode;
  setMatched: React.Dispatch<SetStateAction<boolean>>;
  setIsNotInterested: React.Dispatch<SetStateAction<boolean>>;
}

const CommentModal = forwardRef<BottomSheetModalMethods, IProps>(
  (props, ref) => {
    const snapPoints = useMemo(() => ["35%", "35%"], []);

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
          <View style={{ paddingBottom: theme.space[13] }}>
            {/* @ts-ignore */}
            <Pressable onPress={() => ref?.current?.dismiss()}>
              <ModalCloseIcon />
            </Pressable>

            <View
              style={{ paddingTop: theme.space[20], paddingBottom: unit(33) }}
            >
              <Flex align="center" direction="row" gap={8} pb={20}>
                <Text size={4} className="text-left" fontFamily="Merchant">
                  Comment
                </Text>

                <View>{props.commentIcon}</View>
              </Flex>

              <Text size={2}>{props.message}</Text>
            </View>

            <View
              className="flex flex-row items-center justify-between w-full"
              style={{ paddingTop: theme.space[11] }}
            >
              <Button
                backgroundColor="#1A1A19"
                title="Match"
                iconRight={<SmallPadlockIcon />}
                titleStyle={{ fontSize: theme.fontSize[2] }}
                weight="medium"
                style={{ width: "50%" }}
                onPress={() => {
                  props.setMatched(true);
                  //@ts-ignore
                  ref?.current?.dismiss();
                }}
              />

              <Pressable
                style={{ width: "50%" }}
                onPress={() => {
                  props.setIsNotInterested(true);
                  //@ts-ignore
                  ref?.current?.dismiss();
                }}
              >
                <Text className="text-center">Not Interested</Text>
              </Pressable>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default CommentModal;
