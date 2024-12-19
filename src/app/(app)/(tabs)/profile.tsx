import { theme, unit } from "@/constants";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  View,
  Platform,
  FlatList,
} from "react-native";
import { Text, Flex } from "@/components/partials";
import {
  PersonIcon,
  SettingsIcon,
  WalletIcon,
} from "@/components/profile/icons";
import {
  Avatar,
  CoinWalletModal,
  MediaItem,
  AddPhotoModal,
  CompleteProfileModal,
  MediaGrid,
} from "@/components/profile";
import { SmallCoinIcon, PhotoIcon } from "@/icons";
import { EditProfileModal } from "@/components/profile";
import React, { useEffect, useState } from "react";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { CoinStoreModal } from "@/components/partials/modules";
import {
  UserAdapter,
  useUserMutation,
  useUserQuery,
} from "@/adapters/UserAdapter";
import { queryKeys } from "@/constants/query-keys";
import { useWalletQuery, WalletAdapter } from "@/adapters/WalletAdapter";
import { Skeleton } from "moti/skeleton";
import { SelectedPhotosModal } from "@/components/profile";
import { useRouter } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { useProfileStore } from "@/stores";

export default function Profile() {
  const formData = new FormData();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [images, setImages] = React.useState<string[]>([]);
  const [imageData, setImageData] = React.useState([
    { uri: "", title: "" },
    { uri: "", title: "" },
    { uri: "", title: "" },
    { uri: "", title: "" },
  ]);
  const profileImagesState = useProfileStore((state) => state.images);

  const { data, isPending } = useUserQuery({
    queryCallback: UserAdapter.getUserProfile,
    queryKey: [queryKeys.USER],
  });

  const userMediaQuery = useUserQuery({
    queryCallback: UserAdapter.getUserMedia,
    queryKey: [queryKeys.USER_MEDIA],
  });

  const walletQuery = useWalletQuery({
    queryCallback: WalletAdapter.getWalletBalance,
    queryKey: [queryKeys.WALLET_BALANCE],
  });

  const uploadMediaMutation = useUserMutation({
    mutationCallback: UserAdapter.uploadMedia,
  });

  const saveMediaMutation = useUserMutation({
    mutationCallback: UserAdapter.saveUserMedia,
  });

  const handleMediaUpload = async () => {
    try {
      const filteredImages = profileImagesState.filter(
        (item) => item.title !== ""
      );

      for (let i = 0; i < filteredImages.length; i++) {
        //@ts-ignore
        formData.append("file", {
          name: "Image",
          type: "image",
          uri:
            Platform.OS === "ios"
              ? profileImagesState[i].uri.replace("file://", "")
              : profileImagesState[i].uri,
        });
      }

      const uploadMediaResponse = await uploadMediaMutation.mutateAsync(
        formData
      );

      const saveMediaData = uploadMediaResponse.data.data.map(
        (item, index) => ({
          title: profileImagesState[index].title,
          caption: profileImagesState[index].title,
          index: index,
          url: item.publicUrl,
          isDisplayImage: false,
        })
      );

      await saveMediaMutation.mutateAsync({
        data: saveMediaData,
      });

      queryClient.invalidateQueries({ queryKey: [queryKeys.USER_MEDIA] });
    } catch (e) {
      console.log(e);
    }
  };

  const displayPhoto = userMediaQuery.data?.data.find(
    (item) => item.isDisplayImage
  );

  const editProfileModalRef = React.useRef<BottomSheetModalMethods>(null);
  const completeProfileModalRef = React.useRef<BottomSheetModalMethods>(null);
  const coinWalletModalRef = React.useRef<BottomSheetModalMethods>(null);
  const coinStoreModalRef = React.useRef<BottomSheetModalMethods>(null);
  const addPhotoModalRef = React.useRef<BottomSheetModalMethods>(null);
  const selectedPhotosModalRef = React.useRef<BottomSheetModalMethods>(null);

  return (
    <>
      <View style={{ backgroundColor: "#F3F3F2", flex: 1 }}>
        <View
          style={{
            paddingHorizontal: theme.space[14],
            marginTop: theme.space[80],
            flex: 1,
          }}
        >
          <View
            style={{
              paddingBottom: theme.space[8],
              display: "flex",
              alignContent: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Text size={5} weight="regular" fontFamily="Merchant">
              Profile
            </Text>

            <Pressable onPress={() => router.push("/(app)/settings")}>
              <SettingsIcon />
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="mx-auto">
              <Skeleton
                colorMode="light"
                height={106}
                width={106}
                radius="round"
              >
                {!isPending ? (
                  <Avatar
                    completeProfileModalRef={completeProfileModalRef}
                    uri={displayPhoto?.url}
                  />
                ) : null}
              </Skeleton>
            </View>

            <View style={{ paddingTop: unit(14) }}>
              <View className="mx-auto">
                <Skeleton width={200} colorMode="light">
                  {!isPending ? (
                    <Text
                      size={4}
                      className="text-center"
                      fontFamily="Merchant"
                    >
                      {data?.data.firstName} {data?.data.lastName}
                    </Text>
                  ) : null}
                </Skeleton>
              </View>

              <Pressable onPress={() => coinWalletModalRef.current?.present()}>
                <Flex
                  direction="row"
                  align="center"
                  gap={8}
                  style={{
                    backgroundColor: "#fff",
                    marginTop: unit(20),
                    paddingHorizontal: unit(12),
                    paddingTop: unit(8),
                    paddingBottom: unit(8),
                    borderRadius: unit(8),
                  }}
                  className="mx-auto"
                >
                  <Flex direction="row" align="center" gap={4}>
                    <WalletIcon />
                    <Text size={0}>Coin Wallet:</Text>
                  </Flex>

                  <Flex direction="row" align="center" gap={4}>
                    <SmallCoinIcon />
                    <Text
                      size={3}
                      className="text-center"
                      fontFamily="Merchant"
                    >
                      {walletQuery.data?.data.balance}
                    </Text>
                  </Flex>
                </Flex>
              </Pressable>
            </View>

            <View
              style={{
                marginTop: unit(20),
                backgroundColor: "#fff",
                paddingHorizontal: unit(18),
                paddingTop: unit(20),
                paddingBottom: unit(20),
                borderRadius: unit(12),
              }}
            >
              <Flex direction="row" align="center" justify="space-between">
                <Flex direction="row" align="center" gap={8}>
                  <PersonIcon />
                  <Text size={3} fontFamily="Merchant">
                    About Me
                  </Text>
                </Flex>

                <Pressable
                  style={{
                    paddingHorizontal: unit(11),
                    paddingTop: unit(4),
                    paddingBottom: unit(4),
                    backgroundColor: "#422618",
                    borderRadius: 22,
                  }}
                  onPress={() => editProfileModalRef?.current?.present()}
                >
                  <Text size={0} weight="medium" className="text-white">
                    Edit Profile
                  </Text>
                </Pressable>
              </Flex>
              <View
                style={{ paddingTop: unit(20), display: "flex", gap: unit(11) }}
              >
                <AboutMeField
                  isPending={isPending}
                  title="Ethnicity"
                  text={data?.data?.ethnicity}
                />
                <AboutMeField
                  isPending={isPending}
                  title="Languages"
                  text={data?.data?.language}
                />
                <AboutMeField
                  isPending={isPending}
                  title="Job Title"
                  text={data?.data?.job}
                />
                <AboutMeField
                  isPending={isPending}
                  title="Education Level"
                  text={data?.data?.degree}
                />
                <AboutMeField
                  isPending={isPending}
                  title="Height"
                  text={data?.data?.height}
                />
              </View>
            </View>

            <View style={{ marginTop: unit(20), paddingBottom: unit(30) }}>
              <Flex direction="row" align="center" justify="space-between">
                <Flex direction="row" align="center" gap={8}>
                  <PhotoIcon />
                  <Text size={3} fontFamily="Merchant">
                    Photos & Videos
                  </Text>
                </Flex>

                <Pressable
                  style={{
                    paddingHorizontal: unit(11),
                    paddingTop: unit(4),
                    paddingBottom: unit(4),
                    backgroundColor: "#422618",
                    borderRadius: 22,
                  }}
                  onPress={() => addPhotoModalRef.current?.present()}
                >
                  <Text size={0} weight="medium" className="text-white">
                    Add
                  </Text>
                </Pressable>
              </Flex>

              <FlatList
                data={
                  isPending ? Array(4).fill(null) : userMediaQuery.data?.data
                }
                keyExtractor={(item, index) =>
                  item ? item._id : `skeleton-${index}`
                }
                numColumns={2}
                contentContainerStyle={{ paddingTop: unit(17), gap: unit(12) }}
                columnWrapperStyle={{ gap: unit(17) }}
                renderItem={({ item }) =>
                  isPending ? (
                    <Skeleton colorMode="light" width="48%" height={437} />
                  ) : (
                    <MediaItem media={item} />
                  )
                }
              />
            </View>
          </ScrollView>
        </View>
      </View>

      <EditProfileModal user={data?.data} ref={editProfileModalRef} />
      <CompleteProfileModal user={data?.data} ref={completeProfileModalRef} />
      <CoinWalletModal
        ref={coinWalletModalRef}
        coinStoreModalRef={coinStoreModalRef}
      />
      <CoinStoreModal ref={coinStoreModalRef} />
      <AddPhotoModal
        selectedPhotosModalRef={selectedPhotosModalRef}
        ref={addPhotoModalRef}
        setImages={setImages}
        setImageData={setImageData}
      />
      <SelectedPhotosModal
        isPending={uploadMediaMutation.isPending || saveMediaMutation.isPending}
        handleMediaUpload={handleMediaUpload}
        ref={selectedPhotosModalRef}
        images={images}
      />
    </>
  );
}

function AboutMeField({
  title,
  text,
  isPending,
}: {
  title: string;
  text: string | number | undefined;
  isPending: boolean;
}) {
  return (
    <View>
      <Text size={0} className="text-light-grey">
        {title}
      </Text>
      <View
        style={{
          borderBottomWidth: unit(1),
          borderBottomColor: "#F3F3F2",
          paddingBottom: unit(11),
          paddingTop: unit(6),
        }}
      >
        <Skeleton height={25} width={"100%"} colorMode="light">
          {!isPending ? (
            <Text weight="medium" className="text-[#696963]">
              {text}
            </Text>
          ) : null}
        </Skeleton>
      </View>
    </View>
  );
}
