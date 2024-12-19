import { theme, unit } from "@/constants";
import React, { useRef } from "react";
import { Pressable, View, TouchableWithoutFeedback } from "react-native";
import { Text, ScreenContainer, Flex, Button } from "@/components/partials";
import { BottomCaretIcon } from "@/icons";
import { useRouter } from "expo-router";
import BottomSheetMethods from "@gorhom/bottom-sheet";
import { BottomSheetSelector } from "@/components/partials/modules";
import { countries } from "@/utils/static";
import { UserAdapter, useUserMutation } from "@/adapters/UserAdapter";
import { queryKeys } from "@/constants/query-keys";
import { useQueryClient } from "@tanstack/react-query";
import { UpdateProfileHeader } from "@/components/profile";

export default function UpdateCountry() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [country, setCountry] = React.useState("");
  const [countryFocused, setCountryFocused] = React.useState(false);

  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const handleOpenSelector = () => bottomSheetRef.current?.expand();

  const { mutateAsync, isPending } = useUserMutation({
    mutationCallback: UserAdapter.editUserProfile,
  });

  const handleUpdateCountry = async () => {
    try {
      const res = await mutateAsync({ country: country });
      queryClient.invalidateQueries({ queryKey: [queryKeys.USER] });
      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}
      className="flex-1"
    >
      <ScreenContainer>
        <View
          style={{ display: "flex", justifyContent: "space-between", flex: 1 }}
        >
          <UpdateProfileHeader heading="Which country are you from?" />
          <View>
            <TouchableWithoutFeedback
              onPress={() => {
                setCountryFocused(true);
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
                    countryFocused && theme.actionStateStyles.inputFocused,
                  ]}
                >
                  <Flex
                    direction="row"
                    justify="space-between"
                    className="w-full"
                  >
                    <View className="text-soft-black">
                      <Text weight="medium" size={1}>
                        {!country ? "Select Country" : country}
                      </Text>
                    </View>

                    <Pressable onPress={() => handleOpenSelector()}>
                      <BottomCaretIcon />
                    </Pressable>
                  </Flex>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ScreenContainer>
      <View
        style={{
          paddingHorizontal: theme.space[15],
          paddingBottom: unit(50),
        }}
      >
        <Button
          title="Save"
          isLoading={isPending}
          onPress={handleUpdateCountry}
        />
      </View>

      <BottomSheetSelector
        itemList={countries}
        setValue={setCountry}
        value={country}
        title="Select Country"
        placeHolder="Search for Country"
        ref={bottomSheetRef}
      />
    </View>
  );
}
