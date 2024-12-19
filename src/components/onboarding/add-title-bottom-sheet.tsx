import React, {
  useCallback,
  useMemo,
  forwardRef,
  useState,
  useEffect,
} from "react";
import { View, Pressable, TextInput, Image, Platform } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { theme, unit } from "@/constants";
import {
  LargeRemovePhotoIcon,
  ModalCloseIcon,
  PlusIcon,
  StylizedCircleCheckIcon,
} from "@/icons";
import { Flex, Text, Button } from "../partials";
import { useOnboardingStore } from "@/stores";
import {
  useOnboardingMutation,
  OnboardingAdapter,
} from "@/adapters/OnboardingAdapter";
import { showToast } from "@/utils";

interface IAddImageTitleProps {
  imagePosition: number;
  image: string;
}

const AddTitleBottomSheet = forwardRef<BottomSheetMethods, IAddImageTitleProps>(
  ({ imagePosition, image }, ref) => {
    const snapPoints = useMemo(() => ["75%", "75%"], []);
    const [imageTitle, setImageTitle] = useState("");
    const [imageTitleFocused, setImageTitleFocused] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const images = useOnboardingStore((state) => state.images);
    const updateProfileImages = useOnboardingStore(
      (state) => state.updateProfileImages
    );

    const updateImageTitle = (title: string) => {
      updateProfileImages({
        imagePosition,
        imageData: {
          title,
          uri: images[imagePosition].uri,
        },
        action: "add",
      });
    };

    useEffect(() => {
      const getWordCount = () => {
        const textLenght = images[imagePosition].title.length;
        if (textLenght >= 100) {
          setWordCount(100);
        } else {
          setWordCount(100 - textLenght);
        }
      };
      getWordCount();
    }, [images[imagePosition].title]);

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          appearsOnIndex={0}
          disappearsOnIndex={-1}
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
        }}
        handleIndicatorStyle={{ backgroundColor: "#fff" }}
        enablePanDownToClose
      >
        <BottomSheetView>
          <View style={{ paddingBottom: theme.space[24] }}>
            {/* @ts-ignore */}
            <Pressable onPress={() => ref?.current?.close()}>
              <ModalCloseIcon />
            </Pressable>

            <Flex align="flex-start" gap={10}>
              <TextInput
                style={[
                  {
                    borderBottomWidth: 1,
                    borderBottomColor: "#B5B5B0",
                    paddingBottom: theme.space[8],
                    fontFamily: "Merchant-Regular",
                    paddingTop: theme.space[20],
                    fontSize: 18,
                  },
                  imageTitleFocused && theme.actionStateStyles.inputFocused,
                ]}
                onChangeText={(title) => updateImageTitle(title)}
                value={images[imagePosition].title}
                placeholder={!images[imagePosition].title ? "Add Title" : ""}
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
          </View>

          <PhotoContainer image={image} imagePosition={imagePosition} />
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

function PhotoContainer({
  imagePosition,
  image,
}: {
  imagePosition: number;
  image: string;
}) {
  const formData = new FormData();
  const {
    images,
    updateOnboardingData,
    updateProfileImages,
    displayImage,
    setUploadedImages,
  } = useOnboardingStore();

  const { mutateAsync, isPending } = useOnboardingMutation({
    mutationCallback: OnboardingAdapter.uploadMedia,
  });

  const handleMediaUpload = async () => {
    try {
      //@ts-ignore
      formData.append("file", {
        name: "Image",
        type: "image",
        uri: Platform.OS === "ios" ? image.replace("file://", "") : image,
      });
      const res = await mutateAsync(formData);
      setUploadedImages({
        index: imagePosition,
        url: res.data.data[0].publicUrl,
      });
      showToast({
        type: "success",
        title: "Success",
        body: "Image uploaded successfully",
      });
    } catch (e) {
      showToast({
        type: "error",
        title: "Error",
        body: "Something went wrong",
      });
      console.log(e);
    }
  };

  return (
    <View>
      <Pressable
        style={{
          minHeight: unit(398),
          width: "100%",
          borderRadius: theme.sizes[9],
          position: "relative",
          marginBottom: theme.space[20],
        }}
        className={`${
          !images[imagePosition].uri && "bg-grey"
        }  active:bg-grey/70`}
      >
        <>
          <View className="flex absolute justify-center w-full h-full items-center ">
            <PlusIcon />
          </View>
          <View className="absolute w-full h-full">
            {images[imagePosition].uri && (
              <Image
                source={{ uri: image }}
                style={{ borderRadius: theme.sizes[9] }}
                className="w-full h-full"
              />
            )}

            {images[imagePosition].uri && (
              <View
                style={{ borderRadius: theme.sizes[9] }}
                className="absolute w-full h-full bg-soft-black/40 active:bg-soft-black/60"
              ></View>
            )}
          </View>

          {images[imagePosition].uri && (
            <View
              style={{
                paddingTop: theme.space[15],
                paddingBottom: theme.space[20],
                paddingRight: theme.space[13],
                paddingLeft: theme.space[10],
              }}
              className="flex absolute bottom-0 top-0 justify-between items-end w-full"
            >
              <Pressable
                onPress={() =>
                  updateProfileImages({
                    imagePosition,
                    action: "remove",
                  })
                }
              >
                <LargeRemovePhotoIcon />
              </Pressable>
              <View
                style={{
                  gap: theme.space[11],
                }}
                className="flex-row items-center justify-between w-full"
              >
                {images[imagePosition].uri !== displayImage ? (
                  <Pressable
                    style={{
                      paddingTop: theme.sizes[7],
                      paddingBottom: theme.space[7],
                      paddingHorizontal: theme.space[21],
                      borderRadius: theme.sizes[25],
                    }}
                    className="bg-white w-max self-baseline mx-auto"
                    onPress={() =>
                      updateOnboardingData(
                        "displayImage",
                        images[imagePosition].uri
                      )
                    }
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
                    onPress={() => updateOnboardingData("displayImage", "")}
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
              </View>
            </View>
          )}
        </>
      </Pressable>
      <Button
        isLoading={isPending}
        title="Upload"
        onPress={handleMediaUpload}
      />
    </View>
  );
}

export default AddTitleBottomSheet;
