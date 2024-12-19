import React, { useCallback, useMemo, forwardRef } from "react";
import { View, Pressable, TouchableWithoutFeedback } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { theme, unit } from "@/constants";
import { BottomCaretIcon, ModalCloseIcon } from "@/icons";
import { Button, Flex, Text } from "../partials";
import { useQueryClient } from "@tanstack/react-query";
import { ModalSelector } from "../partials/modules";
import { ethnicBackgrounds } from "@/utils/static";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { SpecAdapter, useSpecMutation } from "@/adapters/SpecAdapter";
import { queryKeys } from "@/constants/query-keys";
import { UserProfileResponse } from "@/adapters/types/UserAdapterTypes";

const UpdateEthnicityModal = forwardRef<BottomSheetModal>((_props, ref) => {
  const snapPoints = useMemo(() => ["40%", "40%"], []);
  const [ethnicBackground, setEthnicBackground] = React.useState("");
  const [ethnicBackgroundFocused, setEthnicBackgroundFocused] =
    React.useState(false);
  const modalSelectorRef = React.useRef<BottomSheetModalMethods>(null);
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useSpecMutation({
    mutationCallback: SpecAdapter.setupEthnicty,
  });

  const handleSetEthnicBackground = async () => {
    try {
      await mutateAsync({
        ethnicity: ethnicBackground,
      });
      queryClient.setQueryData(
        [queryKeys.USER],
        (oldData: UserProfileResponse) => {
          return {
            ...oldData,
            data: {
              ...oldData.data,
              ethnicity: ethnicBackground,
            },
          };
        }
      );
      queryClient.invalidateQueries({ queryKey: [queryKeys.USER] });
      //@ts-ignore
      ref.current?.dismiss();
    } catch (e) {
      console.log(e);
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

  return (
    <>
      <BottomSheetModal
        snapPoints={snapPoints}
        ref={ref}
        backdropComponent={renderBackdrop}
        index={1}
        style={{
          paddingHorizontal: theme.space[18],
          zIndex: 30,
        }}
        handleIndicatorStyle={{ backgroundColor: "#fff" }}
        enablePanDownToClose
      >
        <BottomSheetView>
          <View style={{ paddingBottom: theme.space[12] }}>
            <Pressable
              className="self-end"
              //@ts-ignore
              onPress={() => ref?.current?.dismiss()}
            >
              <ModalCloseIcon />
            </Pressable>

            <View style={{ paddingTop: theme.space[20] }}>
              <Text
                size={4}
                fontFamily="Merchant"
                style={{ lineHeight: unit(30) }}
              >
                What’s your cultural ethnic background?
              </Text>
            </View>

            <TouchableWithoutFeedback
              onPress={() => {
                setEthnicBackgroundFocused(true);
              }}
            >
              <View>
                <View
                  style={[
                    {
                      paddingTop: theme.space[17],
                      display: "flex",
                      gap: theme.space[20],
                      borderBottomWidth: 1,
                      borderBottomColor: "#B5B5B0",
                      paddingBottom: theme.space[17],
                    },
                    ethnicBackgroundFocused &&
                      theme.actionStateStyles.inputFocused,
                  ]}
                >
                  <Flex
                    direction="row"
                    justify="space-between"
                    className="w-full"
                  >
                    <View className="text-soft-black">
                      <Text weight="medium" size={1}>
                        {!ethnicBackground
                          ? "Select Ethnic Background"
                          : ethnicBackground}
                      </Text>
                    </View>

                    <Pressable
                      onPress={() => modalSelectorRef.current?.present()}
                    >
                      <BottomCaretIcon />
                    </Pressable>
                  </Flex>
                </View>
              </View>
            </TouchableWithoutFeedback>

            <View
              style={{
                paddingTop: theme.space[32],
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
              }}
            >
              <Button
                title="Save"
                titleStyle={{
                  fontFamily: "BRSonoma-Medium",
                  fontSize: unit(16),
                  color: "#fff",
                }}
                style={{ width: "50%" }}
                backgroundColor={`${
                  ethnicBackground === "" ? "#B5B5B0" : "#422618"
                }`}
                disabled={ethnicBackground === "" || isPending}
                onPress={handleSetEthnicBackground}
                isLoading={isPending}
              />
              <Button
                title="Cancel"
                titleStyle={{
                  fontFamily: "BRSonoma-Medium",
                  fontSize: unit(16),
                  color: "#1E1E1C",
                }}
                style={{ width: "50%" }}
                backgroundColor="#fff"
                //@ts-ignore
                onPress={() => ref?.current?.dismiss()}
              />
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>

      <ModalSelector
        itemList={ethnicBackgrounds}
        setValue={setEthnicBackground}
        value={ethnicBackground}
        title="Select Ethnic Background"
        placeHolder="Search for Ethnic Background"
        ref={modalSelectorRef}
      />
    </>
  );
});

export default UpdateEthnicityModal;
