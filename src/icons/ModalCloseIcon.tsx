import * as React from "react";
import Svg, { Circle, Path, SvgProps } from "react-native-svg";

const ModalCloseIcon = (props: SvgProps) => (
  <Svg width={28} height={28} fill="none" {...props}>
    <Circle cx={14} cy={14} r={14} fill="#F3F3F2" />
    <Path
      stroke="#1E1E1C"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19.597 9.334 9.333 19.596m0-10.264 10.264 10.264"
    />
  </Svg>
);
export default ModalCloseIcon;
