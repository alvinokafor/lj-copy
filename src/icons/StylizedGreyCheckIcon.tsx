import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const StylizedGreyCheckIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#B5B5B0"
      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10 10-4.477 10-10Z"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 12.75s1.6.912 2.4 2.25c0 0 2.4-5.25 5.6-7"
    />
  </Svg>
);
export default StylizedGreyCheckIcon;
