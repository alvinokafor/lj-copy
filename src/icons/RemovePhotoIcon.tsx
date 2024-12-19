import * as React from "react";
import Svg, { Rect, Path, SvgProps } from "react-native-svg";

const RemovePhotoIcon = (props: SvgProps) => (
  <Svg width={props.width} height={props.height} fill="none" {...props}>
    <Rect width={props.width} height={props.height} fill="#fff" rx={11} />
    <Path
      fill="#1E1E1C"
      d="M17.111 11.427c-.001.898-.008 1.66-.059 2.287-.059.727-.18 1.335-.452 1.839-.118.22-.269.423-.446.6-.509.51-1.157.74-1.978.85-.803.108-1.832.108-3.144.108h-.065c-1.312 0-2.34 0-3.143-.108-.82-.11-1.47-.34-1.978-.85-.45-.45-.684-1.012-.807-1.708-.123-.684-.145-1.535-.149-2.591-.001-.27-.002-.554-.001-.854v-.033c0-1.313 0-2.34.108-3.144.11-.82.34-1.469.85-1.977.508-.509 1.156-.74 1.977-.85.714-.096 1.632-.107 2.75-.108a.427.427 0 0 1 0 .853c-1.134.002-1.977.011-2.636.1-.727.098-1.165.283-1.489.607-.324.324-.51.763-.607 1.49-.1.74-.1 1.71-.1 3.062v.479l.569-.497a1.308 1.308 0 0 1 1.786.059l2.438 2.438a1.137 1.137 0 0 0 1.457.127l.17-.12a1.705 1.705 0 0 1 2.121.128l1.61 1.449c.161-.34.258-.788.31-1.418.048-.594.054-1.315.055-2.218a.427.427 0 0 1 .853 0Z"
    />
    <Path
      fill="#1E1E1C"
      fillRule="evenodd"
      d="M14.361 10.39c-1.296 0-1.944 0-2.347-.404-.403-.402-.403-1.05-.403-2.347 0-1.296 0-1.944.403-2.347s1.051-.403 2.347-.403 1.945 0 2.348.403c.402.403.402 1.051.402 2.347s0 1.945-.402 2.347c-.403.403-1.051.403-2.348.403Zm-.898-4.297a.46.46 0 1 0-.648.648l.899.898-.899.898a.459.459 0 0 0 .648.648l.898-.898.899.898a.458.458 0 1 0 .647-.648l-.898-.898.898-.898a.458.458 0 0 0-.647-.648l-.899.898-.898-.898Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default RemovePhotoIcon;
