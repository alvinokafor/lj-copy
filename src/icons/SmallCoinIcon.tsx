import * as React from "react";
import Svg, {
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  RadialGradient,
  ClipPath,
  SvgProps,
} from "react-native-svg";
const SmallCoinIcon = (props: SvgProps) => (
  <Svg width={25} height={23} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#FBC02D"
        d="M.5 12.517v-2.035h.276c1.17-4.298 5.976-7.52 11.725-7.52 5.75 0 10.563 3.222 11.725 7.52h.274v2.035c0 5.277-5.372 9.555-11.999 9.555C5.874 22.072.5 17.794.5 12.517Z"
      />
      <Path
        fill="#F9A825"
        d="M2.261 17.5v-4.434h-.539v3.665c.166.266.346.523.54.77ZM3.878 19.16v-6.094h-.539v5.62c.179.164.352.322.539.475ZM5.495 20.273v-7.207h-.539v6.88c.175.114.356.224.539.327ZM7.112 21.054v-7.976h-.54v7.76c.18.068.356.139.54.216ZM8.728 21.588v-8.522H8.19v8.369c.177.056.356.106.54.153ZM10.345 21.918v-8.852h-.539v8.772c.18.024.358.054.54.08ZM11.962 22.054v-8.988h-.539v8.966a4.5 4.5 0 0 0 .539.022ZM13.04 22.054c.181 0 .36-.015.539-.028v-8.96h-.539v8.988ZM14.657 21.918c.18-.026.362-.056.539-.088v-8.764h-.54v8.852ZM16.274 21.588c.183-.047.362-.097.539-.153v-8.369h-.54v8.522ZM17.89 21.054c.184-.071.363-.15.54-.229v-7.76h-.54v7.989ZM19.507 20.273c.184-.103.365-.215.54-.328v-6.879h-.54v7.207ZM21.124 19.16c.188-.152.367-.31.539-.474v-5.62h-.539v6.095ZM22.741 17.502c.193-.25.373-.51.539-.779V13.06h-.539v4.443Z"
      />
      <Path
        fill="url(#b)"
        d="M.5 12.517v-2.035h.276c1.17-4.298 5.976-7.52 11.725-7.52 5.75 0 10.563 3.222 11.725 7.52h.274v2.035c0 5.277-5.372 9.555-11.999 9.555C5.874 22.072.5 17.794.5 12.517Z"
        // style={{
        //   mixBlendMode: "multiply",
        // }}
      />
      <Path
        fill="#FDD835"
        d="M12.501 20.036c6.628 0 12.001-4.277 12.001-9.554S19.13.928 12.502.928C5.872.928.5 5.205.5 10.482s5.373 9.554 12.001 9.554Z"
      />
      <Path
        fill="#FBC02D"
        d="M12.501 18.855c6.045 0 10.945-3.748 10.945-8.373 0-4.624-4.9-8.373-10.945-8.373-6.044 0-10.945 3.75-10.945 8.373 0 4.625 4.9 8.373 10.945 8.373Z"
      />
      <Path
        fill="url(#c)"
        d="M12.684 18.834c6.045 0 10.945-3.749 10.945-8.373 0-4.624-4.9-8.373-10.945-8.373C6.64 2.088 1.74 5.837 1.74 10.46c0 4.624 4.9 8.373 10.944 8.373Z"
        // style={{
        //   mixBlendMode: "multiply",
        // }}
      />
      <Path
        fill="url(#d)"
        d="M12.501 2.631c-5.93 0-10.757 3.609-10.936 8.112v-.26C1.556 5.857 6.456 2.108 12.5 2.108s10.945 3.75 10.945 8.373v.261c-.19-4.503-5.014-8.112-10.945-8.112Z"
        // style={{
        //   mixBlendMode: "multiply",
        // }}
      />
      <Path
        fill="#EA8F0C"
        d="M17.714 7.952c0-.066-.013-.135-.024-.202a.448.448 0 0 0-.041-.173h-.032l-.485.076c-1.384.215-2.943.15-4.163-.274a.138.138 0 0 1-.073-.065.071.071 0 0 1 .015-.077.554.554 0 0 1 .258-.17c.138-.057.283-.093.431-.108a.813.813 0 0 1 .339.02c.17.055.347.105.533.148a6.73 6.73 0 0 0 1.657.16c.303-.005.605-.024.906-.059.215-.024.403-.06.601-.095h.015c.218-.05.443-.06.664-.03.08.01.157.031.23.063a.576.576 0 0 1 .175.11.46.46 0 0 1 .117.241c.017.075.032.153.043.233.136.994-.179 2.067-.992 3.113-.411.525-.885 1-1.41 1.412-.993.793-2.43 1.608-4.057 1.772a4.742 4.742 0 0 1-2.436-.36 5.445 5.445 0 0 1-1.543-1.02 8.863 8.863 0 0 1-1.132-1.205 5.151 5.151 0 0 1-.647-1.005 2.35 2.35 0 0 1-.215-.847c-.02-.295.032-.59.15-.862.16-.317.394-.59.682-.795a4.492 4.492 0 0 1 1.412-.664 5.252 5.252 0 0 1 1.923-.216c.246.026.49.075.726.147.203.06.403.132.597.215a5.111 5.111 0 0 1 1.94 1.427c.02.032.026.07.018.106a.18.18 0 0 1-.07.097c-.11.098-.24.172-.38.215a1.589 1.589 0 0 1-.492.087.565.565 0 0 1-.298-.102l-.687-.679a3.61 3.61 0 0 0-1.078-.726 3.863 3.863 0 0 0-.988-.304h-.019a2.42 2.42 0 0 0-1.097.127 1.658 1.658 0 0 0-.216.084c-.11.052-.212.118-.304.196a.918.918 0 0 0-.136.14 1.492 1.492 0 0 0-.28.488 1.446 1.446 0 0 0-.056.54c.051.449.226.874.505 1.23.374.507.808.968 1.293 1.373.399.35.832.657 1.293.918.468.259.98.43 1.51.505a2.47 2.47 0 0 0 1.194-.158c.138-.05.274-.103.405-.162.132-.058.23-.125.35-.166l.26-.14c.084-.05.168-.099.25-.15l.104-.07.314-.215a7.422 7.422 0 0 0 1.634-1.604c.063-.09.121-.175.177-.263.013-.022.028-.045.039-.067.08-.134.15-.265.216-.399.27-.564.398-1.185.375-1.81Z"
      />
      <Path
        fill="#FDD835"
        d="M17.571 7.845c0-.067-.013-.134-.026-.2a.429.429 0 0 0-.038-.169h-.02l-.478.073c-1.367.203-2.908.151-4.118-.265a.135.135 0 0 1-.073-.062.067.067 0 0 1 .015-.076.543.543 0 0 1 .24-.18c.137-.056.283-.091.43-.106a.877.877 0 0 1 .337.019c.168.054.345.103.526.144.538.12 1.09.172 1.64.156.3-.004.6-.022.897-.056.216-.024.399-.06.593-.095h.017c.212-.048.431-.058.647-.03.078.012.155.033.228.062.064.024.123.06.173.106a.448.448 0 0 1 .12.23c.018.076.033.151.044.229.135.97-.17 2.018-.97 3.035-.405.511-.87.972-1.384 1.371-.977.772-2.387 1.561-3.988 1.725-.814.1-1.64-.011-2.398-.324a5.478 5.478 0 0 1-1.53-.987 8.894 8.894 0 0 1-1.128-1.168c-.252-.3-.47-.627-.646-.977a2.296 2.296 0 0 1-.216-.823c-.025-.29.023-.58.14-.845.154-.31.382-.577.664-.779a4.445 4.445 0 0 1 1.373-.646 5.256 5.256 0 0 1 1.9-.205c.244.026.486.073.722.142.2.055.398.122.59.2.749.303 1.414.78 1.94 1.393a.123.123 0 0 1 .02.102.185.185 0 0 1-.067.094c-.11.093-.239.16-.377.2a1.61 1.61 0 0 1-.485.085.558.558 0 0 1-.17-.02.32.32 0 0 1-.143-.077l-.677-.647a3.63 3.63 0 0 0-1.063-.707 3.794 3.794 0 0 0-.978-.297h-.017a2.505 2.505 0 0 0-1.078.129 1.387 1.387 0 0 0-.513.274.987.987 0 0 0-.134.136c-.06.071-.114.148-.162.228-.049.074-.09.154-.12.237-.05.172-.067.35-.05.528.056.439.233.853.51 1.197.378.494.812.942 1.294 1.334.39.338.814.635 1.264.889.468.253.98.418 1.509.487.1.012.2.018.301.017a2.8 2.8 0 0 0 .878-.168c.138-.048.27-.1.399-.158.129-.058.215-.12.342-.16l.257-.137.246-.147.101-.067c.106-.07.216-.144.31-.215a7.286 7.286 0 0 0 1.602-1.56c.063-.09.12-.171.175-.257l.039-.065c.077-.13.148-.259.215-.39a3.734 3.734 0 0 0 .35-1.757Z"
      />
    </G>
    <Defs>
      <LinearGradient
        id="b"
        x1={5.818}
        x2={34.82}
        y1={12.519}
        y2={12.519}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.02} stopColor="#fff" stopOpacity={0} />
        <Stop offset={1} stopColor="#F9A825" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={5.426}
        x2={37.835}
        y1={10.463}
        y2={10.463}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.02} stopColor="#fff" stopOpacity={0} />
        <Stop offset={1} stopColor="#F9A825" />
      </LinearGradient>
      <RadialGradient
        id="d"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(0 8.31905 -10.9811 0 12.596 6.427)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.02} stopColor="#fff" stopOpacity={0} />
        <Stop offset={1} stopColor="#F9A825" />
      </RadialGradient>
      <ClipPath id="a">
        <Path fill="#fff" d="M.5.928h24v21.144H.5z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SmallCoinIcon;