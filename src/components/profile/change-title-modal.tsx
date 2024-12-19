import React, {
  useCallback,
  useMemo,
  forwardRef,
  useState,
  useEffect,
} from "react";
import { View, Pressable, TextInput, Image } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { theme, unit } from "@/constants";
import { ModalCloseIcon, PlusIcon } from "@/icons";
import { Flex, Text, Button } from "../partials";
import { MediaItem } from "@/adapters/types/UserAdapterTypes";
import { UserAdapter, useUserMutation } from "@/adapters/UserAdapter";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants/query-keys";

interface IProps {
  media: MediaItem;
}

const ChangeTitleModal = forwardRef<BottomSheetModal, IProps>((props, ref) => {
  const snapPoints = useMemo(() => ["75%", "75%"], []);
  const [imageTitle, setImageTitle] = useState("");
  const [imageTitleFocused, setImageTitleFocused] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useUserMutation({
    mutationCallback: UserAdapter.updateUserMedia,
    params: props.media._id,
  });

  const handleUpdateTitle = async () => {
    try {
      const res = await mutateAsync({
        title: imageTitle,
        caption: imageTitle,
        isDisplayImage: props.media.isDisplayImage,
      });
      queryClient.invalidateQueries({ queryKey: [queryKeys.USER_MEDIA] });
      //@ts-ignore
      ref?.current.close();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getWordCount = () => {
      const textLenght = imageTitle.length;
      if (textLenght >= 100) {
        setWordCount(100);
      } else {
        setWordCount(100 - textLenght);
      }
    };
    getWordCount();
  }, [imageTitle]);

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
              onChangeText={(title) => setImageTitle(title)}
              value={imageTitle}
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
        </View>

        <PhotoContainer
          url={props.media.url}
          handleUpdateTitle={handleUpdateTitle}
          isPending={isPending}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
});

function PhotoContainer({
  handleUpdateTitle,
  isPending,
  url,
}: {
  handleUpdateTitle: () => void;
  isPending: boolean;
  url: string;
}) {
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
        className={` active:bg-grey/70`}
      >
        <>
          <View className="flex absolute justify-center w-full h-full items-center ">
            <PlusIcon />
          </View>
          <View className="absolute w-full h-full">
            <Image
              source={{
                uri: url,
              }}
              style={{ borderRadius: theme.sizes[9] }}
              className="w-full h-full"
            />

            <View
              style={{ borderRadius: theme.sizes[9] }}
              className="absolute w-full h-full bg-soft-black/40 active:bg-soft-black/60"
            ></View>
          </View>

          <View
            style={{
              paddingTop: theme.space[15],
              paddingBottom: theme.space[20],
              paddingRight: theme.space[13],
              paddingLeft: theme.space[10],
            }}
            className="flex absolute bottom-0 top-0 justify-between items-end w-full"
          ></View>
        </>
      </Pressable>
      <Button title="Save" onPress={handleUpdateTitle} isLoading={isPending} />
    </View>
  );
}

export default ChangeTitleModal;
