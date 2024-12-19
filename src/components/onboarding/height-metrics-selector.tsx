import React, {
  useCallback,
  useMemo,
  forwardRef,
  Dispatch,
  SetStateAction,
} from "react";
import { View, Pressable, TouchableWithoutFeedback } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { theme } from "@/constants";
import { CheckedIcon, ModalCloseIcon, UncheckedIcon } from "@/icons";
import { Flex, Text } from "../partials";
import { ScrollView, FlatList } from "react-native-gesture-handler";

interface IBottomSheetSelector {
  itemList: string[];
  setValue: Dispatch<SetStateAction<string>>;
  value: string | string[];
  title: string;
}

const HeightMetricsSelector = forwardRef<
  BottomSheetMethods,
  IBottomSheetSelector
>(({ itemList, setValue, value, title }, ref) => {
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

          <Text
            style={{ paddingTop: theme.space[16] }}
            size={4}
            fontFamily="Merchant"
          >
            {title}
          </Text>
        </View>

        <ScrollView>
          <FlatList
            data={itemList}
            contentContainerStyle={{
              paddingTop: theme.space[18],
              paddingBottom: theme.space[20],
              gap: theme.space[8],
            }}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback
                onPress={() => setValue(item)}
                style={{ marginBottom: theme.space[12] }}
              >
                <View
                  style={{ borderRadius: theme.sizes[12] }}
                  className={`${value === item ? "bg-coffee-100" : "bg-grey"}`}
                >
                  <Flex
                    px={12}
                    direction="row"
                    justify="space-between"
                    className="w-full"
                    pt={15}
                    pb={15}
                  >
                    <Text
                      weight="medium"
                      className="text-soft-black capitalize"
                      size={1}
                    >
                      {item}
                    </Text>
                    <Pressable onPress={() => setValue(item)}>
                      {value === item ? <CheckedIcon /> : <UncheckedIcon />}
                    </Pressable>
                  </Flex>
                </View>
              </TouchableWithoutFeedback>
            )}
            keyExtractor={(item) => item}
          />
        </ScrollView>
      </BottomSheetView>
    </BottomSheet>
  );
});

export default HeightMetricsSelector;
