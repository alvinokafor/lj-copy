import React, { useCallback, useMemo, forwardRef } from "react";
import {
  View,
  Pressable,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { theme, unit } from "@/constants";
import { CheckedIcon, ModalCloseIcon, UncheckedIcon } from "@/icons";
import { Button, Flex, Text } from "../partials";
import { useQueryClient } from "@tanstack/react-query";
import { SpecAdapter, useSpecMutation } from "@/adapters/SpecAdapter";
import { queryKeys } from "@/constants/query-keys";
import { UserProfileResponse } from "@/adapters/types/UserAdapterTypes";

type IOptions = "Yes" | "No" | "Not Sure Yet";
const options: IOptions[] = ["Yes", "No", "Not Sure Yet"];

const UpdateMarriageCustomsModal = forwardRef<BottomSheetModal>(
  (_props, ref) => {
    const snapPoints = useMemo(() => ["60%", "60%"], []);
    const [reply, setReply] = React.useState<IOptions | "">("");
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useSpecMutation({
      mutationCallback: SpecAdapter.setupBridePrice,
    });

    const handleUpdateBridePrice = async () => {
      try {
        await mutateAsync({
          bride_price: reply,
        });
        queryClient.setQueryData(
          [queryKeys.USER],
          (oldData: UserProfileResponse) => {
            return {
              ...oldData,
              data: {
                ...oldData.data,
                bride_price: reply,
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
                  Do you believe in traditional marriage customs like paying
                  bride price?
                </Text>
              </View>

              <View>
                <FlatList
                  data={options}
                  contentContainerStyle={{
                    paddingTop: theme.space[20],
                    gap: theme.space[12],
                  }}
                  scrollEnabled={false}
                  renderItem={({ item }) => (
                    <TouchableWithoutFeedback
                      onPress={() => setReply(item)}
                      style={{ marginBottom: theme.space[12] }}
                    >
                      <View
                        style={{ borderRadius: theme.sizes[12] }}
                        className={`${
                          reply === item ? "bg-coffee-100" : "bg-grey"
                        }`}
                      >
                        <Flex
                          px={12}
                          direction="row"
                          justify="space-between"
                          className="w-full"
                          pt={15}
                          pb={15}
                        >
                          <Text
                            weight="medium"
                            className="text-soft-black capitalize"
                            size={1}
                          >
                            {item}
                          </Text>
                          <Pressable onPress={() => setReply(item)}>
                            {reply === item ? (
                              <CheckedIcon />
                            ) : (
                              <UncheckedIcon />
                            )}
                          </Pressable>
                        </Flex>
                      </View>
                    </TouchableWithoutFeedback>
                  )}
                  keyExtractor={(item) => item}
                />
              </View>

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
                    color: reply === "" ? "#696963" : "#fff",
                  }}
                  style={{ width: "50%" }}
                  backgroundColor={`${reply === "" ? "#B5B5B0" : "#422618"}`}
                  disabled={reply === ""}
                  isLoading={isPending}
                  onPress={handleUpdateBridePrice}
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
      </>
    );
  }
);

export default UpdateMarriageCustomsModal;
