import * as React from "react";
import Svg, { Rect, Path, SvgProps } from "react-native-svg";
const AddImageTitleIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Rect width={24} height={24} fill="#fff" rx={12} />
    <Path
      fill="#1E1E1C"
      d="M12 18.363a6.363 6.363 0 1 0-5.7-3.53c.113.227.15.486.085.731l-.378 1.417a.827.827 0 0 0 1.012 1.013l1.417-.38c.245-.062.506-.032.73.085.88.438 1.85.666 2.834.664Z"
    />
  </Svg>
);
export default AddImageTitleIcon;
