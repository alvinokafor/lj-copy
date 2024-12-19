import * as React from "react";
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const MatchOverlayGradient = (props: SvgProps) => (
  <Svg
    width="100%"
    height="100%"
    viewBox="0 0 329 534" // Match the SVG's original aspect ratio or update to fit container
    fill="none"
    preserveAspectRatio="none" // This ensures the SVG fills the container without preserving original aspect ratio
    {...props}
  >
    <Path fill="url(#a)" d="M0 0h329v534H0z" />
    <Path fill="url(#b)" d="M0 0h329v534H0z" />
    <Defs>
      <LinearGradient
        id="a"
        x1="0%"
        x2="0%"
        y1="0%"
        y2="100%"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.588} stopColor="#160F04" stopOpacity={0} />
        <Stop offset={1} stopColor="#160F04" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1="0%"
        x2="0%"
        y1="0%"
        y2="100%"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#1A1A19" stopOpacity={0} />
        <Stop offset={0.595} stopColor="#1A1A19" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export { MatchOverlayGradient };
