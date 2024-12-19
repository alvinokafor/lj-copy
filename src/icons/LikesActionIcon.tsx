import * as React from "react";
import Svg, { SvgProps, Rect, Path } from "react-native-svg";
const LikesActionIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Rect width={24} height={24} fill="#1E1E1C" rx={12} />
    <Path
      fill="#fff"
      d="M9.664 15.813C7.979 14.515 6 12.99 6 10.347 6 7.43 9.3 5.36 12 8.166l1.2 1.199a.45.45 0 0 0 .636-.636l-1.158-1.16C15.221 5.707 18 7.67 18 10.347c0 2.643-1.979 4.168-3.664 5.466-.176.135-.347.268-.513.399-.623.49-1.223.953-1.823.953-.6 0-1.2-.462-1.823-.954l-.513-.398Z"
    />
  </Svg>
);
export default LikesActionIcon;
