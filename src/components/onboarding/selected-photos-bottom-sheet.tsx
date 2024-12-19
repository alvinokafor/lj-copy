import React, {
  useCallback,
  useMemo,
  forwardRef,
  useState,
  useEffect,
} from "react";
import { View, Pressable } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { theme } from "@/constants";
import { ModalCloseIcon } from "@/icons";
import { Button, Text } from "../partials";
import { ScrollView } from "react-native-gesture-handler";
import SelectedPhoto from "./selected-photo";
import { type ImageData } from "@/lib/types/Stores";
import { useOnboardingStore } from "@/stores";

interface ISelectedPhotosProps {
  images: ImageData[];
  shouldOpen: boolean;
  imagePosition: number;
}

const SelectedPhotosBottomSheet = forwardRef<
  BottomSheetMethods,
  ISelectedPhotosProps
>(({ images, imagePosition }, ref) => {
  const snapPoints = useMemo(() => ["82%", "82%"], []);
  const [imageTitle, setImageTitle] = useState("");
  const [wordCount, setWordCount] = useState(0);
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
        <View style={{ paddingBottom: theme.space[21] }}>
          {/* @ts-ignore */}
          <Pressable onPress={() => ref?.current?.close()}>
            <ModalCloseIcon />
          </Pressable>

          <Text
            style={{
              paddingTop: theme.space[21],
            }}
            size={4}
            fontFamily="Merchant"
          >
            Selected Photos
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={{
            display: "flex",
            flexDirection: "row",
            gap: theme.space[17],
          }}
          horizontal
        >
          {images.map((image, index) =>
            image.uri !== "" ? (
              <SelectedPhoto
                key={index}
                imageTitle={images[imagePosition].title}
                image={image.uri}
                updateImageTitle={updateImageTitle}
                imagePosition={imagePosition}
                wordCount={wordCount}
              />
            ) : null
          )}
        </ScrollView>

        <Button title="Upload all" />
      </BottomSheetView>
    </BottomSheet>
  );
});

export default SelectedPhotosBottomSheet;
