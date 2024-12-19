import React, {
  useCallback,
  useMemo,
  forwardRef,
  Dispatch,
  SetStateAction,
} from "react";
import { View } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { unit } from "@/constants";
import { Text, Flex, Button } from "../partials";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { MarkerIcon } from "./icons";
import { useAdvancedFiltersStore } from "@/stores";
import { FilterKeys } from "@/lib/types/Stores";

interface FilterModalProps {
  title: string;
  min: number;
  max: number;
  step: number;
  metric: string;
  values: number[];
  setFilterValues: Dispatch<SetStateAction<number[]>>;
  type: "age" | "distance";
}

const RangeFilterModal = forwardRef<BottomSheetModalMethods, FilterModalProps>(
  (props, ref) => {
    const snapPoints = useMemo(() => ["40%", "40%"], []);
    const [values, setValues] = React.useState([0, 500]);
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
              {props.title}
            </Text>

            <View style={{ paddingTop: unit(28) }} className="mx-auto">
              <MultiSlider
                enabledOne={true}
                enabledTwo={true}
                values={props.values}
                min={props.min}
                max={props.max}
                step={props.step}
                sliderLength={unit(300)}
                isMarkersSeparated={true}
                customMarkerLeft={(e) => {
                  return (
                    <View
                      style={{ borderWidth: 1.61 }}
                      className="w-[20px] h-[20px] rounded-full bg-white border-black/10"
                    ></View>
                  );
                }}
                customMarkerRight={(e) => {
                  return (
                    <View
                      style={{ borderWidth: 1.61 }}
                      className="w-[20px] h-[20px] rounded-full bg-white border-black/10"
                    ></View>
                  );
                }}
                selectedStyle={{ backgroundColor: "#000" }}
                trackStyle={{ height: unit(4) }}
                containerStyle={{ height: 20 }}
                snapped
                onValuesChange={(values) => {
                  props.setFilterValues(values);
                  props.type === "age"
                    ? updateFilter(FilterKeys.age, values)
                    : updateFilter(FilterKeys.distance, values);
                }}
              />

              <Flex direction="row" align="center" justify="space-between">
                <Flex>
                  <MarkerIcon />

                  <Text
                    className="text-center text-gray-400"
                    size={1}
                    weight="medium"
                  >
                    {props.min}
                  </Text>
                </Flex>
                <Flex>
                  <MarkerIcon />

                  <Text
                    className="text-center text-gray-400"
                    size={1}
                    weight="medium"
                  >
                    {props.max}
                  </Text>
                </Flex>
              </Flex>
            </View>

            <View
              className=" bg-[#F3F3F2] mx-auto"
              style={{
                paddingHorizontal: unit(19),
                paddingTop: unit(16),
                paddingBottom: unit(16),
                borderRadius: unit(10),
                maxWidth: unit(220),
                marginTop: unit(13),
              }}
            >
              <Text className="text-center" size={2} weight="medium">
                Between {props.values[0]}-{props.values[1]} {props.metric}
              </Text>
            </View>
          </View>

          <Button title="Apply" />
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default RangeFilterModal;
