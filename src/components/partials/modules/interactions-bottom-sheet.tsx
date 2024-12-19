import React, { useCallback, useMemo, forwardRef } from "react";
import { View, Pressable } from "react-native";
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
import { Button, Flex, Text } from "..";
import { CoinIcon } from "@/icons";

interface IProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionText: string;
  buttonText: string;
  handleOnPress: () => void;
}

const InteractionsBottomSheet = forwardRef<BottomSheetModalMethods, IProps>(
  (props, ref) => {
    const snapPoints = useMemo(() => ["60%", "60%"], []);

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
          paddingTop: theme.space[23],
        }}
        handleIndicatorStyle={{ backgroundColor: "#fff" }}
        enablePanDownToClose
      >
        <View style={{ paddingBottom: theme.space[28] }} className="mx-auto">
          {props.icon}
        </View>

        <View className="space-y-6">
          <Text
            fontFamily="Merchant"
            weight="bold"
            size={5}
            className="text-center"
          >
            {props.title}
          </Text>
          <Text
            style={{ color: "#4F4F4A" }}
            className="text-center w-[80%] mx-auto"
          >
            {props.description}
          </Text>
          <Text
            style={{ color: "#1E1E1C" }}
            className="text-center text-soft-black"
          >
            {props.actionText}
          </Text>
        </View>

        <Flex
          px={16}
          pt={14}
          pb={14}
          gap={8}
          align="center"
          direction="row"
          className="bg-[#F3F3F2] mx-auto"
          style={{
            borderRadius: theme.sizes[10],
            marginTop: unit(33),
            alignContent: "center",
            maxWidth: unit(185),
          }}
        >
          <CoinIcon />

          <Text>Coin Balance:</Text>

          <Text size={20} fontFamily="Merchant" className="self-center">
            0
          </Text>
        </Flex>
        <BottomSheetView>
          <View style={{ paddingBottom: theme.space[13] }}>
            <Button
              title={props.buttonText}
              weight="semibold"
              style={{ marginTop: unit(28) }}
              onPress={props.handleOnPress}
            />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default InteractionsBottomSheet;
