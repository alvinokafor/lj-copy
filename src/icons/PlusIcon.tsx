import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const PlusIcon = (props: SvgProps) => (
  <Svg width={25} height={24} fill="none" {...props}>
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12.5 4v16m8-8h-16"
    />
  </Svg>
);
export default PlusIcon;
