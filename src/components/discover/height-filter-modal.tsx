import React, { useCallback, useMemo, forwardRef } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { unit } from "@/constants";
import { Text, Button } from "../partials";
import { useAdvancedFiltersStore } from "@/stores";
import { FilterKeys } from "@/lib/types/Stores";
import { RulerPicker } from "react-native-ruler-picker";

const HeightFilterModal = forwardRef<BottomSheetModalMethods>((_props, ref) => {
  const snapPoints = useMemo(() => ["52%", "52%"], []);
  const [metric, setMetric] = React.useState("ft");
  const updateFilter = useAdvancedFiltersStore((state) => state.updateFilter);

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
        paddingHorizontal: unit(29),
        zIndex: 30,
      }}
      handleIndicatorStyle={{
        backgroundColor: "#CECECA",
        marginTop: unit(25),
        marginBottom: unit(17),
      }}
      enablePanDownToClose
    >
      <BottomSheetView>
        <View style={{ paddingBottom: unit(28) }}>
          <Text fontFamily="Merchant" size={4} className="text-center">
            Height
          </Text>

          <View>
            <View style={styles.heightTabsContainer}>
              <Pressable
                className={metric === "ft" ? "bg-[#F1DAAE]" : ""}
                style={styles.tabButton}
                onPress={() => setMetric("ft")}
              >
                <Text className="text-[#353531] text-center" weight="semibold">
                  Feet
                </Text>
              </Pressable>

              <Pressable
                className={metric === "cm" ? "bg-[#F1DAAE]" : ""}
                style={styles.tabButton}
                onPress={() => setMetric("cm")}
              >
                <Text className="text-[#353531] text-center" weight="semibold">
                  Centimeter
                </Text>
              </Pressable>
            </View>

            <View className="w-max mx-auto" style={{ marginTop: unit(70) }}>
              <RulerPicker
                min={1}
                max={metric === "ft" ? 9 : 500}
                step={metric === "ft" ? 0.01 : 1}
                fractionDigits={2}
                initialValue={0}
                onValueChangeEnd={(value) =>
                  updateFilter(FilterKeys.height, [`${value}${metric}`])
                }
                unit={metric}
                width={318}
                unitTextStyle={{
                  fontSize: 14,
                  //@ts-ignore
                  fontFamily: "BRSonoma-Medium",
                  color: "#696963",
                }}
                valueTextStyle={{
                  fontSize: 24,
                  //@ts-ignore
                  fontFamily: "BRSonoma-Medium",
                  color: "#696963",
                }}
                longStepColor="#696963"
                indicatorColor="#9DBA78"
                height={unit(80)}
              />
            </View>
          </View>
        </View>

        <Button
          title="Apply"
          titleStyle={{ fontFamily: "BRSonoma-Semibold" }}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  heightTabsContainer: {
    borderWidth: 1,
    borderColor: "#E6E6E5",
    paddingHorizontal: unit(9),
    paddingTop: unit(7.5),
    paddingBottom: unit(7.5),
    borderRadius: unit(14),
    display: "flex",
    flexDirection: "row",
    marginTop: unit(28),
  },

  tabButton: {
    paddingTop: unit(9),
    paddingBottom: unit(9),
    borderRadius: unit(9),
    width: "50%",
  },
});

export default HeightFilterModal;
