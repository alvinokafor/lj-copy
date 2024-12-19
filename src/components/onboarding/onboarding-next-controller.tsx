import React from "react";
import { Button, Flex } from "../partials";
import { useRouter, Routes } from "expo-router";
import { theme } from "@/constants";

export default function OnboardingNextController({
  route,
  canSkip,
  isNextButtonDisabled,
  onPressHandler,
  isLoading,
  buttonTitle = "Next",
}: {
  route?: Routes;
  canSkip: boolean;
  isNextButtonDisabled: boolean;
  onPressHandler?: () => void;
  isLoading?: boolean;
  buttonTitle?: string;
}) {
  const router = useRouter();
  return (
    <Flex
      direction="row"
      justify={canSkip ? "space-between" : "flex-end"}
      className="w-full absolute bottom-0 bg-white"
      style={{
        paddingHorizontal: theme.space[16],
        paddingBottom: theme.space[32],
        paddingTop: theme.space[14],
      }}
    >
      {canSkip && (
        <Button
          className="w-1/2"
          title="Skip"
          backgroundColor="#fff"
          color="#422618"
          onPress={() => router.push(route!)}
          titleStyle={{ alignSelf: "flex-start" }}
        />
      )}
      <Button
        className={`${canSkip ? "w-[50%] self-end" : "w-[100%]"}`}
        isLoading={isLoading}
        title={buttonTitle}
        onPress={() => {
          onPressHandler && onPressHandler();
        }}
        style={{
          ...(!isNextButtonDisabled
            ? theme.actionStateStyles.buttonEnabledCoffee500
            : theme.actionStateStyles.buttonDisabled),
          width: canSkip ? "50%" : "100%",
        }}
        titleStyle={
          !isNextButtonDisabled
            ? theme.actionStateStyles.buttonTextEnabled
            : theme.actionStateStyles.buttonTextDisabled
        }
        disabled={isNextButtonDisabled}
      />
    </Flex>
  );
}
