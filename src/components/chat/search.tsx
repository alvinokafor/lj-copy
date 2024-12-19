import React, { Dispatch, SetStateAction } from "react";
import { Flex } from "../partials";
import { TextInput } from "react-native-gesture-handler";
import { theme } from "@/constants";
import { ModalCloseIcon } from "@/icons";
import { Pressable, TouchableWithoutFeedback } from "react-native";

export default function Search({
  search,
  setSearch,
  setOpenSearchBar,
}: {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  setOpenSearchBar: Dispatch<SetStateAction<boolean>>;
}) {
  const [focused, setFocused] = React.useState(false);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setFocused(true);
      }}
    >
      <Flex
        direction="row"
        className="w-full"
        justify="space-between"
        style={{
          paddingBottom: theme.space[12],
          paddingTop: theme.space[12],
          borderBottomWidth: 1,
          borderBottomColor: !focused ? "#B5B5B0" : "#F1DAAE",
        }}
      >
        <TextInput
          style={{
            fontFamily: "BRSonoma-Medium",
            fontSize: theme.fontSize[1],
            width: "80%",
          }}
          placeholder={"Search"}
          placeholderTextColor={theme.colors.softBlack}
          className="text-soft-black"
          onChangeText={(text) => setSearch(text)}
          value={search}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <Pressable onPress={() => setOpenSearchBar(false)}>
          <ModalCloseIcon />
        </Pressable>
      </Flex>
    </TouchableWithoutFeedback>
  );
}
