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

type IOptions = "Very Often" | "Sometimes" | "Not Often";

const options: IOptions[] = ["Very Often", "Sometimes", "Not Often"];

export default function TraditionalFoodAndAttire() {
  const router = useRouter();
  const [reply, setReply] = React.useState<IOptions | "">("");

  const { mutateAsync, isPending } = useSpecMutation({
    mutationCallback: SpecAdapter.setupTraditionalFoodOrAttire,
  });

  const handleSetupTraditionalFoodOrAttire = async () => {
    try {
      await mutateAsync({
        traditional: reply,
      });
      router.navigate("/(spec-onboarding)/cultural-heritage");
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
              data={options}
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
        route="/(spec-onboarding)/cultural-heritage"
        canSkip={false}
        isNextButtonDisabled={false}
        onPressHandler={() => handleSetupTraditionalFoodOrAttire()}
        isLoading={isPending}
      />
    </>
  );
}
