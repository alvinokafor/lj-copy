import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const SuperLikeIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#422618"
      d="M16.5 13.287c-2.476-2.716-5.5-.712-5.5 2.112 0 2.56 1.813 4.035 3.357 5.292l.044.036.427.35c.571.475 1.121.923 1.671.923s1.1-.448 1.671-.923C19.788 19.73 22 18.224 22 15.4c0-.927-.327-1.767-.854-2.38-1.075-1.25-2.985-1.556-4.647.268Z"
    />
    <Path
      fill="#422618"
      d="M8.105 18.247C5.297 16.083 2 13.542 2 9.137 2 4.274 7.5.825 12 5.501 16.5.825 22 4.274 22 9.137c0 .834-.118 1.6-.329 2.31a4.2 4.2 0 0 0-2.619-.947c-.89-.005-1.758.274-2.553.81-1.39-.933-2.956-1.058-4.33-.395-1.635.79-2.669 2.556-2.669 4.484 0 2.306 1.15 3.923 2.342 5.095-.948-.076-1.897-.808-2.88-1.583-.278-.218-.563-.44-.856-.664Z"
    />
  </Svg>
);
export default SuperLikeIcon;
