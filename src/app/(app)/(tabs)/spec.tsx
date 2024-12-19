import * as React from "react";
import { theme, unit } from "@/constants";
import { Pressable, ScrollView, View } from "react-native";
import { Text, Flex } from "@/components/partials";
import {
  SpecList,
  SpecPaywall,
  SpecSettingsModal,
  SpecWelcomeBottomSheet,
  UpdateChildrenModal,
  UpdateEthnicityModal,
  UpdateMarriageCustomsModal,
  // UpdateHeritageModal,
  UpdateTradFamilyRolesModal,
  UpdateTradFoodAndAttireModal,
} from "@/components/spec";
import useAppStore from "@/stores/app-store";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { SpecAdapter, useSpecQuery } from "@/adapters/SpecAdapter";
import SpecLoadingIcon from "@/components/spec/icons";
import { SettingsIcon } from "@/components/profile/icons";
import UpdateHeritageModal from "@/components/spec/update-heritage-modal";

export default function SpecScreen() {
  const showSpecModal = useAppStore((state) => state.showSpecModal);
  const [showPaywall, setShowPaywall] = React.useState(true);

  const specRef = React.useRef<BottomSheetModalMethods>(null);
  const specPaywallRef = React.useRef<BottomSheetModalMethods>(null);
  const specSettingsRef = React.useRef<BottomSheetModalMethods>(null);

  const updateEthnicityModalRef = React.useRef<BottomSheetModalMethods>(null);
  const updateChildrenModalRef = React.useRef<BottomSheetModalMethods>(null);
  const updateTradFamilyRolesModalRef =
    React.useRef<BottomSheetModalMethods>(null);
  const updateTradFoodAndAttireModalRef =
    React.useRef<BottomSheetModalMethods>(null);
  const updateHeritageModalRef = React.useRef<BottomSheetModalMethods>(null);
  const updateMarriageCustomsModalRef =
    React.useRef<BottomSheetModalMethods>(null);

  const { data, isPending } = useSpecQuery({
    queryCallback: SpecAdapter.getSpecList,
    queryKey: ["SPEC"],
  });

  React.useEffect(() => {
    if (showSpecModal) {
      specRef?.current?.present();
    } else {
      specRef?.current?.dismiss();
    }
  }, [showSpecModal]);

  React.useEffect(() => {
    if (showPaywall && !showSpecModal) {
      specPaywallRef?.current?.present();
    } else {
      specPaywallRef?.current?.dismiss();
      specRef?.current?.dismiss();
    }
  }, [showPaywall, showSpecModal]);
  return (
    <>
      <ScrollView
        style={{
          marginTop: theme.space[80],
        }}
      >
        <View
          style={{
            paddingHorizontal: theme.space[14],
          }}
        >
          <Flex align="flex-start" justify="space-between" direction="row">
            <Text size={5} weight="regular" fontFamily="Merchant">
              Spec
            </Text>

            <Pressable onPress={() => specSettingsRef.current?.present()}>
              <SettingsIcon />
            </Pressable>
          </Flex>
          {!isPending && (
            <Text weight="regular" className="pt-5 text[#4F4F4A]">
              You can let her know you <Text weight="semibold">Love her</Text>{" "}
              by sending a Super Like or a Rose.
            </Text>
          )}
        </View>

        <View style={{ marginTop: unit(34) }}>
          {isPending ? (
            <View style={{ marginTop: unit(150) }}>
              <View className="mx-auto">
                <SpecLoadingIcon />
              </View>
              <Text
                size={20}
                weight="regular"
                fontFamily="Merchant"
                className="text-center pt-[15px]"
              >
                Gathering Specs
              </Text>

              <Text className="pt-[7px] mx-auto text-[#4F4F4A] w-[60%] text-center">
                We are cooking, can you smell the jollof already
              </Text>
            </View>
          ) : (
            <SpecList />
          )}
        </View>
      </ScrollView>

      <SpecPaywall ref={specPaywallRef} />
      <SpecWelcomeBottomSheet ref={specRef} />
      <SpecSettingsModal
        ref={specSettingsRef}
        updateEthnicityModalRef={updateEthnicityModalRef}
        updateChildrenModalRef={updateChildrenModalRef}
        updateTradFamilyRolesModalRef={updateTradFamilyRolesModalRef}
        updateTradFoodAndAttireModalRef={updateTradFoodAndAttireModalRef}
        updateHeritageModalRef={updateHeritageModalRef}
        updateMarriageCustomsModalRef={updateMarriageCustomsModalRef}
      />

      <UpdateEthnicityModal ref={updateEthnicityModalRef} />
      <UpdateChildrenModal ref={updateChildrenModalRef} />
      <UpdateTradFamilyRolesModal ref={updateTradFamilyRolesModalRef} />
      <UpdateTradFoodAndAttireModal ref={updateTradFoodAndAttireModalRef} />
      <UpdateHeritageModal ref={updateHeritageModalRef} />
      <UpdateMarriageCustomsModal ref={updateMarriageCustomsModalRef} />
    </>
  );
}
