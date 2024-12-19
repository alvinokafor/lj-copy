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
import { UserAdapter, useUserMutation } from "@/adapters/UserAdapter";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants/query-keys";
import { UpdateProfileHeader } from "@/components/profile";

type IDegreeOptions =
  | "PhD"
  | "MBA"
  | "Msc"
  | "Bsc"
  | "High School degree"
  | "None";

const degreeOptions: IDegreeOptions[] = [
  "PhD",
  "MBA",
  "Msc",
  "Bsc",
  "High School degree",
  "None",
];

export default function UpdateDegree() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [degree, setDegree] = React.useState<IDegreeOptions | "">("");

  const { mutateAsync, isPending } = useUserMutation({
    mutationCallback: UserAdapter.editUserProfile,
  });

  const handleUpdateDegree = async () => {
    try {
      const res = await mutateAsync({ degree: degree });
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
          <UpdateProfileHeader heading="What was your highest degree? " />
          <View>
            <FlatList
              data={degreeOptions}
              contentContainerStyle={{
                paddingTop: theme.space[20],
                gap: theme.space[12],
              }}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback
                  onPress={() => setDegree(item)}
                  style={{ marginBottom: theme.space[12] }}
                >
                  <View
                    style={{ borderRadius: theme.sizes[12] }}
                    className={`${
                      degree === item ? "bg-coffee-100" : "bg-grey"
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
                        className="text-soft-black"
                        size={1}
                      >
                        {item}
                      </Text>
                      <Pressable onPress={() => setDegree(item)}>
                        {degree === item ? <CheckedIcon /> : <UncheckedIcon />}
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
          onPress={handleUpdateDegree}
        />
      </View>
    </>
  );
}
