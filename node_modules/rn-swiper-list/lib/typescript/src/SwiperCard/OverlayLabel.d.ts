import React, { type PropsWithChildren } from 'react';
import { type SharedValue } from 'react-native-reanimated';
type Props = PropsWithChildren<{
    inputRange?: number[];
    outputRange?: number[];
    Component: () => JSX.Element;
    opacityValue: SharedValue<number>;
}>;
declare const OverlayLabel: ({ inputRange, outputRange, Component, opacityValue, }: Props) => React.JSX.Element;
export default OverlayLabel;
//# sourceMappingURL=OverlayLabel.d.ts.map