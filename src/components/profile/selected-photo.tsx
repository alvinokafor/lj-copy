import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { View, Pressable, TextInput, Image } from "react-native";
import { theme } from "@/constants";
import {
  LargeRemovePhotoIcon,
  PlusIcon,
  StylizedCircleCheckIcon,
} from "@/icons";
import { Flex, Text } from "../partials";
import { unit } from "@/constants";
import { useOnboardingStore, useProfileStore } from "@/stores";

export default function SelectedPhoto({
  image,
  imageTitle,
  imageIndex,
}: {
  image: string;
  imageTitle: string;
  imageIndex: number;
}) {
  const [imageTitleFocused, setImageTitleFocused] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const { images, updatePhotoTitle, removePhoto } = useProfileStore();

  useEffect(() => {
    const getWordCount = () => {
      const textLenght = images[imageIndex]?.title.trim().length;
      if (textLenght >= 100) {
        setWordCount(100);
      } else {
        setWordCount(100 - textLenght);
      }
    };
    getWordCount();
  }, [images[imageIndex]?.title]);

  return (
    <View style={{ width: unit(329) }}>
      <Flex align="flex-start" gap={10} pb={21}>
        <TextInput
          style={[
            {
              borderBottomWidth: 1,
              borderBottomColor: "#B5B5B0",
              paddingBottom: theme.space[8],
              fontFamily: "Merchant-Regular",
              fontSize: 18,
            },
            imageTitleFocused && theme.actionStateStyles.inputFocused,
          ]}
          onChangeText={(title) => updatePhotoTitle({ imageIndex, title })}
          value={images[imageIndex]?.title}
          placeholder={!imageTitle ? "Add Title" : ""}
          className="text-black w-full"
          onFocus={() => setImageTitleFocused(true)}
          onBlur={() => setImageTitleFocused(false)}
        />
        <Text className="text-light-grey">
          {!imageTitle
            ? "Maximum of 100 Characters"
            : `${wordCount} characters left`}
        </Text>
      </Flex>
      <Pressable
        style={{
          minHeight: unit(398),
          width: "100%",
          borderRadius: theme.sizes[9],
          position: "relative",
          marginBottom: theme.space[20],
        }}
        className={`${!image && "bg-grey"}  active:bg-grey/70`}
        // onPress={() => {
        // //   handleOpenSelector();
        // //   setSelectedIndex(imagePosition);
        // }}
      >
        <>
          <View className="flex absolute justify-center w-full h-full items-center ">
            <PlusIcon />
          </View>
          <View className="absolute w-full h-full">
            {image && (
              <Image
                source={{ uri: image }}
                style={{ borderRadius: theme.sizes[9] }}
                className="w-full h-full"
              />
            )}

            {image && (
              <View
                style={{ borderRadius: theme.sizes[9] }}
                className="absolute w-full h-full bg-soft-black/40 active:bg-soft-black/60"
              ></View>
            )}
          </View>

          {image && (
            <View
              style={{
                paddingTop: theme.space[15],
                paddingBottom: theme.space[20],
                paddingRight: theme.space[13],
                paddingLeft: theme.space[10],
              }}
              className="flex absolute bottom-0 top-0 justify-between items-end w-full"
            >
              <Pressable onPress={() => removePhoto({ imageIndex })}>
                <LargeRemovePhotoIcon />
              </Pressable>

              {/* <View
                style={{
                  gap: theme.space[11],
                }}
                className="flex-row items-center justify-between w-full"
              >
                {image !== displayImage ? (
                  <Pressable
                    style={{
                      paddingTop: theme.sizes[7],
                      paddingBottom: theme.space[7],
                      paddingHorizontal: theme.space[21],
                      borderRadius: theme.sizes[25],
                    }}
                    className="bg-white w-max self-baseline mx-auto"
                   
                  >
                    <Text
                      weight="medium"
                      className="text-center text-soft-black"
                      size={1}
                    >
                      Set as Display Photo
                    </Text>
                  </Pressable>
                ) : (
                  <Pressable
                    style={{
                      paddingTop: theme.sizes[7],
                      paddingBottom: theme.space[7],
                      paddingHorizontal: theme.space[21],
                      borderRadius: theme.sizes[25],
                      gap: theme.space[7],
                    }}
                    className="bg-white w-max self-baseline flex items-center mx-auto flex-row"
                    onPress={() => updateOnboardingData("displayImage", image)}
                  >
                    <Text
                      weight="medium"
                      className="text-center text-coffee-500"
                      size={1}
                    >
                      Display Photo
                    </Text>

                    <StylizedCircleCheckIcon />
                  </Pressable>
                )}
              </View> */}
            </View>
          )}
        </>
      </Pressable>
    </View>
  );
}
