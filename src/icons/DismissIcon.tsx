import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const DismissIcon = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path
      fill="#1E1E1C"
      fillRule="evenodd"
      d="M14.667 8A6.667 6.667 0 1 1 1.334 8a6.667 6.667 0 0 1 13.333 0ZM5.98 5.98a.5.5 0 0 1 .707 0L8 7.293 9.313 5.98a.5.5 0 0 1 .707.706L8.707 8l1.313 1.313a.5.5 0 0 1-.707.707L8 8.706 6.687 10.02a.5.5 0 0 1-.707-.707L7.293 8 5.98 6.686a.5.5 0 0 1 0-.706Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default DismissIcon;
