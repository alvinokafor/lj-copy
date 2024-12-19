import * as React from "react";
import Svg, { Path } from "react-native-svg";

const FaceBookIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    {...props}
  >
    <Path
      fill="#1877F2"
      d="M22 12.666c0-5.522-4.477-10-10-10s-10 4.478-10 10c0 4.992 3.657 9.129 8.438 9.879v-6.988h-2.54v-2.89h2.54v-2.204c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.563v1.875h2.773l-.443 2.891h-2.33v6.988c4.78-.75 8.437-4.887 8.437-9.879Z"
    />
    <Path
      fill="#fff"
      d="m15.893 15.557.443-2.89h-2.773V10.79c0-.791.387-1.562 1.63-1.562h1.26v-2.46s-1.144-.196-2.238-.196c-2.285 0-3.777 1.384-3.777 3.89v2.204h-2.54v2.89h2.54v6.988a10.072 10.072 0 0 0 3.124 0v-6.988h2.33Z"
    />
  </Svg>
);
export default FaceBookIcon;