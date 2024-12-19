import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const StylizedCheckedIcon = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path
      fill="#E6E6E5"
      d="M0 8c0-3.771 0-5.657 1.171-6.829C2.343 0 4.228 0 8 0c3.77 0 5.657 0 6.829 1.171C16 2.343 16 4.228 16 8c0 3.77 0 5.657-1.171 6.829C13.657 16 11.772 16 8 16c-3.771 0-5.657 0-6.829-1.171C0 13.657 0 11.772 0 8Z"
    />
    <Path
      stroke="#B5B5B0"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4.632 9.474s1.347.768 2.02 1.894c0 0 2.022-4.42 4.716-5.894"
    />
  </Svg>
);
export default StylizedCheckedIcon;
