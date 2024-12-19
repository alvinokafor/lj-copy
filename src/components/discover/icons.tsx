import * as React from "react";
import Svg, { SvgProps, G, Rect, Path, Circle } from "react-native-svg";

const LikeSwipeOverlayIcon = (props: SvgProps) => (
  <Svg width={168} height={144} fill="none" {...props}>
    <Path
      fill="#fff"
      d="M51.423 124.931C28.023 106.897.54 85.722.54 49.014c0-40.525 45.833-69.267 83.333-30.3l16.667 16.65a6.247 6.247 0 0 0 8.68-.153 6.247 6.247 0 0 0 .153-8.68L93.289 10.422c35.326-25.858 73.917 1.409 73.917 38.592 0 36.708-27.483 57.883-50.883 75.917a702.349 702.349 0 0 0-7.133 5.533c-8.65 6.817-16.984 13.242-25.317 13.242-8.334 0-16.667-6.417-25.317-13.25a1019.967 1019.967 0 0 0-7.133-5.525Z"
    />
  </Svg>
);

const DislikeSwipeOverlayIcon = (props: SvgProps) => (
  <Svg width={163} height={163} fill="none" {...props}>
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M162.709 81.459c0 44.874-36.376 81.25-81.25 81.25S.209 126.333.209 81.459 36.585.209 81.459.209s81.25 36.376 81.25 81.25ZM56.84 56.84a6.094 6.094 0 0 1 8.613 0l16.006 16.007L97.465 56.84a6.093 6.093 0 0 1 8.613 8.613L90.071 81.459l16.007 16.006a6.094 6.094 0 0 1-8.613 8.613L81.46 90.071l-16.006 16.007a6.094 6.094 0 0 1-8.613-8.613L72.847 81.46 56.84 65.453a6.094 6.094 0 0 1 0-8.613Z"
      clipRule="evenodd"
    />
  </Svg>
);

const MarkerIcon = (props: SvgProps) => (
  <Svg width={2} height={7} fill="none" {...props}>
    <Rect
      width={1.606}
      height={6.424}
      fill="#1E1E1C"
      opacity={0.2}
      rx={0.803}
    />
  </Svg>
);

const PlusIcon = (props: SvgProps) => (
  <Svg width={12} height={13} fill="none" {...props}>
    <Path
      fill="#1E1E1C"
      d="M7.2 1.7a1.2 1.2 0 0 0-2.4 0v3.6H1.2a1.2 1.2 0 0 0 0 2.4h3.6v3.6a1.2 1.2 0 1 0 2.4 0V7.7h3.6a1.2 1.2 0 1 0 0-2.4H7.2V1.7Z"
    />
  </Svg>
);

const ResetIcon = (props: SvgProps) => (
  <Svg width={20} height={21} fill="none" {...props}>
    <Circle cx={10} cy={10.5} r={10} fill="#F3F3F2" />
    <Path
      stroke="#1E1E1C"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m13.998 7.166-7.331 7.331m0-7.331 7.331 7.331"
    />
  </Svg>
);

const SmallHeartIcon = (props: SvgProps) => (
  <Svg width={20} height={16} fill="none" {...props}>
    <Path
      fill="#fff"
      d="M6.38 13.906C3.772 11.895.707 9.533.707 5.44.706.92 5.818-2.286 10 2.06l1.859 1.857a.697.697 0 0 0 .985-.985L11.05 1.135c3.94-2.884 8.244.157 8.244 4.304 0 4.094-3.065 6.456-5.675 8.467-.273.209-.538.415-.796.617C11.86 15.283 10.93 16 10 16c-.93 0-1.859-.716-2.824-1.478a113.63 113.63 0 0 0-.795-.616Z"
    />
  </Svg>
);

const SmallNotInterestedIcon = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path
      fill="#422618"
      fillRule="evenodd"
      d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM5.576 5.576a.6.6 0 0 1 .848 0L8 7.152l1.576-1.576a.6.6 0 0 1 .848.848L8.848 8l1.576 1.576a.6.6 0 0 1-.848.848L8 8.848l-1.576 1.576a.6.6 0 0 1-.848-.848L7.152 8 5.576 6.424a.6.6 0 0 1 0-.848Z"
      clipRule="evenodd"
    />
  </Svg>
);

const SmallSuperLikeIcon = (props: SvgProps) => (
  <Svg width={21} height={20} fill="none" {...props}>
    <Path
      fill="#422618"
      d="M14.295 11.072c-2.063-2.263-4.584-.593-4.584 1.76 0 2.134 1.512 3.363 2.799 4.41l.036.03.356.292c.476.396.934.77 1.393.77.458 0 .916-.374 1.392-.77 1.348-1.122 3.191-2.377 3.191-4.732a3.04 3.04 0 0 0-.71-1.983c-.897-1.042-2.488-1.296-3.873.223Z"
    />
    <Path
      fill="#422618"
      d="M7.3 15.206C4.96 13.403 2.21 11.285 2.21 7.614c0-4.052 4.584-6.927 8.334-3.03 3.75-3.897 8.333-1.022 8.333 3.03 0 .695-.098 1.333-.274 1.925a3.5 3.5 0 0 0-2.183-.789c-.741-.004-1.465.228-2.127.675-1.159-.778-2.463-.882-3.609-.33-1.362.66-2.224 2.13-2.224 3.737 0 1.922.958 3.27 1.952 4.246-.79-.063-1.58-.673-2.4-1.319-.232-.182-.47-.367-.713-.553Z"
    />
  </Svg>
);

const SmallRoseIcon = (props: SvgProps) => (
  <Svg width={21} height={20} fill="none" {...props}>
    <Path
      fill="#422618"
      d="M16.824 4.668a.624.624 0 0 0-.667-.278c-.728.164-1.447.352-2.137.556-1.37.406-2.709.934-4.213 1.663-.728.354-1.016.522-1.875 1.021l-.176.104c-1.287.743-2.23 1.563-2.882 2.512-.716 1.039-1.08 2.254-1.08 3.607 0 1.591.614 3.012 1.729 3.999 1.123.996 2.688 1.523 4.522 1.523 1.826 0 3.394-.56 4.53-1.618 1.108-1.03 1.72-2.477 1.72-4.074 0-.977-.242-1.836-.476-2.665-.492-1.746-.916-3.254.966-5.63a.625.625 0 0 0 .039-.72Zm-8.225.002C6.625 3.597 4.008 3.152 3.897 3.134a.625.625 0 0 0-.688.403.643.643 0 0 0 .148.658C4.6 5.515 4.64 6.882 4.476 8.282a.174.174 0 0 0 .296.142c.64-.645 1.42-1.231 2.36-1.773l.174-.101c.864-.503 1.185-.69 1.957-1.065l.105-.051a.156.156 0 0 0 .025-.267A6.993 6.993 0 0 0 8.6 4.67Zm.596-1.098c.135.073.277.157.426.246.413.253.8.546 1.155.875a.156.156 0 0 0 .168.03 26.238 26.238 0 0 1 3.27-1.134.157.157 0 0 0 .099-.22 43.053 43.053 0 0 0-.592-1.163.625.625 0 0 0-.551-.331c-.075 0-1.3.014-3.003.832-.354.17-.698.36-1.031.567a.156.156 0 0 0 .009.27l.05.028Zm-.973-1.197c.285-.187.575-.36.869-.52a.078.078 0 0 0 .01-.132C8.083.96 7.157.67 7.101.653a.625.625 0 0 0-.686.227 8.5 8.5 0 0 0-.753 1.265.078.078 0 0 0 .05.11c.532.139 1.149.323 1.782.557a.078.078 0 0 0 .07-.007l.657-.43Z"
    />
  </Svg>
);

const HideIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#000"
      fillRule="evenodd"
      d="M1.606 6.08a1 1 0 0 1 1.313.526L2 7l.92-.394.003.008.021.045.094.194c.086.172.219.424.4.729a13.4 13.4 0 0 0 1.67 2.237c.19.204.387.402.59.592C7.18 11.8 9.251 13 12 13a8.701 8.701 0 0 0 3.22-.602c1.227-.483 2.254-1.21 3.096-1.998a13 13 0 0 0 2.733-3.725l.027-.058.005-.011a1 1 0 0 1 1.838.788l-.002.005-.004.008-.011.026-.04.087c-.222.463-.47.913-.741 1.348-.5.803-1.073 1.558-1.711 2.256l.797.797a1 1 0 0 1-1.414 1.415l-.84-.84c-.591.478-1.226.898-1.897 1.256l.782 1.202a1 1 0 1 1-1.676 1.091l-.986-1.514c-.679.208-1.404.355-2.176.424V16.5a1 1 0 0 1-2 0v-1.544c-.775-.07-1.5-.217-2.177-.425l-.985 1.514a1 1 0 0 1-1.676-1.09l.782-1.203c-.7-.37-1.332-.8-1.897-1.257l-.84.84a1 1 0 0 1-1.414-1.414l.797-.797a15.4 15.4 0 0 1-1.87-2.519 14 14 0 0 1-.591-1.107l-.033-.072-.01-.021-.002-.007-.001-.002C1.08 7.396 1.08 7.394 2 7l-.919.395a1 1 0 0 1 .525-1.315Z"
      clipRule="evenodd"
    />
  </Svg>
);

export {
  LikeSwipeOverlayIcon,
  DislikeSwipeOverlayIcon,
  MarkerIcon,
  PlusIcon,
  ResetIcon,
  SmallHeartIcon,
  SmallNotInterestedIcon,
  SmallSuperLikeIcon,
  SmallRoseIcon,
  HideIcon,
};
