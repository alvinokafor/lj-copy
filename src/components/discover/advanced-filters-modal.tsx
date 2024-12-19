import React, {
  useCallback,
  useMemo,
  forwardRef,
  Dispatch,
  SetStateAction,
  Ref,
} from "react";
import { Pressable, StyleSheet, View } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { unit } from "@/constants";
import { Text, Flex, Button } from "../partials";
import { PlusIcon } from "@/icons";
import { ScrollView } from "react-native-gesture-handler";
import { useAdvancedFiltersStore } from "@/stores";
import { ResetIcon } from "./icons";
import { FilterKeys, FilterStateKeys } from "@/lib/types/Stores";
import { RotateInUpLeft } from "react-native-reanimated";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";

interface IAdvancedFiltersProps {
  refControllers: {
    [key in FilterStateKeys]?: React.RefObject<BottomSheetModalMethods>;
  };
}

const AdvancedFiltersModal = forwardRef<
  BottomSheetModalMethods,
  IAdvancedFiltersProps
>(({ refControllers }, ref) => {
  const snapPoints = useMemo(() => ["90%", "90%"], []);
  const advancedFilterState = useAdvancedFiltersStore((state) => state);

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
            Advanced Filters
          </Text>

          <ScrollView
            style={{
              paddingTop: unit(28),
              maxHeight: unit(550),
            }}
            className="mx-auto"
            showsVerticalScrollIndicator={true}
          >
            {Object.entries(advancedFilterState)
              .filter(
                ([_, value]) => typeof value === "object" && value !== null
              )
              .map(([key, filter]: [any, any]) => (
                <FilterOption
                  key={key}
                  title={filter.title}
                  value={filter.value}
                  direction={filter.renderDirection}
                  filterKey={key}
                  modalRefController={refControllers[key as FilterStateKeys]}
                />
              ))}
          </ScrollView>
        </View>

        <Button
          title="Apply Filters"
          titleStyle={{ fontFamily: "BRSonoma-Semibold" }}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
});

function FilterOption({
  title,
  direction,
  value,
  filterKey,
  modalRefController,
}: {
  title: string;
  direction: "row" | "column";
  value: number[] | string[];
  filterKey: FilterStateKeys;
  modalRefController?: React.RefObject<BottomSheetModalMethods>;
}) {
  const updateFilter = useAdvancedFiltersStore((state) => state.updateFilter);

  const handlePress = () => {
    modalRefController?.current?.present();
  };

  return (
    <View style={styles.filterContainer}>
      <Flex
        align="center"
        justify="space-between"
        className="w-full"
        direction="row"
      >
        {direction === "row" && (
          <Flex direction="row" align="center" gap={12}>
            <Text weight="medium" size={2}>
              {title}
            </Text>

            {value.length > 0 && (
              <View
                style={{ borderRadius: unit(22) }}
                className="bg-coffee-100"
              >
                <Text
                  style={styles.badgeContainer}
                  size={1}
                  weight="medium"
                  className="text-coffee-500 text-center"
                >
                  {title === "Age" || title === "Around You"
                    ? `${value[0]}-${value[1]}`
                    : value[0]}{" "}
                  {title === "Age"
                    ? "Years"
                    : title === "Around You"
                    ? "Miles"
                    : ""}
                </Text>
              </View>
            )}
          </Flex>
        )}

        {direction === "column" && (
          <Text weight="medium" size={2}>
            {title}
          </Text>
        )}

        {value.length > 0 ? (
          <Pressable onPress={() => updateFilter(FilterKeys[filterKey], [])}>
            <ResetIcon />
          </Pressable>
        ) : (
          <Pressable onPress={handlePress}>
            <PlusIcon />
          </Pressable>
        )}
      </Flex>

      {direction === "column" && value.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled
          contentContainerStyle={styles.scrollContainer}
        >
          {value.map((item) => (
            <View
              key={item}
              style={styles.badgeContainer}
              className="bg-coffee-100"
            >
              <Text
                size={1}
                weight="medium"
                className="text-coffee-500 text-center"
              >
                {item}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: "row",
    gap: unit(7),
    overflow: "scroll",
    paddingTop: unit(13),
  },
  badgeContainer: {
    paddingHorizontal: unit(10),
    paddingTop: unit(4),
    paddingBottom: unit(4),
    borderRadius: unit(22),
  },
  filterContainer: {
    marginBottom: unit(12),
    paddingHorizontal: unit(16),
    paddingTop: unit(18),
    paddingBottom: unit(18),
    borderRadius: unit(9),
    borderWidth: 1,
    borderColor: "#E6E6E5",
    // maxHeight: unit(100),
  },
});

export default AdvancedFiltersModal;
