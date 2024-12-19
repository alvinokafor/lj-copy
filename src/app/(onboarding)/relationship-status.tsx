import { theme } from "@/constants";
import React from "react";
import {
  FlatList,
  Pressable,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Text, ScreenContainer, Flex, Button } from "@/components/partials";
import { BackIcon, CheckedIcon, UncheckedIcon } from "@/icons";
import { useRouter } from "expo-router";
import {
  StepIndicator,
  OnboardingNextController,
} from "@/components/onboarding";
import {
  useOnboardingMutation,
  OnboardingAdapter,
} from "@/adapters/OnboardingAdapter";

type IRelationshipStatus =
  | "single"
  | "divorced"
  | "widowed"
  | "seperated"
  | "married";

const relationshipStatusOptions: IRelationshipStatus[] = [
  "single",
  "divorced",
  "widowed",
  "seperated",
];

export default function RelationshipStatus() {
  const router = useRouter();
  const [relationshipStatus, setRelationshipStatus] = React.useState<
    IRelationshipStatus | ""
  >("");

  const { mutateAsync, isPending } = useOnboardingMutation({
    mutationCallback: OnboardingAdapter.setRelationshipStatus,
  });

  const handleSetRelationshipStatus = async () => {
    try {
      await mutateAsync({
        relationshipType: relationshipStatus,
      });
      router.navigate("/(onboarding)/height");
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
              data={relationshipStatusOptions}
              contentContainerStyle={{
                paddingTop: theme.space[20],
                gap: theme.space[12],
              }}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback
                  onPress={() => setRelationshipStatus(item)}
                  style={{ marginBottom: theme.space[12] }}
                >
                  <View
                    style={{ borderRadius: theme.sizes[12] }}
                    className={`${
                      relationshipStatus === item ? "bg-coffee-100" : "bg-grey"
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
                        {item === "single" ? "Single (Never Married)" : item}
                      </Text>
                      <Pressable onPress={() => setRelationshipStatus(item)}>
                        {relationshipStatus === item ? (
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
        route="/(onboarding)/height"
        canSkip={true}
        isNextButtonDisabled={false}
        isLoading={isPending}
        onPressHandler={handleSetRelationshipStatus}
      />
    </>
  );
}
