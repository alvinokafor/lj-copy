import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const SearchIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#000"
      strokeWidth={1.5}
      d="M11.5 21a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19Z"
    />
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M18.5 18.5 22 22"
    />
  </Svg>
);
export default SearchIcon;
