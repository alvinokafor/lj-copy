import React from "react";
import { View, ViewStyle, DimensionValue } from "react-native";
import { styled } from "nativewind";
import { theme } from "@/constants";

type ThemeSpacingKey = keyof typeof theme.space;

interface IFlexProps {
  children: React.ReactNode;

  className?: string;
  /** Additional styles to be applied to the component */
  style?: ViewStyle;
  direction?: "column" | "row";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  align?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  alignContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "stretch"
    | "space-between"
    | "space-around";
  gap?: ThemeSpacingKey;
  flex?: number;
  grow?: number;
  shrink?: number;
  basis?: DimensionValue;
  px?: ThemeSpacingKey;
  py?: ThemeSpacingKey;
  pt?: ThemeSpacingKey;
  pb?: ThemeSpacingKey;
  mx?: ThemeSpacingKey;
  my?: ThemeSpacingKey;
  mt?: ThemeSpacingKey;
  mb?: ThemeSpacingKey;
}

const StyledView = styled(View);

/**
 * A flexible container component that uses flexbox properties to layout its children.
 *
 * @component
 * @example
 * ```tsx
 * <Flex direction="row" justify="center" gap="4">
 *   <View>Item 1</View>
 *   <View>Item 2</View>
 * </Flex>
 * ```
 * @returns {JSX.Element} The rendered Flex component.
 */
export default function Flex({
  children,
  className,
  style,
  direction = "column",
  wrap = "nowrap",
  justify = "flex-start",
  align = "center",
  alignContent,
  gap,
  flex,
  grow,
  shrink,
  basis,
  px = 0,
  py = 0,
  pt = 0,
  pb = 0,
  mx = 0,
  my = 0,
  mt = 0,
  mb = 0,
}: IFlexProps) {
  const flexStyle: ViewStyle = {
    flexDirection: direction,
    flexWrap: wrap,
    justifyContent: justify,
    alignItems: align,
    gap: gap ? theme.space[gap] : 0,
    flex,
    flexGrow: grow,
    flexShrink: shrink,
    flexBasis: basis,
    paddingTop: theme.space[pt],
    paddingBottom: theme.space[pb],
    paddingHorizontal: theme.space[px],
    paddingVertical: theme.space[py],
    marginTop: theme.space[mt],
    marginBottom: theme.space[mb],
    marginHorizontal: theme.space[mx],
    marginVertical: theme.space[my],
  };

  if (alignContent) {
    flexStyle.alignContent = alignContent;
  }

  return (
    <StyledView
      style={[
        flexStyle,
        // {
        //   paddingTop: theme.space[pt],
        //   paddingBottom: theme.space[pb],
        //   paddingHorizontal: theme.space[px],
        //   paddingVertical: theme.space[py],
        //   marginTop: theme.space[mt],
        //   marginBottom: theme.space[mb],
        //   marginHorizontal: theme.space[mx],
        //   marginVertical: theme.space[my],
        // },
        style,
      ]}
      className={className}
    >
      {children}
    </StyledView>
  );
}
