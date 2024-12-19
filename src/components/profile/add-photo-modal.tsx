import React, {
  useCallback,
  useMemo,
  forwardRef,
  Dispatch,
  SetStateAction,
} from "react";
import { View, Pressable } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { theme, unit } from "@/constants";
import { CameraIcon, PhotoIcon } from "@/icons";
import { Flex, Text } from "../partials";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useProfileStore } from "@/stores";
import { ImageData } from "@/lib/types/Stores";

interface IProps {
  setImages: Dispatch<SetStateAction<string[]>>;
  setImageData: Dispatch<SetStateAction<{ uri: string; title: string }[]>>;
  selectedPhotosModalRef: React.RefObject<BottomSheetModalMethods>;
}

const AddPhotoModal = forwardRef<BottomSheetModal, IProps>((props, ref) => {
  const snapPoints = useMemo(() => ["27%", "27%"], []);
  const { addProfileImages } = useProfileStore();

  const handlePickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        // props.setImageData((prev) => [
        //   ...prev,
        //   ...result.assets.map((asset) => asset.uri),
        // ]);
        // addProfileImages({ imageData: { uri: result.assets[0].uri, title: "" } });
        if (result.assets.length === 1) {
          addProfileImages({
            imageData: [{ title: "", uri: result.assets[0].uri }],
          });
        } else {
          const updatedImages: ImageData[] = Array(4)
            .fill({ title: "", uri: "" })
            .map((defaultImg, index) => {
              if (index < result.assets.length) {
                return { title: "", uri: result.assets[index].uri };
              }
              return defaultImg;
            });

          addProfileImages({ imageData: updatedImages });
        }
        // props.setImageData((prev) => [
        //   { uri: result.assets[0].uri, title: "" },
        //   ...prev,
        // ]);

        //@ts-ignore
        ref?.current?.close();
        props.selectedPhotosModalRef.current?.present();
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
        props.setImages((prev) => [
          ...prev,
          ...result.assets.map((asset) => asset.uri),
        ]);

        //@ts-ignore
        ref?.current?.close();
        props.selectedPhotosModalRef.current?.present();
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
    <BottomSheetModal
      snapPoints={snapPoints}
      ref={ref}
      backdropComponent={renderBackdrop}
      index={1}
      style={{
        paddingHorizontal: theme.space[24],
      }}
      handleIndicatorStyle={{
        backgroundColor: "#CECECA",
        marginTop: unit(20),
        marginBottom: unit(12),
      }}
      enablePanDownToClose
    >
      <BottomSheetView>
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
    </BottomSheetModal>
  );
});

export default AddPhotoModal;
