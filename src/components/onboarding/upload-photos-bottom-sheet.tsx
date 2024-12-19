import React, { useCallback, useMemo, forwardRef } from "react";
import { View, Pressable } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { theme } from "@/constants";
import { CameraIcon, ModalCloseIcon, PhotoIcon } from "@/icons";
import { Flex, Text } from "../partials";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { useOnboardingStore } from "@/stores";

interface IUploadPhotoProps {
  selectedIndex: number;
}

const UploadPhotosBottomSheet = forwardRef<
  BottomSheetMethods,
  IUploadPhotoProps
>(({ selectedIndex }, ref) => {
  const snapPoints = useMemo(() => ["33%", "33%"], []);
  const updateProfileImages = useOnboardingStore(
    (state) => state.updateProfileImages
  );
  const setProfileImages = useOnboardingStore(
    (state) => state.setProfileImages
  );
  const imageList = useOnboardingStore((state) => state.images);

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
          updateProfileImages({
            imagePosition: selectedIndex,
            imageData: { title: "", uri: result.assets[0].uri },
            action: "add",
          });
        } else {
          const updatedImages = Array(4)
            .fill({ title: "", uri: "" })
            .map((defaultImg, index) => {
              if (index < result.assets.length) {
                return { title: "", uri: result.assets[index].uri };
              }
              return defaultImg;
            });

          setProfileImages({ images: updatedImages });
        }

        //@ts-ignore
        ref?.current?.close();
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };
  const handleCameraCapture = async () => {
    try {
      // Check if we already have permission
      let { status } = await Camera.requestCameraPermissionsAsync();

      // If we don't have permission, request it
      if (status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
        return;
      }
      // If we have permission, launch the camera
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        // handleAddImage(result.assets[0].uri);
        updateProfileImages({
          imagePosition: selectedIndex,
          imageData: { title: "", uri: result.assets[0].uri },
          action: "add",
        });
        //@ts-ignore
        ref?.current?.close();
      }
    } catch (error) {
      alert(
        "An error occurred while trying to use the camera. Please try again."
      );
    }
  };

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
        <View style={{ paddingBottom: theme.space[18] }}>
          {/* @ts-ignore */}
          <Pressable onPress={() => ref?.current?.close()}>
            <ModalCloseIcon />
          </Pressable>

          <Text
            style={{
              paddingTop: theme.space[20],
            }}
            size={4}
            fontFamily="Merchant"
          >
            Add Photos
          </Text>
        </View>

        <ScrollView>
          <Pressable
            style={{
              marginBottom: theme.space[12],
              borderRadius: theme.sizes[12],
            }}
            className={
              "bg-grey active:bg-[#F1DAAE] transition-all duration-150 group"
            }
            onPress={handlePickImage}
          >
            <Flex
              px={12}
              direction="row"
              gap={8}
              className="w-full"
              pt={15}
              pb={15}
            >
              <PhotoIcon />
              <Text
                weight="medium"
                className="text-soft-black capitalize group-active:text-coffee-500"
                size={1}
              >
                Choose from Library
              </Text>
            </Flex>
          </Pressable>

          <Pressable
            style={{
              marginBottom: theme.space[12],
              borderRadius: theme.sizes[12],
            }}
            className={
              "bg-grey active:bg-[#F1DAAE] transition-all duration-150 group"
            }
            onPress={handleCameraCapture}
          >
            <Flex
              px={12}
              direction="row"
              gap={8}
              className="w-full"
              pt={15}
              pb={15}
            >
              <CameraIcon />
              <Text
                weight="medium"
                className="text-soft-black capitalize group-active:text-coffee-500"
                size={1}
              >
                Take a photo
              </Text>
            </Flex>
          </Pressable>
        </ScrollView>
      </BottomSheetView>
    </BottomSheet>
  );
});

export default UploadPhotosBottomSheet;
