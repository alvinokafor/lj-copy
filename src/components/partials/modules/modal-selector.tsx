import React, {
  useCallback,
  useMemo,
  forwardRef,
  Dispatch,
  useState,
  useEffect,
  SetStateAction,
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
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { theme } from "@/constants";
import {
  CheckedIcon,
  ModalCloseIcon,
  SearchIcon,
  UncheckedIcon,
} from "@/icons";
import { Flex, Text } from "..";
import { ScrollView, FlatList } from "react-native-gesture-handler";

interface IBottomSheetSelector {
  itemList: string[];
  setValue: Dispatch<SetStateAction<string>>;
  value: string | string[];
  title: string;
  placeHolder: string;
}

const ModalSelector = forwardRef<BottomSheetModal, IBottomSheetSelector>(
  ({ itemList, setValue, value, title, placeHolder }, ref) => {
    const snapPoints = useMemo(() => ["80%", "80%"], []);
    const [search, setSearch] = useState("");
    const [filteredItems, setFilteredItems] = useState(itemList);

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

          <ScrollView>
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
                  onPress={() => setValue(item)}
                  style={{ marginBottom: theme.space[12] }}
                >
                  <View
                    style={{ borderRadius: theme.sizes[12] }}
                    className={`${
                      value === item ? "bg-coffee-100" : "bg-grey"
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
      </BottomSheetModal>
    );
  }
);

export default ModalSelector;
