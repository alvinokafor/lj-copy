import * as React from "react";
import Svg, { SvgProps, Path, Rect } from "react-native-svg";

const CancelIcon = (props: SvgProps) => (
  <Svg width={27} height={27} fill="none" {...props}>
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M26.667 13.333c0 7.364-5.97 13.334-13.334 13.334S0 20.697 0 13.333 5.97 0 13.333 0c7.364 0 13.334 5.97 13.334 13.333ZM9.293 9.293a1 1 0 0 1 1.414 0l2.626 2.627 2.627-2.627a1 1 0 0 1 1.413 1.414l-2.626 2.626 2.626 2.627a1 1 0 0 1-1.413 1.413l-2.627-2.626-2.626 2.626a1 1 0 0 1-1.414-1.413l2.627-2.627-2.627-2.626a1 1 0 0 1 0-1.414Z"
      clipRule="evenodd"
    />
  </Svg>
);

const SendIcon = (props: SvgProps) => (
  <Svg width={17} height={15} fill="none" {...props}>
    <Path
      fill="#000"
      d="m2.887 14.806 12.84-5.727c1.03-.459 1.03-1.83 0-2.29L2.888 1.062C1.724.543.517 1.695 1.093 2.775l2.452 4.591c.19.357.19.778 0 1.134l-2.452 4.592c-.575 1.08.63 2.233 1.794 1.714Z"
    />
  </Svg>
);

const NotInterestedIcon = (props: SvgProps) => (
  <Svg width={73} height={72} fill="none" {...props}>
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M72.5 36c0 19.883-16.117 36-36 36S.5 55.883.5 36s16.117-36 36-36 36 16.117 36 36ZM25.592 25.092a2.7 2.7 0 0 1 3.816 0l7.092 7.092 7.092-7.092a2.7 2.7 0 0 1 3.816 3.816L40.316 36l7.092 7.092a2.7 2.7 0 0 1-3.816 3.816L36.5 39.816l-7.092 7.092a2.7 2.7 0 0 1-3.816-3.816L32.684 36l-7.092-7.092a2.7 2.7 0 0 1 0-3.816Z"
      clipRule="evenodd"
    />
  </Svg>
);

const SuperlikeCardIcon = (props: SvgProps) => (
  <Svg width={40} height={40} fill="none" {...props}>
    <Rect width={40.001} height={40} fill="#fff" rx={20} />
    <Path
      fill="#6A8745"
      d="M23.75 21.073c-2.062-2.264-4.582-.594-4.582 1.76 0 2.133 1.511 3.362 2.798 4.41l.037.03.355.291c.476.396.935.77 1.393.77.458 0 .917-.374 1.392-.77 1.349-1.122 3.191-2.377 3.191-4.731a3.04 3.04 0 0 0-.71-1.984c-.896-1.042-2.488-1.296-3.873.224Z"
    />
    <Path
      fill="#6A8745"
      d="M16.755 25.207c-2.34-1.803-5.088-3.921-5.088-7.592 0-4.052 4.583-6.926 8.333-3.03 3.75-3.897 8.334-1.022 8.334 3.03a6.71 6.71 0 0 1-.274 1.925 3.5 3.5 0 0 0-2.183-.789c-.742-.004-1.465.228-2.127.675-1.159-.777-2.464-.882-3.609-.33-1.362.66-2.224 2.13-2.224 3.738 0 1.921.957 3.269 1.952 4.245-.79-.063-1.581-.673-2.4-1.319-.232-.182-.47-.367-.714-.553Z"
    />
  </Svg>
);

const RoseCardIcon = (props: SvgProps) => (
  <Svg width={41} height={40} fill="none" {...props}>
    <Rect width={40.001} height={40} x={0.5} fill="#fff" rx={20} />
    <Path
      fill="#FF3A30"
      d="M27.28 14.668a.624.624 0 0 0-.667-.278 33.58 33.58 0 0 0-2.137.556c-1.37.405-2.709.934-4.213 1.663-.728.354-1.016.522-1.875 1.021l-.176.104c-1.287.742-2.23 1.563-2.883 2.512-.716 1.039-1.079 2.254-1.079 3.607 0 1.591.614 3.012 1.729 3.999 1.123.996 2.688 1.523 4.521 1.523 1.827 0 3.395-.56 4.532-1.619 1.107-1.029 1.718-2.476 1.718-4.073 0-.977-.241-1.836-.475-2.665-.492-1.746-.916-3.254.965-5.63a.625.625 0 0 0 .04-.72Zm-8.225.002c-1.974-1.073-4.591-1.518-4.702-1.537a.625.625 0 0 0-.688.404.643.643 0 0 0 .148.658c1.243 1.32 1.283 2.687 1.119 4.087a.174.174 0 0 0 .296.142c.64-.645 1.42-1.231 2.36-1.773l.174-.102c.863-.502 1.185-.69 1.957-1.064l.105-.051a.156.156 0 0 0 .025-.267 6.99 6.99 0 0 0-.794-.497Zm.596-1.098c.135.073.277.156.426.246.413.253.8.546 1.155.875a.156.156 0 0 0 .167.03 26.235 26.235 0 0 1 3.271-1.134.157.157 0 0 0 .115-.153.157.157 0 0 0-.016-.066 42.902 42.902 0 0 0-.592-1.164.625.625 0 0 0-.552-.331c-.074 0-1.3.014-3.002.832-.354.17-.698.36-1.031.567a.157.157 0 0 0 .009.27l.05.028Zm-.974-1.197c.286-.187.576-.36.87-.52a.077.077 0 0 0 .04-.064.077.077 0 0 0-.031-.068c-1.016-.764-1.943-1.054-1.998-1.07a.625.625 0 0 0-.686.227c-.287.399-.54.822-.753 1.264a.077.077 0 0 0 .02.094c.009.008.019.013.03.016.532.14 1.149.324 1.782.558a.077.077 0 0 0 .07-.007l.656-.43Z"
    />
  </Svg>
);

const ViewMoreIcon = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path
      fill={props.color}
      fillRule="evenodd"
      d="M14.667 8a6.667 6.667 0 0 1-9.635 5.971 1.087 1.087 0 0 0-.766-.088l-1.484.397a.867.867 0 0 1-1.06-1.061l.396-1.484c.065-.258.033-.53-.09-.766A6.667 6.667 0 1 1 14.667 8ZM5 7.407c0 .913.88 1.87 1.686 2.556.549.467.823.7 1.314.7.49 0 .765-.233 1.314-.7C10.121 9.275 11 8.319 11 7.406c0-1.785-1.65-2.45-3-1.072-1.35-1.379-3-.713-3 1.072Z"
      clipRule="evenodd"
    />
  </Svg>
);

const LikesEmptyIcon = (props: SvgProps) => (
  <Svg width={73} height={72} fill="none" {...props}>
    <Rect width={72.002} height={72} x={0.499} fill="#FBF5E9" rx={36} />
    <Path
      fill="#422618"
      d="M28.712 48.71C23.096 44.382 16.5 39.3 16.5 30.49c0-9.726 11-16.624 20-7.272l4 3.996a1.5 1.5 0 0 0 2.12-2.12l-3.86-3.866c8.478-6.206 17.74.338 17.74 9.262 0 8.81-6.596 13.892-12.212 18.22-.587.45-1.157.892-1.712 1.328-2.076 1.636-4.076 3.178-6.076 3.178s-4-1.54-6.076-3.18a250.43 250.43 0 0 0-1.712-1.326Z"
    />
  </Svg>
);

const SuperlikesEmptyIcon = (props: SvgProps) => (
  <Svg width={73} height={72} fill="none" {...props}>
    <Rect width={72} height={72} x={0.5} fill="#E7EEDD" rx={36} />
    <Path
      fill="#6A8745"
      d="M45.5 38.574c-4.95-5.432-11-1.424-11 4.224 0 5.12 3.629 8.07 6.717 10.584l.088.072.854.7C43.3 55.104 44.4 56 45.5 56s2.2-.896 3.342-1.846c3.236-2.694 7.658-5.706 7.658-11.356 0-1.854-.652-3.534-1.706-4.76-2.15-2.502-5.97-3.112-9.294.536Z"
    />
    <Path
      fill="#6A8745"
      d="M28.712 48.495c-5.616-4.328-12.212-9.41-12.212-18.22 0-9.726 11-16.624 20-7.272 9-9.352 20-2.454 20 7.272 0 1.668-.236 3.2-.658 4.62A8.4 8.4 0 0 0 50.604 33c-1.78-.01-3.516.548-5.106 1.62-2.78-1.866-5.912-2.116-8.66-.79-3.27 1.58-5.338 5.112-5.338 8.968 0 4.612 2.298 7.846 4.684 10.19-1.896-.152-3.794-1.616-5.76-3.166-.556-.438-1.127-.88-1.712-1.328Z"
    />
  </Svg>
);

const RosesEmptyIcon = (props: SvgProps) => (
  <Svg width={73} height={72} fill="none" {...props}>
    <Rect width={72} height={72} x={0.5} fill="#FFE7E5" rx={36} />
    <Path
      fill="#FF3A30"
      d="M50.737 24.802a1.312 1.312 0 0 0-1.4-.583c-1.529.344-3.04.739-4.489 1.167-2.876.852-5.687 1.962-8.847 3.494-1.527.742-2.133 1.095-3.938 2.143l-.369.219c-2.703 1.559-4.683 3.281-6.053 5.274-1.503 2.182-2.265 4.734-2.265 7.575 0 3.342 1.288 6.325 3.628 8.398 2.36 2.093 5.646 3.198 9.497 3.198 3.835 0 7.127-1.175 9.515-3.398 2.326-2.162 3.61-5.2 3.61-8.555 0-2.051-.508-3.856-.999-5.596-1.033-3.666-1.924-6.833 2.027-11.824a1.312 1.312 0 0 0 .083-1.512Zm-17.272.005c-4.146-2.254-9.642-3.188-9.874-3.227a1.313 1.313 0 0 0-1.446.848 1.351 1.351 0 0 0 .31 1.381c2.613 2.771 2.697 5.643 2.351 8.583a.365.365 0 0 0 .622.299c1.344-1.355 2.983-2.586 4.955-3.724l.367-.213c1.813-1.056 2.488-1.45 4.11-2.236l.22-.107a.328.328 0 0 0 .053-.56 14.68 14.68 0 0 0-1.668-1.044Zm1.252-2.305c.282.153.582.328.894.515.867.532 1.68 1.147 2.426 1.837a.328.328 0 0 0 .351.063 55.101 55.101 0 0 1 6.869-2.38.329.329 0 0 0 .207-.46 91.48 91.48 0 0 0-1.243-2.444 1.314 1.314 0 0 0-1.158-.696c-.157 0-2.73.03-6.306 1.748-.742.357-1.465.754-2.165 1.19a.329.329 0 0 0 .019.57l.106.057Zm-2.045-2.515c.599-.392 1.21-.757 1.825-1.092a.164.164 0 0 0 .02-.276c-2.133-1.605-4.08-2.215-4.196-2.25a1.313 1.313 0 0 0-1.44.478 17.856 17.856 0 0 0-1.582 2.656.165.165 0 0 0 .106.23c1.116.294 2.412.68 3.741 1.173a.163.163 0 0 0 .147-.016l1.38-.904Z"
    />
  </Svg>
);

const SelectedLikesTabIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Rect width={24} height={24} fill="#FBF5E9" rx={12} />
    <Path
      fill="#422618"
      d="M9.664 15.813C7.979 14.515 6 12.99 6 10.347 6 7.43 9.3 5.36 12 8.166l1.2 1.199a.45.45 0 0 0 .636-.636l-1.158-1.16C15.221 5.707 18 7.67 18 10.347c0 2.643-1.979 4.168-3.664 5.466-.176.135-.347.268-.513.399-.623.49-1.223.953-1.823.953-.6 0-1.2-.462-1.823-.954l-.513-.398Z"
    />
  </Svg>
);

const SelectedSuperlikesTabIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Rect width={24} height={24} fill="#E7EEDD" rx={12} />
    <Path
      fill="#6A8745"
      d="M15 12.858c-1.65-1.81-3.666-.475-3.666 1.408 0 1.707 1.209 2.69 2.238 3.528l.03.024.284.233c.381.317.748.616 1.114.616.367 0 .734-.299 1.114-.616 1.079-.898 2.553-1.902 2.553-3.785 0-.618-.217-1.178-.569-1.587-.716-.834-1.99-1.037-3.098.18Z"
    />
    <Path
      fill="#6A8745"
      d="M9.404 16.164c-1.872-1.442-4.07-3.136-4.07-6.073C5.333 6.849 9 4.55 12 7.667c3-3.117 6.666-.818 6.666 2.424 0 .556-.078 1.067-.219 1.54A2.8 2.8 0 0 0 16.701 11c-.593-.004-1.172.182-1.702.54-.927-.622-1.97-.706-2.886-.264-1.09.527-1.78 1.704-1.78 2.99 0 1.537.766 2.615 1.562 3.396-.633-.05-1.265-.538-1.92-1.055a55.2 55.2 0 0 0-.571-.443Z"
    />
  </Svg>
);

const SelectedRosesTabIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Rect width={24} height={24} fill="#FFE7E5" rx={12} />
    <Path
      fill="#FF3A30"
      d="M16.746 8.267a.438.438 0 0 0-.467-.194c-.51.115-1.013.246-1.496.389-.959.284-1.896.654-2.95 1.164-.508.248-.71.366-1.312.715l-.123.073c-.9.52-1.561 1.094-2.018 1.758-.5.727-.755 1.578-.755 2.525 0 1.114.43 2.108 1.21 2.8.786.697 1.882 1.065 3.165 1.065 1.279 0 2.376-.391 3.172-1.132.775-.72 1.203-1.734 1.203-2.852 0-.684-.17-1.285-.333-1.865-.344-1.222-.641-2.278.676-3.942a.437.437 0 0 0 .028-.504Zm-5.758.002c-1.382-.751-3.214-1.063-3.29-1.076a.437.437 0 0 0-.483.283.45.45 0 0 0 .104.46c.87.924.898 1.881.783 2.861a.122.122 0 0 0 .207.1 7.782 7.782 0 0 1 1.652-1.241l.122-.071c.605-.352.83-.484 1.37-.746l.074-.035a.109.109 0 0 0 .017-.187 4.893 4.893 0 0 0-.556-.348Zm.418-.768a5.175 5.175 0 0 1 1.107.784.11.11 0 0 0 .116.02 18.379 18.379 0 0 1 2.29-.792.11.11 0 0 0 .07-.061.109.109 0 0 0-.001-.093c-.226-.46-.401-.79-.414-.815a.438.438 0 0 0-.386-.232c-.053 0-.91.01-2.102.583a7.64 7.64 0 0 0-.722.397.11.11 0 0 0-.035.15c.01.017.024.03.041.04l.036.019Zm-.682-.839c.2-.13.403-.252.608-.364a.055.055 0 0 0 .007-.092 4.95 4.95 0 0 0-1.399-.75.437.437 0 0 0-.48.16 5.95 5.95 0 0 0-.527.885.055.055 0 0 0 .035.077c.372.098.804.227 1.247.39a.055.055 0 0 0 .05-.005l.459-.3Z"
    />
  </Svg>
);

export {
  CancelIcon,
  SendIcon,
  NotInterestedIcon,
  SuperlikeCardIcon,
  RoseCardIcon,
  ViewMoreIcon,
  LikesEmptyIcon,
  SuperlikesEmptyIcon,
  RosesEmptyIcon,
  SelectedLikesTabIcon,
  SelectedSuperlikesTabIcon,
  SelectedRosesTabIcon,
};