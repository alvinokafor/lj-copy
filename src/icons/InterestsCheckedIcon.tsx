import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const InterestsCheckedIcon = (props: SvgProps) => (
  <Svg width={15} height={14} fill="none" {...props}>
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M14.5 7a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-4.179-2.121a.525.525 0 0 1 0 .742l-3.5 3.5a.525.525 0 0 1-.742 0l-1.4-1.4a.525.525 0 1 1 .742-.742L6.45 8.008l1.564-1.564L9.58 4.879a.525.525 0 0 1 .742 0Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default InterestsCheckedIcon;
