import * as React from "react";
import Svg, { SvgProps, Rect, Path } from "react-native-svg";
const LikesIllustration = (props: SvgProps) => (
  <Svg width={73} height={72} fill="none" {...props}>
    <Rect width={72.002} height={72} x={0.499} fill="#FBF5E9" rx={36} />
    <Path
      fill="#E1AF51"
      d="M28.712 48.71C23.096 44.38 16.5 39.3 16.5 30.49c0-9.727 11-16.625 20-7.273l4 3.996a1.5 1.5 0 0 0 2.12-2.12l-3.86-3.866c8.478-6.206 17.74.338 17.74 9.262 0 8.81-6.596 13.892-12.212 18.22-.587.45-1.157.892-1.712 1.328-2.076 1.636-4.076 3.178-6.076 3.178s-4-1.54-6.076-3.18c-.556-.434-1.127-.877-1.712-1.326Z"
    />
  </Svg>
);
export default LikesIllustration;
