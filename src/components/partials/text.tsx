import React from "react";
import {
  Text as ReactNativeText,
  TextProps as ReactNativeTextProps,
  StyleProp,
  TextStyle,
} from "react-native";
import { styled } from "nativewind";
import { theme, unit } from "@/constants";

type FontFamily = "BRSonoma" | "Merchant";

interface ITextProps extends ReactNativeTextProps {
  children: React.ReactNode;
  className?: string;
  fontFamily?: FontFamily;
  weight?:
    | "bold"
    | "normal"
    | "semibold"
    | "thin"
    | "regular"
    | "light"
    | "medium";
  style?: StyleProp<TextStyle>;
  size?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 20 | 10;
}

const StyledText = styled(ReactNativeText);

export default function Text({
  children,
  className,
  fontFamily = "BRSonoma",
  weight = "regular",
  style,
  size = 1,
  ...rest
}: ITextProps) {
  const capitalizedFontWeight =
    weight.charAt(0).toUpperCase() + weight.slice(1);

  return (
    <StyledText
      style={[
        {
          fontFamily: `${fontFamily}-${capitalizedFontWeight}`,
          fontSize: theme.fontSize[size],
        },
        style,
      ]}
      className={className}
      {...rest} // Spread remaining native text props here
    >
      {children}
    </StyledText>
  );
}
