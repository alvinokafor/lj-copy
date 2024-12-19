import React from "react";
import { Image, Pressable, View } from "react-native";
import { theme, unit } from "@/constants";
import { Flex, Text } from "@/components/partials";
import { RoseIcon, SendRoseIcon, SuperLikeIcon, VerifiedIcon } from "@/icons";
import {
  InteractionsBottomSheet,
  CoinStoreModal,
  SendInteractionModal,
} from "../partials/modules";
import { SendSuperLikeIcon } from "@/icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { UserProfile } from "@/adapters/types/MatchingAdapterTypes";
import ProfileDetailsModal from "./profile-details-modal";
import {
  ChooseHideInteractionModal,
  ProfileSendInteractionModal,
  ReportModal,
} from "@/components/discover";
import HideModal from "./hide-modal";

export default function DiscoverCard({
  isTopCard,
  isNextCard,
  user,
}: {
  isTopCard: boolean;
  isNextCard: boolean;
  user: UserProfile;
}) {
  const [hasSufficientCoins, setHasSufficientCoins] = React.useState(false);
  const sendSuperLikeRef = React.useRef<BottomSheetModal>(null);
  const sendRoseRef = React.useRef<BottomSheetModal>(null);
  const coinStoreRef = React.useRef<BottomSheetModal>(null);
  const sendSuperLikeModalRef = React.useRef<BottomSheetModal>(null);
  const sendRoseModalRef = React.useRef<BottomSheetModal>(null);
  const profileDetailsModalRef = React.useRef<BottomSheetModal>(null);
  const profileSendInteractionModalRef = React.useRef<BottomSheetModal>(null);
  const chooseHideInteractionModalRef = React.useRef<BottomSheetModal>(null);
  const hideProfileModalRef = React.useRef<BottomSheetModal>(null);
  const reportModalRef = React.useRef<BottomSheetModal>(null);

  const handleSendSuperLike = () => {
    if (!hasSufficientCoins) {
      sendSuperLikeRef?.current?.dismiss();
      coinStoreRef?.current?.present();
    } else {
      sendSuperLikeRef?.current?.dismiss();
      sendSuperLikeModalRef?.current?.present();
    }
  };

  const handleSendRose = () => {
    if (!hasSufficientCoins) {
      sendRoseRef?.current?.dismiss();
      coinStoreRef?.current?.present();
    } else {
      sendRoseRef?.current?.dismiss();
      sendRoseModalRef?.current?.present();
    }
  };

  return (
    <>
      <View
        className={`w-full h-[556px] absolute rounded-2xl overflow-hidden bg-grey `}
        style={{
          borderRadius: theme.sizes[16],
          transform: [{ scale: isTopCard ? 1.0 : isNextCard ? 0.95 : 0.9 }],
          // zIndex: isTopCard ? 2 : isNextCard ? 1 : 0,
          top: isTopCard ? 20 : 0,
        }}
      >
        <Image
          source={{
            uri: user.media.length > 0 ? user.media[0].url : user.profile_pic,
          }}
          className="w-full h-full"
        />

        <View
          style={{
            bottom: theme.space[24],
            left: theme.space[17],
            right: theme.space[17],
          }}
          className="absolute flex flex-row items-end justify-between"
        >
          <Flex align="flex-start" gap={12}>
            <View
              style={{
                paddingTop: theme.space[7],
                paddingBottom: theme.space[7],
                paddingHorizontal: theme.space[12],
                borderRadius: theme.sizes[20],
              }}
              className="bg-[#F1DAAE]"
            >
              <Text className="text-center" weight="medium">
                New Here
              </Text>
            </View>
            <Flex align="center" direction="row" gap={9}>
              <Pressable
                onPress={() => profileDetailsModalRef.current?.present()}
              >
                <Text size={4} className="text-white">
                  <Text size={4} weight="semibold">
                    {user?.firstName},
                  </Text>{" "}
                  25
                </Text>
              </Pressable>

              <VerifiedIcon />
            </Flex>
          </Flex>

          <Flex gap={18}>
            <Pressable
              style={{
                height: theme.sizes[48],
                width: theme.sizes[48],
                borderRadius: unit(38),
              }}
              className="bg-white flex items-center justify-center"
              onPress={() => {
                sendRoseRef?.current?.present();
              }}
            >
              <RoseIcon />
            </Pressable>
            <Pressable
              style={{
                height: theme.sizes[48],
                width: theme.sizes[48],
                borderRadius: unit(38),
              }}
              className="bg-white flex items-center justify-center"
              onPress={() => {
                sendSuperLikeRef?.current?.present();
              }}
            >
              <SuperLikeIcon />
            </Pressable>
          </Flex>
        </View>
      </View>
      <InteractionsBottomSheet
        icon={<SendSuperLikeIcon />}
        title={hasSufficientCoins ? "Superlike" : "Insufficent Coins"}
        description={
          !hasSufficientCoins
            ? "Superlike is a way to express how much you like someone"
            : `You're about to send  a super like to ${user.firstName}`
        }
        actionText="To use Superlike you need 3 LJ Coins"
        buttonText={hasSufficientCoins ? "Continue" : "Buy Coins"}
        ref={sendSuperLikeRef}
        handleOnPress={handleSendSuperLike}
      />

      <InteractionsBottomSheet
        icon={<SendRoseIcon />}
        title={hasSufficientCoins ? "Rose" : "Insufficent Coins"}
        description={
          !hasSufficientCoins
            ? "Rose is a way to express how much you like someone"
            : `You're about to send  a rose to ${user.firstName}`
        }
        actionText="To use Rose you need 3 LJ Coins"
        buttonText={hasSufficientCoins ? "Continue" : "Buy Coins"}
        ref={sendRoseRef}
        handleOnPress={handleSendRose}
      />

      <CoinStoreModal ref={coinStoreRef} />
      <SendInteractionModal
        image={user.media.length > 0 ? user.media[0].url : user.profile_pic}
        name={user.firstName}
        userId={user._id}
        ref={sendSuperLikeModalRef}
        icon={require("../../../assets/images/big-superlike-icon.png")}
        interaction="Superlike"
        setHasSufficientCoins={setHasSufficientCoins}
        coinStoreRef={coinStoreRef}
      />
      <SendInteractionModal
        image={user.media.length > 0 ? user.media[0].url : user.profile_pic}
        name={user.firstName}
        userId={user._id}
        ref={sendRoseModalRef}
        icon={require("../../../assets/images/big-sendrose-icon.png")}
        interaction="Rose"
        setHasSufficientCoins={setHasSufficientCoins}
        coinStoreRef={coinStoreRef}
      />

      <ProfileDetailsModal
        profileSendInteractionModalRef={profileSendInteractionModalRef}
        chooseHideInteractionModalRef={chooseHideInteractionModalRef}
        user={user}
        ref={profileDetailsModalRef}
      />

      <ProfileSendInteractionModal ref={profileSendInteractionModalRef} />
      <ChooseHideInteractionModal
        hideModalRef={hideProfileModalRef}
        reportModalRef={reportModalRef}
        ref={chooseHideInteractionModalRef}
      />
      <HideModal ref={hideProfileModalRef} />
      <ReportModal ref={reportModalRef} />
    </>
  );
}
