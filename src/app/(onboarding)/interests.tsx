import { theme } from "@/constants";
import React from "react";
import { Pressable, View, ScrollView, StyleSheet } from "react-native";
import { Text, ScreenContainer, Flex } from "@/components/partials";
import { InterestsCheckedIcon } from "@/icons";
import { OnboardingNextController } from "@/components/onboarding";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { diasporaInvolvementList } from "@/utils/static";
import { useRouter } from "expo-router";
import {
  OnboardingAdapter,
  useOnboardingMutation,
} from "@/adapters/OnboardingAdapter";

export default function Interests() {
  const router = useRouter();
  const [diasporaInvolvement, setDiasporaInvolvement] = React.useState<
    string[]
  >([]);

  const { mutateAsync, isPending } = useOnboardingMutation({
    mutationCallback: OnboardingAdapter.setInterests,
  });

  const handleSetInterests = async () => {
    try {
      await mutateAsync({
        diasporaInvolvement,
      });
      router.navigate("/(onboarding)/upload-photos");
    } catch (e) {
      console.log(e);
    }
  };

  const handleToggleDiasporaInvolvement = (interest: string) => {
    setDiasporaInvolvement((prevState) => {
      if (prevState.includes(interest)) {
        return prevState.filter((item) => item !== interest);
      }

      return [...prevState, interest];
    });
  };

  return (
    <>
      <ScreenContainer>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flex: 1,
            paddingBottom: 100,
          }}
        >
          <View>
            <View style={{ gap: theme.space[21] }} className="flex">
              <View
                style={{
                  paddingBottom: theme.space[21],
                }}
              >
                <View
                  style={{
                    padding: theme.space[18],
                    borderRadius: theme.sizes[13],
                    backgroundColor: "#F3F3F2",
                  }}
                >
                  <View>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                      {diasporaInvolvementList.map((item) => (
                        <InterestItem
                          key={item}
                          interestList={diasporaInvolvement}
                          interest={item}
                          handleToggleInterest={handleToggleDiasporaInvolvement}
                        />
                      ))}
                    </ScrollView>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScreenContainer>
      <OnboardingNextController
        route="/(onboarding)/upload-photos"
        canSkip
        isNextButtonDisabled={false}
        isLoading={isPending}
        onPressHandler={handleSetInterests}
      />
    </>
  );
}

function InterestItem({
  interestList,
  interest,
  handleToggleInterest,
}: {
  interestList: string[];
  interest: string;
  handleToggleInterest: (interest: string) => void;
}) {
  return (
    <TouchableWithoutFeedback
      onPress={() => handleToggleInterest(interest)}
      key={interest}
    >
      <View
        style={{ borderRadius: theme.sizes[12] }}
        className={`${
          interestList.includes(interest) ? "bg-soft-black" : " bg-[#E6E6E5]"
        }`}
      >
        <Flex
          px={15}
          direction="row"
          justify="space-between"
          className="w-max"
          pt={11}
          pb={11}
          gap={5}
        >
          <Text
            weight="medium"
            className={`${
              interestList.includes(interest)
                ? "text-white"
                : " text-soft-black"
            } capitalize`}
            size={1}
          >
            {interest}
          </Text>
          {interestList.includes(interest) && (
            <Pressable>
              <InterestsCheckedIcon />
            </Pressable>
          )}
        </Flex>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: theme.space[20],
    gap: theme.space[8],
  },
});
