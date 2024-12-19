import React, { useCallback, useMemo, forwardRef } from "react";
import { View, Pressable, Image } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { theme, unit } from "@/constants";
import { CoinStoreIcon, ModalCloseIcon, SmallCoinIcon } from "@/icons";
import Text from "../text";
import Flex from "../flex";

const CoinStoreModal = forwardRef<BottomSheetModalMethods>((_props, ref) => {
  const snapPoints = useMemo(() => ["64%", "64%"], []);

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
          <View style={{ paddingTop: theme.space[13] }} className="mx-auto">
            <View
              style={{ paddingBottom: theme.space[15] }}
              className="mx-auto"
            >
              <CoinStoreIcon />
            </View>
            <Text
              fontFamily="Merchant"
              weight="bold"
              size={5}
              className="text-center"
            >
              Coin Store
            </Text>
            <Text
              style={{ color: "#4F4F4A", paddingTop: theme.space[12] }}
              className="text-center mx-auto"
            >
              Purchase coins for things like superlikes & roses
            </Text>
          </View>

          <View
            style={{
              paddingTop: unit(18.5),
              paddingBottom: theme.space[25],
              borderRadius: theme.sizes[21],
              marginTop: theme.space[20],
              paddingHorizontal: theme.space[21],
            }}
            className="bg-[#FBF5E9]"
          >
            <Text style={{ color: "#4F4F4A" }} className="text-center mx-auto">
              Choose your preferable option
            </Text>

            <View
              style={{ paddingTop: theme.space[15], display: "flex", gap: 9 }}
            >
              <CoinSelectionCard coinAmount={5} coinPrice={10} />
              <CoinSelectionCard coinAmount={25} coinPrice={15} />
              <CoinSelectionCard coinAmount={30} coinPrice={30} />
            </View>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

function CoinSelectionCard({
  coinAmount,
  coinPrice,
}: {
  coinAmount: number;
  coinPrice: number;
}) {
  return (
    <View
      style={{
        borderRadius: theme.sizes[12],
        paddingHorizontal: theme.space[13],
        paddingTop: theme.space[13],
        paddingBottom: theme.space[13],
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
      className="bg-white"
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 8,
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <SmallCoinIcon />
        <Text
          fontFamily="Merchant"
          weight="bold"
          size={3}
          className="text-center"
        >
          {coinAmount}
        </Text>
      </View>

      <View
        style={{
          paddingTop: theme.space[4],
          paddingBottom: theme.space[4],
          paddingHorizontal: theme.space[12],
          borderRadius: theme.sizes[25],
        }}
        className=" bg-[#F3F3F2]"
      >
        <Text weight="medium" className="text-[#1E1E1C]">
          ${coinPrice}
        </Text>
      </View>
    </View>
  );
}

export default CoinStoreModal;
