import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#1E1E1C"
      fillRule="evenodd"
      d="M8.512 4.43a.75.75 0 0 1 1.057.082l6 7a.75.75 0 0 1 0 .976l-6 7a.75.75 0 0 1-1.138-.976L14.012 12 8.431 5.488a.75.75 0 0 1 .08-1.057"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgComponent;
