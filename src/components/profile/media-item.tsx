import React, { useRef } from "react";
import { View, Pressable, Image } from "react-native";
import { theme } from "@/constants";
import { Text } from "../partials";
import { unit } from "@/constants";
import { MoreOptionsIcon } from "./icons";
import EditPhotoOptionsModal from "./edit-photo-options-modal";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import ChangeTitleModal from "./change-title-modal";
import UpdateDisplayPhotoModal from "./update-display-photo-modal";
import RemovePhotoModal from "./remove-photo-modal";
import { MediaItem as MediaItemType } from "@/adapters/types/UserAdapterTypes";

export default function MediaItem({ media }: { media: MediaItemType }) {
  const editPhotoOptionsModalRef = useRef<BottomSheetModalMethods>(null);
  const changeCommentModalRef = useRef<BottomSheetModalMethods>(null);
  const removePhotoModalRef = useRef<BottomSheetModalMethods>(null);
  const setDisplayPhotoModalRef = useRef<BottomSheetModalMethods>(null);

  return (
    <>
      <View
        style={{ width: unit(172), height: unit(210) }}
        className="relative"
      >
        <View className="absolute w-full h-full">
          <Image
            source={{
              uri: media.url,
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
        >
          <Pressable
            onPress={() => editPhotoOptionsModalRef?.current?.present()}
          >
            <MoreOptionsIcon />
          </Pressable>

          <View
            style={{
              gap: theme.space[11],
            }}
            className="flex-row items-center justify-between w-full"
          >
            <Text fontFamily="Merchant" className=" text-white" size={2}>
              {media.title}
            </Text>
          </View>
        </View>
      </View>

      <EditPhotoOptionsModal
        setDisplayPhotoModalRef={setDisplayPhotoModalRef}
        removePhotoModalRef={removePhotoModalRef}
        changeCommentModalRef={changeCommentModalRef}
        ref={editPhotoOptionsModalRef}
      />

      <ChangeTitleModal media={media} ref={changeCommentModalRef} />
      <UpdateDisplayPhotoModal
        mediaId={media._id}
        ref={setDisplayPhotoModalRef}
      />
      <RemovePhotoModal mediaId={media._id} ref={removePhotoModalRef} />
    </>
  );
}
