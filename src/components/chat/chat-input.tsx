import React, { Dispatch, SetStateAction } from "react";
import { Flex } from "../partials";
import { TextInput } from "react-native-gesture-handler";
import { theme } from "@/constants";
import { SearchIcon } from "@/icons";
import {
  Pressable,
  TouchableWithoutFeedback,
  Animated,
  View,
} from "react-native";
import { MicrophoneIcon, CameraIcon, VerticalDivider, SendIcon } from "./icons";
import * as ImagePicker from "expo-image-picker";

export default function Chatinput({
  text,
  setText,
  setImage,
  handleSendMessage,
}: {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  setImage: Dispatch<SetStateAction<string>>;
  handleSendMessage: () => void;
}) {
  const [focused, setFocused] = React.useState(false);
  const inputRef = React.useRef<TextInput>(null);
  const [numOfLines, setNumOfLines] = React.useState(0);

  const setLines = (text: string) => {
    if (text) {
      //calculate how many lines
      const lines = text.split("\n").length;
      setNumOfLines(Math.min(5, lines));
    }
  };

  const handlePickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // allowsEditing: true,
        allowsMultipleSelection: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        if (result.assets.length === 1) {
          setImage(result.assets[0].uri);
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  React.useEffect(() => {
    setLines(text);
  }, []);

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
        align="flex-end"
        style={{
          paddingBottom: theme.space[12],
          marginBottom: theme.space[24],
          borderBottomWidth: 1,
          borderBottomColor: !focused ? "#B5B5B0" : "#F1DAAE",
        }}
        pb={8}
        pt={8}
      >
        <TextInput
          style={{
            fontFamily: "BRSonoma-Medium",
            fontSize: theme.fontSize[1],
            width: "80%",
          }}
          placeholder={"Be the first to say hello!"}
          placeholderTextColor={theme.colors.lightGrey}
          className="text-soft-black"
          onChangeText={(text) => setText(text)}
          value={text}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          ref={inputRef}
          onLayout={() => inputRef?.current?.focus()}
          multiline
          numberOfLines={numOfLines}
        />
        <View
          style={{
            paddingHorizontal:
              text.length === 0 ? theme.space[9] : theme.space[12],
            paddingTop: text.length === 0 ? theme.space[9] : theme.space[13],
            paddingBottom: text.length === 0 ? theme.space[9] : theme.space[13],
            borderRadius: theme.sizes[9],
          }}
          className="bg-coffee-500"
        >
          {text.length === 0 ? (
            <View
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                gap: theme.space[12],
              }}
            >
              <MicrophoneIcon />
              <VerticalDivider />

              <Pressable onPress={handlePickImage}>
                <CameraIcon />
              </Pressable>
            </View>
          ) : (
            <Pressable onPress={handleSendMessage}>
              <SendIcon />
            </Pressable>
          )}
        </View>
      </Flex>
    </TouchableWithoutFeedback>
  );
}
