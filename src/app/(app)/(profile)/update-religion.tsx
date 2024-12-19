import { theme, unit } from "@/constants";
import React from "react";
import {
  FlatList,
  Pressable,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Text, ScreenContainer, Flex, Button } from "@/components/partials";
import { CheckedIcon, UncheckedIcon } from "@/icons";
import { useRouter } from "expo-router";
import { UpdateProfileHeader } from "@/components/profile";
import { UserAdapter, useUserMutation } from "@/adapters/UserAdapter";
import { queryKeys } from "@/constants/query-keys";
import { useQueryClient } from "@tanstack/react-query";

type IReligionOptions =
  | "Christianity"
  | "Islam"
  | "Atheist (Not Religious)"
  | "Traditional"
  | "Hinduism"
  | "Judaism"
  | "Rastafarianism"
  | "Baháʼí Faith";

const religionOptions: IReligionOptions[] = [
  "Christianity",
  "Islam",
  "Atheist (Not Religious)",
  "Traditional",
  "Hinduism",
  "Judaism",
  "Rastafarianism",
  "Baháʼí Faith",
];

export default function Religion() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [religion, setReligion] = React.useState<IReligionOptions | "">("");

  const { mutateAsync, isPending } = useUserMutation({
    mutationCallback: UserAdapter.editUserProfile,
  });

  const handleUpdateLanguage = async () => {
    try {
      await mutateAsync({ religion: religion });
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
          <UpdateProfileHeader heading="What religion do you practice?" />
          <View>
            <FlatList
              data={religionOptions}
              contentContainerStyle={{
                paddingTop: theme.space[20],
                gap: theme.space[12],
              }}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback
                  onPress={() => setReligion(item)}
                  style={{ marginBottom: theme.space[12] }}
                >
                  <View
                    style={{ borderRadius: theme.sizes[12] }}
                    className={`${
                      religion === item ? "bg-coffee-100" : "bg-grey"
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
                      <Pressable onPress={() => setReligion(item)}>
                        {religion === item ? (
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
          onPress={handleUpdateLanguage}
        />
      </View>
    </>
  );
}
