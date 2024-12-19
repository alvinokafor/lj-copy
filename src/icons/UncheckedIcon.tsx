import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const UncheckedIcon = (props: SvgProps) => (
  <Svg width={22} height={22} fill="none" {...props}>
    <Path
      stroke="#1E1E1C"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11 21c5.523 0 10-4.477 10-10S16.523 1 11 1 1 5.477 1 11s4.477 10 10 10Z"
    />
  </Svg>
);
export default UncheckedIcon;
