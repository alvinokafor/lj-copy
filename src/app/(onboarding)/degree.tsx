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

export default function Degree() {
  const router = useRouter();
  const [degree, setDegree] = React.useState<IDegreeOptions | "">("");

  const { mutateAsync, isPending } = useOnboardingMutation({
    mutationCallback: OnboardingAdapter.setDegree,
  });

  const handleSetDegree = async () => {
    try {
      await mutateAsync({
        degree,
      });
      router.navigate("/(onboarding)/about");
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
      <OnboardingNextController
        route="/(onboarding)/about"
        canSkip
        isNextButtonDisabled={false}
        isLoading={isPending}
        onPressHandler={handleSetDegree}
      />
    </>
  );
}
