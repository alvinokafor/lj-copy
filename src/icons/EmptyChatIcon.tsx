import * as React from "react";
import Svg, { SvgProps, Rect, Path } from "react-native-svg";
const EmptyChatIcon = (props: SvgProps) => (
  <Svg width={73} height={72} fill="none" {...props}>
    <Rect width={72} height={72} x={0.5} fill="#F8F0EC" rx={36} />
    <Path
      fill="#422618"
      d="M36.5 52.5C45.613 52.5 53 45.113 53 36s-7.387-16.5-16.5-16.5S20 26.887 20 36c0 2.64.62 5.135 1.72 7.347.295.588.392 1.26.222 1.895l-.982 3.672a2.145 2.145 0 0 0 2.625 2.627l3.673-.983a2.69 2.69 0 0 1 1.896.22A16.434 16.434 0 0 0 36.5 52.5Z"
    />
  </Svg>
);
export default EmptyChatIcon;
