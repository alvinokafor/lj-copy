import { theme, unit } from "@/constants";
import React from "react";
import {
  Pressable,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { Text, ScreenContainer, Flex } from "@/components/partials";
import { useRouter } from "expo-router";
import {
  HeightMetricsSelector,
  OnboardingHeader,
  OnboardingNextController,
  StepIndicator,
} from "@/components/onboarding";
import { RulerPicker } from "react-native-ruler-picker";
import {
  useOnboardingMutation,
  OnboardingAdapter,
} from "@/adapters/OnboardingAdapter";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

export default function Height() {
  const router = useRouter();
  const [height, setHeight] = React.useState("");
  const [metric, setMetric] = React.useState("ft");
  const [heightFocused, setHeightFocused] = React.useState(false);
  const bottomSheetRef = React.useRef<BottomSheetMethods>(null);

  const { mutateAsync, isPending } = useOnboardingMutation({
    mutationCallback: OnboardingAdapter.setHeight,
  });

  const handleSetHeight = async () => {
    try {
      await mutateAsync({
        height: Number(height),
        metric: metric,
      });
      router.navigate("/(onboarding)/country");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}
      className="flex-1"
    >
      <OnboardingHeader
        heading="What’s your height?"
        subHeading="Height isn’t a major deal, but people will like to know "
        step={5}
      />
      <ScreenContainer>
        <View
          style={{ display: "flex", justifyContent: "space-between", flex: 1 }}
        >
          {/* <View>
            <TouchableWithoutFeedback onPress={() => setHeightFocused(true)}>
              <View>
                <View
                  style={[
                    {
                      paddingTop: theme.space[17],
                      display: "flex",
                      gap: theme.space[20],
                      borderBottomWidth: 1,
                      borderBottomColor: "#B5B5B0",
                      paddingBottom: theme.space[17],
                    },
                    heightFocused && theme.actionStateStyles.inputFocused,
                  ]}
                >
                  <Flex
                    direction="row"
                    justify="space-between"
                    className="w-full"
                  >
                    <View className="text-soft-black">
                      <Text weight="medium" size={1}>
                        {!height ? "Select Height" : height}
                      </Text>
                    </View>

                    <Pressable onPress={() => bottomSheetRef.current?.expand()}>
                      <Text
                        style={{
                          paddingVertical: theme.space[6],
                          paddingHorizontal: theme.space[10],
                          borderRadius: theme.sizes[10],
                        }}
                        weight="medium"
                        className="bg-coffee-100 text-coffee-500"
                      >
                        {metric === "ft" ? "Feet" : "Centimeters"}
                      </Text>
                    </Pressable>
                  </Flex>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View> */}

          <View style={styles.heightTabsContainer}>
            <Pressable
              className={metric === "ft" ? "bg-[#F1DAAE]" : ""}
              style={styles.tabButton}
              onPress={() => setMetric("ft")}
            >
              <Text className="text-[#353531] text-center" weight="semibold">
                Feet
              </Text>
            </Pressable>

            <Pressable
              className={metric === "cm" ? "bg-[#F1DAAE]" : ""}
              style={styles.tabButton}
              onPress={() => setMetric("cm")}
            >
              <Text className="text-[#353531] text-center" weight="semibold">
                Centimeter
              </Text>
            </Pressable>
          </View>

          <View className="w-max mx-auto">
            <RulerPicker
              min={1}
              max={metric === "ft" ? 9 : 500}
              step={metric === "ft" ? 0.01 : 1}
              fractionDigits={2}
              initialValue={0}
              onValueChange={(number) => setHeight(number)}
              // onValueChangeEnd={(number) => console.log(number)}
              unit={metric}
              width={318}
              unitTextStyle={{
                fontSize: 14,
                //@ts-ignore
                fontFamily: "BRSonoma-Medium",
                color: "#696963",
              }}
              valueTextStyle={{
                fontSize: 24,
                //@ts-ignore
                fontFamily: "BRSonoma-Medium",
                color: "#696963",
              }}
              longStepColor="#696963"
              indicatorColor="#9DBA78"
            />
          </View>
        </View>
      </ScreenContainer>
      <OnboardingNextController
        route="/(onboarding)/country"
        canSkip
        isNextButtonDisabled={false}
        isLoading={isPending}
        onPressHandler={handleSetHeight}
      />
      {/* 
      <HeightMetricsSelector
        ref={bottomSheetRef}
        itemList={["ft", "cm"]}
        setValue={setMetric}
        value={metric}
        title="Select Height Unit"
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  heightTabsContainer: {
    borderWidth: 1,
    borderColor: "#E6E6E5",
    paddingHorizontal: unit(9),
    paddingTop: unit(7.5),
    paddingBottom: unit(7.5),
    borderRadius: unit(14),
    display: "flex",
    flexDirection: "row",
  },

  tabButton: {
    paddingTop: unit(9),
    paddingBottom: unit(9),
    borderRadius: unit(9),
    width: "50%",
  },
});
