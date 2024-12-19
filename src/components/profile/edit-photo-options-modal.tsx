import React, { useCallback, useMemo, forwardRef, useState } from "react";
import { ScrollView, View } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { theme, unit } from "@/constants";
import { Text, Flex } from "../partials";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { CommentIcon, TrashIcon, DisplayPhotoIcon } from "./icons";
import { MediaIcon } from "../chat/icons";
import * as ImagePicker from "expo-image-picker";

interface IProps {
  changeCommentModalRef: React.RefObject<BottomSheetModalMethods>;
  setDisplayPhotoModalRef: React.RefObject<BottomSheetModalMethods>;
  removePhotoModalRef: React.RefObject<BottomSheetModalMethods>;
}

const EditPhotoOptionsModal = forwardRef<BottomSheetModal, IProps>(
  (props, ref) => {
    const [image, setImage] = useState<string | null>(null);
    const snapPoints = useMemo(() => ["40%", "40%"], []);

    const handlePickImage = async () => {
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          // allowsEditing: true,
          allowsMultipleSelection: false,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }

        //@ts-ignore
        ref?.current?.dismiss();
      } catch (error) {
        console.error("Error picking image:", error);
      }
    };

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

    const moreOptions = [
      {
        title: "Change Title",
        icon: <CommentIcon />,
        action: () => props.changeCommentModalRef?.current?.present(),
      },

      {
        title: "Change Photo",
        icon: <MediaIcon />,
        action: () => handlePickImage(),
      },

      {
        title: "Set as Display Photo",
        icon: <DisplayPhotoIcon />,
        action: () => props.setDisplayPhotoModalRef?.current?.present(),
      },
      {
        title: "Remove Photo",
        icon: <TrashIcon />,
        action: () => props.removePhotoModalRef?.current?.present(),
      },
    ];

    return (
      <BottomSheetModal
        snapPoints={snapPoints}
        ref={ref}
        backdropComponent={renderBackdrop}
        index={1}
        style={{
          paddingHorizontal: unit(24),
          zIndex: 30,
        }}
        handleIndicatorStyle={{
          backgroundColor: "#CECECA",
          marginTop: unit(20),
          marginBottom: unit(12),
        }}
        enablePanDownToClose
      >
        <BottomSheetView>
          <View style={{ paddingBottom: unit(28) }}>
            <ScrollView>
              {moreOptions.map((item, index) => (
                <TouchableWithoutFeedback
                  key={index}
                  style={{ marginBottom: theme.space[12] }}
                  onPress={item.action}
                >
                  <View
                    style={{ borderRadius: theme.sizes[12] }}
                    className={`bg-grey`}
                  >
                    <Flex
                      px={12}
                      direction="row"
                      gap={8}
                      className="w-full"
                      pt={15}
                      pb={15}
                    >
                      {item.icon}
                      <Text
                        weight="medium"
                        className={
                          item.title === "Remove Photo"
                            ? "text-[#CC0A00]"
                            : "text-soft-black"
                        }
                        size={1}
                      >
                        {item.title}
                      </Text>
                    </Flex>
                  </View>
                </TouchableWithoutFeedback>
              ))}
            </ScrollView>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default EditPhotoOptionsModal;
