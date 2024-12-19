import { theme, unit } from "@/constants";
import React from "react";
import { View, TextInput } from "react-native";
import { Text, ScreenContainer, Flex, Button } from "@/components/partials";
import { UserAdapter, useUserMutation } from "@/adapters/UserAdapter";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants/query-keys";
import { UpdateProfileHeader } from "@/components/profile";
import { useRouter } from "expo-router";

export default function UpdateBio() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [about, setAbout] = React.useState("");
  const [aboutFocused, setAboutFocused] = React.useState(false);
  const [numOfLines, setNumOfLines] = React.useState(0);

  const { mutateAsync, isPending } = useUserMutation({
    mutationCallback: UserAdapter.editUserProfile,
  });

  const handleUpdateBio = async () => {
    try {
      const res = await mutateAsync({ about: about });
      console.log(res);
      queryClient.invalidateQueries({ queryKey: [queryKeys.USER] });
      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  const setLines = (text: string) => {
    if (text) {
      //calculate how many lines
      const lines = text.split("\n").length;
      console.log(`total lines count: ${lines}`);
      setNumOfLines(Math.min(5, lines));
    }
  };

  React.useEffect(() => {
    setLines(about);
  }, []);

  return (
    <>
      <ScreenContainer>
        <View
          style={{ display: "flex", justifyContent: "space-between", flex: 1 }}
        >
          <UpdateProfileHeader
            heading="Tell people about yourself "
            subHeading="Give a summary about yourself"
          />
          <View>
            <View
              style={{
                paddingTop: theme.space[20],
                display: "flex",
                gap: theme.space[20],
              }}
            >
              <Flex align="flex-start" gap={4} className="w-full">
                {aboutFocused && (
                  <Text className="text-[#696963]" weight="medium" size={0}>
                    About me
                  </Text>
                )}
                <TextInput
                  style={[
                    {
                      borderBottomWidth: 1,
                      borderBottomColor: "#B5B5B0",
                      paddingBottom: theme.space[8],
                      fontFamily: "BRSonoma-Medium",
                      textAlignVertical: "top",
                    },
                    aboutFocused && theme.actionStateStyles.inputFocused,
                  ]}
                  onChangeText={setAbout}
                  value={about}
                  placeholder={!aboutFocused ? "About me" : ""}
                  className="text-soft-black w-full"
                  onFocus={() => setAboutFocused(true)}
                  onBlur={() => setAboutFocused(false)}
                  multiline
                  numberOfLines={numOfLines}
                />
              </Flex>
            </View>
          </View>
        </View>
      </ScreenContainer>
      <View
        style={{
          paddingHorizontal: theme.space[15],
          paddingBottom: unit(50),
        }}
      >
        <Button title="Save" isLoading={isPending} onPress={handleUpdateBio} />
      </View>
    </>
  );
}
