import { theme, unit } from "@/constants";
import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { Text, ScreenContainer, Flex, Button } from "@/components/partials";
import { StylizedCheckedIcon } from "@/icons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { getZodiacSign, getFormattedDate } from "@/utils";
import { Platform } from "react-native";
import { UserAdapter, useUserMutation } from "@/adapters/UserAdapter";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants/query-keys";
import { UpdateProfileHeader } from "@/components/profile";
import { useRouter } from "expo-router";

export default function UpdateDOB() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const currentDate = new Date();
  const [dob, setDob] = React.useState<Date | undefined>(undefined);
  const [ageFocused, setAgeFocused] = React.useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = React.useState(false);

  const { mutateAsync, isPending } = useUserMutation({
    mutationCallback: UserAdapter.editUserProfile,
  });

  const handleUpdateDOB = async () => {
    try {
      const res = await mutateAsync({ date_of_birth: dob?.toISOString() });
      queryClient.invalidateQueries({ queryKey: [queryKeys.USER] });
      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ScreenContainer>
        <View
          style={{ display: "flex", justifyContent: "space-between", flex: 1 }}
        >
          <UpdateProfileHeader heading="What’s your date of birth?" />
          <View style={{ paddingTop: theme.space[20] }}>
            <TouchableWithoutFeedback
              onPress={() => {
                setIsDatePickerVisible(true);
                setAgeFocused(true);
              }}
            >
              <View>
                <View
                  style={[
                    {
                      display: "flex",
                      gap: theme.space[20],
                      borderBottomWidth: 1,
                      borderBottomColor: "#B5B5B0",
                      paddingBottom: theme.space[17],
                    },
                    ageFocused && theme.actionStateStyles.inputFocused,
                  ]}
                >
                  <Flex direction="row" justify="space-between">
                    <Flex align="flex-start">
                      {ageFocused ||
                        (dob && (
                          <Text
                            style={{ paddingBottom: theme.space[4] }}
                            className="text-[#696963]"
                            weight="medium"
                            size={0}
                          >
                            Date of Birth
                          </Text>
                        ))}

                      <View className="text-soft-black w-full">
                        <Text weight="medium" size={1}>
                          {!dob ? "Date of Birth" : getFormattedDate(dob)}
                        </Text>
                      </View>
                    </Flex>

                    {dob && (
                      <View
                        style={{
                          paddingVertical: theme.space[6],
                          paddingHorizontal: theme.space[10],
                          borderRadius: theme.sizes[10],
                        }}
                        className="bg-coffee-100"
                      >
                        <Text weight="medium" className=" text-coffee-500">
                          {getZodiacSign(
                            new Date(
                              dob.getFullYear(),
                              dob.getMonth(),
                              dob.getDate()
                            )
                          )}
                        </Text>
                      </View>
                    )}
                  </Flex>
                </View>
                {dob && (
                  <Flex direction="row" mt={18} gap={8}>
                    <StylizedCheckedIcon />

                    <Text className="text-light-grey" size={0} weight="medium">
                      We’re only showing your age{" "}
                      <Text className="text-text-dark" weight="medium" size={0}>
                        ({currentDate.getFullYear() - dob.getFullYear()}){" "}
                      </Text>
                      not your DOB
                    </Text>
                  </Flex>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>

          {isDatePickerVisible && Platform.OS === "ios" && (
            <View style={{ paddingTop: theme.space[58] }}>
              <RNDateTimePicker
                onChange={(_event, date) => {
                  setDob(date);
                  setAgeFocused(false);
                }}
                value={dob ? dob : currentDate}
                maximumDate={new Date(2006, 12, 0)}
                minimumDate={new Date(1900, 1, 1)}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
              />
            </View>
          )}

          {ageFocused && Platform.OS === "android" && (
            <View style={{ paddingTop: theme.space[58] }}>
              <RNDateTimePicker
                onChange={(_event, date) => {
                  setDob(date);
                  setAgeFocused(false);
                }}
                value={dob ? dob : currentDate}
                maximumDate={new Date(2006, 12, 0)}
                minimumDate={new Date(1900, 1, 1)}
                mode="date"
              />
            </View>
          )}
        </View>
      </ScreenContainer>
      <View
        style={{
          paddingHorizontal: theme.space[15],
          paddingBottom: unit(50),
        }}
      >
        <Button title="Save" isLoading={isPending} onPress={handleUpdateDOB} />
      </View>
    </>
  );
}
