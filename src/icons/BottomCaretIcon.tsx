import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const BottomCaretIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#1E1E1C"
      fillRule="evenodd"
      d="M4.43 8.512a.75.75 0 0 1 1.058-.081L12 14.01l6.512-5.58a.75.75 0 0 1 .976 1.138l-7 6a.75.75 0 0 1-.976 0l-7-6a.75.75 0 0 1-.08-1.057"
      clipRule="evenodd"
    />
  </Svg>
);
export default BottomCaretIcon;
