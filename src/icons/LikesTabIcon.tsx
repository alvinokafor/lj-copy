import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const SvgComponent = (props: SvgProps) => (
  <Svg width={25} height={24} fill="none" {...props}>
    <Path
      fill={props.color}
      d="M8.606 18.247C5.798 16.083 2.5 13.542 2.5 9.137 2.5 4.274 8 .825 12.5 5.5l2 1.998a.75.75 0 0 0 1.06-1.06l-1.93-1.933c4.239-3.103 8.87.169 8.87 4.63 0 4.406-3.298 6.947-6.106 9.11-.293.225-.579.447-.856.665C14.5 19.729 13.5 20.5 12.5 20.5s-2-.77-3.038-1.59c-.278-.218-.563-.439-.856-.663Z"
    />
  </Svg>
);
export default SvgComponent;
