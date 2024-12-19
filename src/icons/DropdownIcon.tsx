import * as React from "react";
import Svg, { Path } from "react-native-svg";

const DropdownIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#696963"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M18 9s-4.419 6-6 6c-1.581 0-6-6-6-6"
    />
  </Svg>
);
export default DropdownIcon;
