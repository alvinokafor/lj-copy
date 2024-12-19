import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const StylizedCircledCheckIcon = (props: SvgProps) => (
  <Svg width={14} height={14} fill="none" {...props}>
    <Path
      fill="#422618"
      d="M13.667 7A6.666 6.666 0 1 0 .334 7a6.666 6.666 0 0 0 13.333 0Z"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.333 7.5s1.067.608 1.6 1.5c0 0 1.6-3.5 3.734-4.667"
    />
  </Svg>
);
export default StylizedCircledCheckIcon;
