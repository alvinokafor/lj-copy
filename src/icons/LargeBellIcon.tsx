import * as React from "react";
import Svg, { Rect, Path, SvgProps } from "react-native-svg";
const SvgComponent = (props: SvgProps) => (
  <Svg width={88} height={89} fill="none" {...props}>
    <Rect width={88.002} height={88} y={0.5} fill="#F7EBD4" rx={44} />
    <Path
      fill="#E1AF51"
      d="M34.777 65.34A11.708 11.708 0 0 0 44 69.787a11.708 11.708 0 0 0 9.225-4.445 68.778 68.778 0 0 1-18.45 0Z"
    />
    <Path
      fill="#E1AF51"
      fillRule="evenodd"
      d="M61.07 38.694v-1.78c0-9.776-7.644-17.701-17.068-17.701-9.425 0-17.07 7.925-17.07 17.701v1.78c0 2.137-.606 4.226-1.75 6.003l-2.801 4.357c-2.556 3.98-.604 9.39 3.844 10.646a65.242 65.242 0 0 0 35.554 0c4.448-1.256 6.4-6.665 3.843-10.646l-2.801-4.357a11.125 11.125 0 0 1-1.75-6.003ZM44.003 27.431a1.897 1.897 0 0 1 1.896 1.897v10.115a1.896 1.896 0 1 1-3.793 0V29.328a1.897 1.897 0 0 1 1.897-1.897Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgComponent;
