import React, { useCallback, useMemo, forwardRef } from "react";
import { Pressable, View } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { theme, unit } from "@/constants";
import { Flex, Text } from "../partials";
import { ScrollView } from "react-native-gesture-handler";
import { queryKeys } from "@/constants/query-keys";
import { UserAdapter, useUserQuery } from "@/adapters/UserAdapter";

interface IProps {
  updateEthnicityModalRef: React.RefObject<BottomSheetModalMethods>;
  updateChildrenModalRef: React.RefObject<BottomSheetModalMethods>;
  updateTradFamilyRolesModalRef: React.RefObject<BottomSheetModalMethods>;
  updateTradFoodAndAttireModalRef: React.RefObject<BottomSheetModalMethods>;
  updateHeritageModalRef: React.RefObject<BottomSheetModalMethods>;
  updateMarriageCustomsModalRef: React.RefObject<BottomSheetModalMethods>;
}

const SpecSettingsModal = forwardRef<BottomSheetModalMethods, IProps>(
  (props, ref) => {
    const snapPoints = useMemo(() => ["65%", "65%"], []);

    const { data: userProfile } = useUserQuery({
      queryCallback: UserAdapter.getUserProfile,
      queryKey: [queryKeys.USER],
    });

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

    const specSettings = [
      {
        question: "What’s your cultural ethnic background?",
        answer: userProfile?.data.ethnicity,
        action: () => props.updateEthnicityModalRef.current?.present(),
      },
      {
        question: "How many kids do you want? ",
        answer: userProfile?.data.children,
        action: () => props.updateChildrenModalRef.current?.present(),
      },
      {
        question: "How do you feel about traditional family roles? ",
        answer: userProfile?.data.traditional_roles,
        action: () => props.updateTradFamilyRolesModalRef.current?.present(),
      },
      {
        question:
          "How often do you eat traditional foods or wear traditional attire?",
        answer: userProfile?.data.traditional_food_or_attire,
        action: () => props.updateTradFoodAndAttireModalRef.current?.present(),
      },
      {
        question: "How important is your cultural heritage to you?",
        answer: userProfile?.data.heritage,
        action: () => props.updateHeritageModalRef.current?.present(),
      },
      {
        question:
          "Do you believe in traditional marriage customs like paying bride price?",
        answer: userProfile?.data.bride_price,
        action: () => props.updateMarriageCustomsModalRef.current?.present(),
      },
    ];

    return (
      <BottomSheetModal
        snapPoints={snapPoints}
        ref={ref}
        backdropComponent={renderBackdrop}
        index={1}
        style={{
          paddingHorizontal: theme.space[24],
          zIndex: 30,
        }}
        handleIndicatorStyle={{
          backgroundColor: "#CECECA",
          marginTop: unit(25),
          marginBottom: unit(17),
        }}
        enablePanDownToClose
      >
        <BottomSheetView>
          <View
            style={{
              paddingBottom: theme.space[12],
              position: "relative",
              height: "100%",
            }}
          >
            <View>
              <Text size={3} fontFamily="Merchant">
                Spec Settings
              </Text>
            </View>

            <View
              style={{ paddingTop: unit(30), display: "flex", gap: unit(20) }}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: unit(11) }}
              >
                {specSettings.map((item, index) => (
                  <Flex
                    key={index}
                    align="center"
                    gap={6}
                    className="w-full"
                    justify="space-between"
                    direction="row"
                    pb={11}
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#F3F3F2",
                    }}
                  >
                    <Flex
                      style={{
                        width:
                          item.question.includes("attire") ||
                          item.question.includes("price")
                            ? "75%"
                            : null,
                      }}
                      align="flex-start"
                      gap={6}
                    >
                      <Text className="text-[#696963]" size={10}>
                        {item.question}
                      </Text>

                      <Text className="text-[#696963]" weight="medium">
                        {item.answer}
                      </Text>
                    </Flex>

                    <Pressable
                      style={{
                        paddingVertical: unit(3),
                        paddingHorizontal: unit(11),
                        backgroundColor: "#F3F3F2",
                        borderRadius: unit(22),
                      }}
                      onPress={() => item.action()}
                    >
                      <Text weight="medium">Edit</Text>
                    </Pressable>
                  </Flex>
                ))}
              </ScrollView>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default SpecSettingsModal;
