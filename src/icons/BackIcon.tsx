import * as React from "react";
import Svg, { Path } from "react-native-svg";

const BackIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    {...props}
  >
    <Path
      fill="#1E1E1C"
      fillRule="evenodd"
      d="M18.07 5.168a.875.875 0 0 1 .094 1.235L11.653 14l6.51 7.597a.875.875 0 0 1-1.327 1.139l-7-8.167a.875.875 0 0 1 0-1.138l7-8.167a.875.875 0 0 1 1.233-.095"
      clipRule="evenodd"
    />
  </Svg>
);
export default BackIcon;
