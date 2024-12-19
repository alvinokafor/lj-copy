import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
const OverlayLabel = ({
  inputRange,
  outputRange,
  Component,
  opacityValue
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(opacityValue.value, inputRange ?? [], outputRange ?? [], 'clamp'),
      zIndex: 2
    };
  });
  return /*#__PURE__*/React.createElement(Animated.View, {
    style: [StyleSheet.absoluteFillObject, animatedStyle],
    pointerEvents: "none"
  }, /*#__PURE__*/React.createElement(Component, null));
};
export default OverlayLabel;
//# sourceMappingURL=OverlayLabel.js.map