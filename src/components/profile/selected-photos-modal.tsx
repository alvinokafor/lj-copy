import React, {
  useCallback,
  useMemo,
  forwardRef,
  useState,
  useEffect,
} from "react";
import { View, Pressable } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { theme } from "@/constants";
import { ModalCloseIcon } from "@/icons";
import { Button, Text } from "../partials";
import { ScrollView } from "react-native-gesture-handler";
import SelectedPhoto from "./selected-photo";
import { useProfileStore } from "@/stores";

interface ISelectedPhotosProps {
  images: string[];
  shouldOpen?: boolean;
  handleMediaUpload: () => void;
  isPending: boolean;
}

const SelectedPhotosModal = forwardRef<BottomSheetModal, ISelectedPhotosProps>(
  ({ images, handleMediaUpload, isPending }, ref) => {
    const snapPoints = useMemo(() => ["82%", "90%"], []);

    const { images: imagesState, clearImages } = useProfileStore();

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
        index={0}
        style={{
          paddingHorizontal: theme.space[24],
        }}
        handleIndicatorStyle={{ backgroundColor: "#fff" }}
        enablePanDownToClose
      >
        <BottomSheetView>
          <View style={{ paddingBottom: theme.space[21] }}>
            <Pressable
              onPress={() => {
                //@ts-ignore
                ref?.current?.dismiss();
                clearImages();
              }}
            >
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
            {imagesState.map((image, index) =>
              image.uri !== "" ? (
                <SelectedPhoto
                  key={index}
                  imageTitle={image?.title}
                  image={image?.uri}
                  imageIndex={index}
                />
              ) : null
            )}
          </ScrollView>

          <Button
            onPress={handleMediaUpload}
            isLoading={isPending}
            title="Upload all"
          />
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default SelectedPhotosModal;
