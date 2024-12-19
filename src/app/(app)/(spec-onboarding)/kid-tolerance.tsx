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
import { SpecAdapter, useSpecMutation } from "@/adapters/SpecAdapter";

type IKidToleranceOptions =
  | "None"
  | "1 Child"
  | "2 Children"
  | "3 Children"
  | "5 Children or More";

const kidToleranceOptions: IKidToleranceOptions[] = [
  "None",
  "1 Child",
  "2 Children",
  "3 Children",
  "5 Children or More",
];

export default function KidTolerance() {
  const router = useRouter();
  const [reply, setReply] = React.useState<IKidToleranceOptions | "">("");

  const { mutateAsync, isPending } = useSpecMutation({
    mutationCallback: SpecAdapter.setupChildren,
  });

  const handleSetupChildren = async () => {
    try {
      await mutateAsync({
        children: reply,
      });
      router.navigate("/(spec-onboarding)/traditional-family-roles");
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
              data={kidToleranceOptions}
              contentContainerStyle={{
                paddingTop: theme.space[20],
                gap: theme.space[12],
              }}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback
                  onPress={() => setReply(item)}
                  style={{ marginBottom: theme.space[12] }}
                >
                  <View
                    style={{ borderRadius: theme.sizes[12] }}
                    className={`${
                      reply === item ? "bg-coffee-100" : "bg-grey"
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
                      <Pressable onPress={() => setReply(item)}>
                        {reply === item ? <CheckedIcon /> : <UncheckedIcon />}
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
        route="/(spec-onboarding)/traditional-family-roles"
        canSkip={false}
        isNextButtonDisabled={false}
        onPressHandler={() => handleSetupChildren()}
        isLoading={isPending}
      />
    </>
  );
}
