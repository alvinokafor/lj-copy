import React, {
  useCallback,
  useMemo,
  forwardRef,
  useState,
  useEffect,
} from "react";
import {
  View,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { theme, unit } from "@/constants";
import {
  CheckedIcon,
  ModalCloseIcon,
  SearchIcon,
  UncheckedIcon,
} from "@/icons";
import { Button, Flex, Text } from "@/components/partials";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import { useAdvancedFiltersStore } from "@/stores";
import { FilterStateKeys } from "@/lib/types/Stores";

interface IModalSelector {
  itemList: string[];
  title: string;
  subTitle?: string;
  placeHolder?: string;
  filterKey: FilterStateKeys;
  hasSearch: boolean;
  isMultiSelect: boolean;
}

const FilterMultiselectModal = forwardRef<
  BottomSheetModalMethods,
  IModalSelector
>(
  (
    {
      itemList,
      title,
      subTitle,
      placeHolder,
      filterKey,
      hasSearch,
      isMultiSelect,
    },
    ref
  ) => {
    const snapPoints = useMemo(() => getSnapPoint(), []);
    const [search, setSearch] = useState("");
    const [filteredItems, setFilteredItems] = useState(itemList);
    const updateFilter = useAdvancedFiltersStore((state) => state.updateFilter);
    const state = useAdvancedFiltersStore((state) => state);

    // debounce search
    useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
        const filtered = itemList.filter(
          (country) =>
            country.toLowerCase().includes(search.toLowerCase()) ||
            country.toLowerCase().startsWith(search.toLowerCase())
        );
        setFilteredItems(filtered);
      }, 100);

      return () => clearTimeout(delayDebounceFn);
    }, [search]);

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

    const handleSelectItems = (option: string) => {
      const currentFilterValue = state[filterKey].value;

      if (isMultiSelect) {
        if (currentFilterValue.includes(option)) {
          // Filter out the selected option if it already exists
          updateFilter(
            filterKey,
            currentFilterValue.filter((item) => item !== option)
          );
        } else {
          // Add the option if it doesn't exist
          updateFilter(filterKey, [...currentFilterValue, option]);
        }
      } else {
        updateFilter(filterKey, [option]);
      }
    };

    function getSnapPoint() {
      switch (filterKey) {
        case "astrologicalSign":
          return ["90%", "90%"];
        case "educationLevel":
          return ["65%", "65%"];
        case "religion":
          return ["70%", "70%"];
        case "children":
          return ["70%", "70%"];
        default:
          return ["90%", "90%"];
      }
    }

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

            <Text
              style={{ paddingTop: theme.space[16] }}
              size={4}
              fontFamily="Merchant"
            >
              {title}
            </Text>

            <Text
              style={{ paddingTop: theme.space[8] }}
              className="text-[#696963]"
            >
              {subTitle}
            </Text>
          </View>

          {hasSearch && (
            <Flex
              direction="row"
              className="w-full"
              justify="space-between"
              style={{
                paddingBottom: theme.space[12],
                borderBottomWidth: 1,
                borderBottomColor: "#B5B5B0",
              }}
              pb={15}
              pt={15}
            >
              <TextInput
                style={{
                  fontFamily: "BRSonoma-Medium",
                  fontSize: theme.fontSize[1],
                  width: "80%",
                }}
                placeholder={placeHolder}
                className="text-soft-black"
                onChangeText={(text) => setSearch(text)}
                value={search}
              />
              <SearchIcon />
            </Flex>
          )}

          <ScrollView
            style={{
              maxHeight: unit(500),
            }}
          >
            <FlatList
              data={filteredItems}
              contentContainerStyle={{
                paddingTop: theme.space[18],
                paddingBottom: theme.space[20],
                gap: theme.space[8],
              }}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback
                  onPress={() => handleSelectItems(item)}
                  style={{ marginBottom: theme.space[12] }}
                >
                  <View
                    style={{ borderRadius: theme.sizes[12] }}
                    className={`${
                      state[filterKey].value?.includes(item) ||
                      state[filterKey].value[0] === item
                        ? "bg-coffee-100"
                        : "bg-grey"
                    }`}
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
                      <Pressable onPress={() => handleSelectItems(item)}>
                        {state[filterKey].value?.includes(item) ||
                        state[filterKey].value[0] === item ? (
                          <CheckedIcon />
                        ) : (
                          <UncheckedIcon />
                        )}
                      </Pressable>
                    </Flex>
                  </View>
                </TouchableWithoutFeedback>
              )}
              keyExtractor={(item) => item}
            />
          </ScrollView>
          <Button
            title="Apply"
            titleStyle={{ fontFamily: "BRSonoma-Semibold" }}
            style={{ marginTop: unit(16) }}
          />
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default FilterMultiselectModal;
