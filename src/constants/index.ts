import { Dimensions, StyleSheet } from "react-native";

export const PAGE_WIDTH = Dimensions.get("window").width;
export const PAGE_HEIGHT = Dimensions.get("window").height;

export const screenMetrics = {
  width: PAGE_WIDTH < PAGE_HEIGHT ? PAGE_WIDTH : PAGE_HEIGHT,
  height: PAGE_WIDTH < PAGE_HEIGHT ? PAGE_WIDTH : PAGE_WIDTH,
};

export function unit(value: number): number {
  const unit = screenMetrics.width * (value / 393);
  return unit;
}

export const dimensions = {
  0: 0,
  1: unit(1),
  2: unit(2),
  3: unit(3),
  4: unit(4),
  5: unit(5),
  6: unit(6),
  7: unit(7),
  8: unit(8),
  9: unit(9),
  10: unit(10),
  11: unit(11),
  12: unit(12),
  13: unit(13),
  14: unit(14),
  15: unit(15),
  16: unit(16),
  17: unit(17),
  18: unit(18),
  20: unit(20),
  21: unit(21),
  22: unit(22),
  23: unit(23),
  24: unit(24),
  25: unit(25),
  28: unit(28),
  31: unit(31),
  32: unit(32),
  37: unit(37),
  40: unit(40),
  42: unit(42),
  43: unit(43),
  44: unit(44),
  46: unit(46),
  48: unit(48),
  56: unit(56),
  58: unit(58),
  80: unit(80),
  180: unit(180),
};

export const theme = {
  sizes: dimensions,
  space: dimensions,
  fontSize: {
    0: screenMetrics.width * (12 / 393), //font size 12px
    1: screenMetrics.width * (14 / 393), //font size 14px
    2: screenMetrics.width * (16 / 393), // font size 16px
    3: screenMetrics.width * (18 / 393), // font size 18px
    4: screenMetrics.width * (24 / 393), // font size 24px
    5: screenMetrics.width * (28 / 393), // font size 28px
    6: screenMetrics.width * (32 / 393), // font size 32px
    7: screenMetrics.width * (40 / 393), // font size 40px
    8: screenMetrics.width * (48 / 393), // font size 48px
    20: screenMetrics.width * (20 / 393), // font size 20px
    10: screenMetrics.width * (10 / 393), // font size 10px
  },
  actionStateStyles: StyleSheet.create({
    buttonEnabledCoffee500: {
      backgroundColor: "#422618",
    },
    buttonEnabledCoffee100: {
      backgroundColor: "#FBF5E9",
    },
    buttonEnabledCoffee50: {
      backgroundColor: "#F8F0EC",
    },
    buttonDisabled: {
      backgroundColor: "#B5B5B0",
    },
    buttonTextEnabled: {
      color: "#FFFFFF",
    },
    buttonTextDisabled: {
      color: "#696963",
    },
    inputFocused: {
      borderBottomColor: "#F1DAAE",
    },
  }),
  colors: {
    softBlack: "#1e1e1c",
    lightGrey: "#9C9C96",
  },
};

export enum queryKeys {
  USER = "USER",
}
