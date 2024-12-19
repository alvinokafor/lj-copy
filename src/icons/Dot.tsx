import * as React from "react";
import Svg, { Circle } from "react-native-svg";

const Dot = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={9}
    height={8}
    fill="none"
    {...props}
  >
    <Circle cx={4.5} cy={4} r={4} fill="#F3F3F2" />
  </Svg>
);
export default Dot;
