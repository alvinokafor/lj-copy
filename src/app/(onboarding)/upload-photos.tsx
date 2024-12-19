import { theme, unit } from "@/constants";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, View, Image } from "react-native";
import { Text, ScreenContainer, Flex } from "@/components/partials";
import {
  AddTitleBottomSheet,
  OnboardingHeader,
  OnboardingNextController,
  SelectedPhotosBottomSheet,
  UploadPhotosBottomSheet,
} from "@/components/onboarding";
import BottomSheetMethods from "@gorhom/bottom-sheet";
import {
  PlusIcon,
  AddImageTitleIcon,
  RemovePhotoIcon,
  StylizedCircleCheckIcon,
} from "@/icons";
import { useOnboardingStore } from "@/stores";
import { useRouter } from "expo-router";
import {
  OnboardingAdapter,
  useOnboardingMutation,
} from "@/adapters/OnboardingAdapter";

export default function UploadPhotos() {
  const router = useRouter();
  const [selectedImagePosition, setSelectedImagePosition] = useState(0);
  const {
    images,
    updateOnboardingData,
    updateProfileImages,
    displayImage,
    uploadedImages,
  } = useOnboardingStore();
  const { mutateAsync, isPending } = useOnboardingMutation({
    mutationCallback: OnboardingAdapter.saveUserMedia,
  });

  const handleSaveUserMedia = async () => {
    try {
      await mutateAsync({
        data: [
          {
            title: images[0].title,
            url: uploadedImages[0],
            caption: "",
            index: 0,
            isDisplayImage: false,
          },
          {
            title: images[1].title,
            url: uploadedImages[1],
            caption: "",
            index: 1,
            isDisplayImage: false,
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const uploadPhotoRef = useRef<BottomSheetMethods>(null);
  const addTitleRef = useRef<BottomSheetMethods>(null);
  const selectedPhotosRef = useRef<BottomSheetMethods>(null);

  const handleOpenSelector = () => uploadPhotoRef.current?.expand();
  const handleOpenAddTitle = () => addTitleRef.current?.expand();

  const handleRemovePhoto = (imagePosition: number) => {
    updateProfileImages({
      imagePosition,
      action: "remove",
    });

    if (displayImage === images[imagePosition].uri) {
      updateOnboardingData("displayImage", "");
    }
  };

  // New function to check and open selected photos sheet
  const checkAndOpenSelectedPhotos = useCallback(() => {
    const validImageCount = images.filter((img) => img.uri !== "").length;
    if (validImageCount >= 2) {
      selectedPhotosRef.current?.expand();
    }
  }, [images]);

  // Effect to run checkAndOpenSelectedPhotos when images change
  useEffect(() => {
    checkAndOpenSelectedPhotos();
  }, [images, checkAndOpenSelectedPhotos]);

  return (
    <View
      style={{
        flex: 1,
      }}
      className="flex-1"
    >
      <OnboardingHeader
        heading="Upload your photos"
        subHeading="Upload a minimum of 2 pictures and videos"
        step={13}
      />
      <ScreenContainer>
        <View
          style={{ display: "flex", justifyContent: "space-between", flex: 1 }}
        >
          <Flex
            direction="row"
            gap={5}
            align="flex-start"
            className="w-full"
            justify="space-between"
          >
            <Flex align="flex-start" gap={16} className="w-1/2">
              {/* First Image */}
              <PhotoContainer
                height={212}
                image={images[0].uri}
                handleOpenSelector={handleOpenSelector}
                handleOpenAddTitle={handleOpenAddTitle}
                setSelectedImagePosition={setSelectedImagePosition}
                imagePosition={0}
                handleRemovePhoto={handleRemovePhoto}
              />
              {/* Third Image */}
              <PhotoContainer
                height={198}
                image={images[2].uri}
                handleOpenSelector={handleOpenSelector}
                handleOpenAddTitle={handleOpenAddTitle}
                setSelectedImagePosition={setSelectedImagePosition}
                imagePosition={2}
                handleRemovePhoto={handleRemovePhoto}
              />
            </Flex>

            <Flex align="flex-start" gap={16} className="w-1/2">
              {/* Second Image */}
              <PhotoContainer
                height={198}
                image={images[1].uri}
                handleOpenSelector={handleOpenSelector}
                handleOpenAddTitle={handleOpenAddTitle}
                setSelectedImagePosition={setSelectedImagePosition}
                imagePosition={1}
                handleRemovePhoto={handleRemovePhoto}
              />
              {/* Fourth Image */}
              <PhotoContainer
                height={212}
                image={images[3].uri}
                handleOpenSelector={handleOpenSelector}
                handleOpenAddTitle={handleOpenAddTitle}
                setSelectedImagePosition={setSelectedImagePosition}
                imagePosition={3}
                handleRemovePhoto={handleRemovePhoto}
              />
            </Flex>
          </Flex>
        </View>
      </ScreenContainer>
      <OnboardingNextController
        route="/(onboarding)/welcome-to-love-jollof"
        canSkip={false}
        isNextButtonDisabled={false}
        onPressHandler={() => {
          handleSaveUserMedia();
          router.push("/(onboarding)/welcome-to-love-jollof");
        }}
        isLoading={isPending}
      />

      <UploadPhotosBottomSheet
        ref={uploadPhotoRef}
        selectedIndex={selectedImagePosition}
      />

      <AddTitleBottomSheet
        image={images[selectedImagePosition].uri}
        ref={addTitleRef}
        imagePosition={selectedImagePosition}
      />

      <SelectedPhotosBottomSheet
        shouldOpen={false}
        images={images}
        imagePosition={selectedImagePosition}
        ref={selectedPhotosRef}
      />
    </View>
  );
}

function PhotoContainer({
  image,
  handleOpenSelector,
  handleOpenAddTitle,
  setSelectedImagePosition,
  height,
  width = 173,
  imagePosition,
  handleRemovePhoto,
}: {
  image: string;
  handleOpenSelector: () => void;
  handleRemovePhoto: (index: number) => void;
  handleOpenAddTitle: () => void;
  setSelectedImagePosition: React.Dispatch<React.SetStateAction<number>>;
  height: number;
  width?: number;
  imagePosition: number;
}) {
  const { updateOnboardingData, displayImage, images } = useOnboardingStore();

  return (
    <>
      <Pressable
        style={{
          minHeight: height,
          width: unit(width),
          borderRadius: theme.sizes[9],
          position: "relative",
        }}
        className={`${!image && "bg-grey"}  active:bg-grey/70`}
        onPress={() => {
          handleOpenSelector();
          setSelectedImagePosition(imagePosition);
        }}
      >
        <>
          <View className="flex absolute justify-center w-full h-full items-center ">
            <PlusIcon />
          </View>
          <View className="absolute w-full h-full">
            {image ? (
              <Image
                source={{ uri: image }}
                style={{ borderRadius: theme.sizes[9] }}
                className="w-full h-full"
              />
            ) : null}

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
                paddingTop: theme.space[9],
                paddingBottom: theme.space[8],
                paddingRight: theme.space[7],
                paddingLeft: theme.space[10],
              }}
              className="flex absolute bottom-0 top-0 justify-between items-end w-full"
            >
              <Pressable onPress={() => handleRemovePhoto(imagePosition)}>
                <RemovePhotoIcon width={22} height={22} />
              </Pressable>
              <View
                style={{
                  gap: theme.space[11],
                }}
                className="flex-row items-center justify-between w-full"
              >
                {image !== displayImage ? (
                  <Pressable
                    style={{
                      paddingTop: theme.sizes[6],
                      paddingBottom: theme.space[6],
                      paddingHorizontal: theme.space[12],
                      borderRadius: theme.sizes[12],
                    }}
                    className="bg-white w-max self-baseline"
                    onPress={() => updateOnboardingData("displayImage", image)}
                  >
                    <Text weight="medium" className="text-center" size={10}>
                      Set as Display Photo
                    </Text>
                  </Pressable>
                ) : (
                  <Pressable
                    style={{
                      paddingTop: theme.sizes[6],
                      paddingBottom: theme.space[6],
                      paddingHorizontal: theme.space[12],
                      borderRadius: theme.sizes[12],
                      gap: theme.space[7],
                    }}
                    className="bg-white w-max self-baseline flex items-center flex-row"
                    onPress={() => updateOnboardingData("displayImage", "")}
                  >
                    <Text
                      weight="medium"
                      className="text-center text-coffee-500"
                      size={10}
                    >
                      Display Photo
                    </Text>

                    <StylizedCircleCheckIcon />
                  </Pressable>
                )}

                <Pressable
                  onPress={() => {
                    handleOpenAddTitle();
                    setSelectedImagePosition(imagePosition);
                  }}
                >
                  <AddImageTitleIcon />
                </Pressable>
              </View>
            </View>
          )}
        </>
      </Pressable>
    </>
  );
}
