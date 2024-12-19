import { theme, unit } from "@/constants";
import React from "react";
import { View, TextInput } from "react-native";
import { Text, ScreenContainer, Flex, Button } from "@/components/partials";
import { useRouter } from "expo-router";
import { UserAdapter, useUserMutation } from "@/adapters/UserAdapter";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants/query-keys";
import { UpdateProfileHeader } from "@/components/profile";

export default function UpdateJob() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [job, setJob] = React.useState("");
  const [jobFocused, setJobFocused] = React.useState(false);

  const { mutateAsync, isPending } = useUserMutation({
    mutationCallback: UserAdapter.editUserProfile,
  });

  const handleUpdateJob = async () => {
    try {
      const res = await mutateAsync({ job: job });
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
          <UpdateProfileHeader
            heading="What job do you do?"
            subHeading="It is completely okay not to say, but it can plus for you."
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
                {jobFocused && (
                  <Text className="text-[#696963]" weight="medium" size={0}>
                    Job Title
                  </Text>
                )}
                <TextInput
                  style={[
                    {
                      borderBottomWidth: 1,
                      borderBottomColor: "#B5B5B0",
                      paddingBottom: theme.space[8],
                      fontFamily: "BRSonoma-Medium",
                    },
                    jobFocused && theme.actionStateStyles.inputFocused,
                  ]}
                  onChangeText={setJob}
                  value={job}
                  placeholder={!jobFocused ? "Job Title" : ""}
                  className="text-soft-black w-full"
                  onFocus={() => setJobFocused(true)}
                  onBlur={() => setJobFocused(false)}
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
        <Button title="Save" isLoading={isPending} onPress={handleUpdateJob} />
      </View>
    </>
  );
}
