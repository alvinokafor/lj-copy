import * as React from "react";
import Svg, { SvgProps, Rect, Path } from "react-native-svg";
const SuperLikesActionIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Rect width={24} height={24} fill="#1E1E1C" rx={12} />
    <Path
      fill="#F3F3F2"
      d="M15 12.858c-1.65-1.81-3.666-.475-3.666 1.408 0 1.707 1.209 2.69 2.238 3.528l.03.024.284.233c.381.317.748.616 1.114.616.367 0 .734-.299 1.114-.616 1.079-.898 2.553-1.902 2.553-3.785 0-.618-.217-1.178-.569-1.587-.716-.834-1.99-1.037-3.098.18Z"
    />
    <Path
      fill="#F3F3F2"
      d="M9.404 16.164c-1.872-1.442-4.07-3.136-4.07-6.073C5.333 6.849 9 4.55 12 7.667c3-3.117 6.666-.818 6.666 2.424 0 .556-.078 1.067-.219 1.54A2.8 2.8 0 0 0 16.701 11c-.593-.004-1.172.182-1.702.54-.927-.622-1.97-.706-2.886-.264-1.09.527-1.78 1.704-1.78 2.99 0 1.537.766 2.615 1.562 3.396-.633-.05-1.265-.538-1.92-1.055a55.2 55.2 0 0 0-.571-.443Z"
    />
  </Svg>
);
export default SuperLikesActionIcon;
