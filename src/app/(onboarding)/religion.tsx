import { theme } from "@/constants";
import React from "react";
import {
  FlatList,
  Pressable,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Text, ScreenContainer, Flex } from "@/components/partials";
import { CheckedIcon, UncheckedIcon } from "@/icons";
import { useRouter } from "expo-router";
import { OnboardingNextController } from "@/components/onboarding";
import {
  useOnboardingMutation,
  OnboardingAdapter,
} from "@/adapters/OnboardingAdapter";

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
  const [religion, setReligion] = React.useState<IReligionOptions | "">("");

  const { mutateAsync, isPending } = useOnboardingMutation({
    mutationCallback: OnboardingAdapter.setReligion,
  });

  const handleSetReligion = async () => {
    try {
      await mutateAsync({
        religion,
      });
      router.navigate("/(onboarding)/job");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <ScreenContainer>
        <View
          style={{ display: "flex", justifyContent: "space-between", flex: 1 }}
        >
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
      <OnboardingNextController
        route="/(onboarding)/job"
        canSkip
        isNextButtonDisabled={false}
        isLoading={isPending}
        onPressHandler={handleSetReligion}
      />
    </>
  );
}
