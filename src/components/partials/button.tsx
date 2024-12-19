import { theme } from "@/constants";
import React from "react";
import {
  Pressable,
  PressableProps,
  ViewStyle,
  TextStyle,
  DimensionValue,
  ActivityIndicator,
  View,
} from "react-native";
import Text from "./text";

type ThemeSpacingKey = keyof typeof theme.space;

interface ButtonProps extends PressableProps {
  /** The text to display inside the button */
  title: string;
  /** Additional styles for the button container */
  style?: ViewStyle;
  /** Styles for the button text */
  titleStyle?: TextStyle;
  /** Whether the button is in a loading state */
  isLoading?: boolean;
  /** Text to display when the button is in a loading state */
  weight?:
    | "bold"
    | "normal"
    | "semibold"
    | "thin"
    | "regular"
    | "light"
    | "medium";
  backgroundColor?: string;
  flexBasis?: DimensionValue;
  flex?: number;
  px?: ThemeSpacingKey;
  py?: ThemeSpacingKey;
  color?: string;
  /** Icon to display before the title */
  iconLeft?: React.ReactNode;
  /** Icon to display after the title */
  iconRight?: React.ReactNode;
  /** Configuration for icon positioning and styling */
  iconProps?: {
    /** Space between icon and text */
    gap?: number;
    /** Style for the icon container */
    style?: ViewStyle;
  };
}

export default function Button({
  title,
  style,
  titleStyle,
  isLoading = false,
  weight = "regular",
  backgroundColor = "#422618",
  flexBasis,
  flex,
  px = 24,
  py = 16,
  color = "#fff",
  iconLeft,
  iconRight,
  iconProps = { gap: 8 },
  ...pressableProps
}: ButtonProps) {
  return (
    <Pressable
      style={[
        {
          borderRadius: theme.space[12],
          paddingVertical: theme.space[py],
          paddingHorizontal: theme.space[px],
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: backgroundColor,
          flexBasis: flexBasis,
          flexDirection: "row",
        },
        style,
      ]}
      disabled={isLoading}
      {...pressableProps}
      className=" active:opacity-90 "
    >
      {/* Left Icon */}
      {iconLeft && !isLoading && (
        <View style={[{ marginRight: iconProps.gap }, iconProps.style]}>
          {iconLeft}
        </View>
      )}
      <Text
        size={1}
        className="text-center"
        weight={weight}
        style={[{ color: color }, titleStyle]}
      >
        {!isLoading ? title : <ActivityIndicator size={"small"} />}
      </Text>

      {/* Right Icon */}
      {iconRight && !isLoading && (
        <View style={[{ marginLeft: iconProps.gap }, iconProps.style]}>
          {iconRight}
        </View>
      )}
    </Pressable>
  );
}
