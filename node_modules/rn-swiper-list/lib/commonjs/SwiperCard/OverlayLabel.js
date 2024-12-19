"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const OverlayLabel = ({
  inputRange,
  outputRange,
  Component,
  opacityValue
}) => {
  const animatedStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      opacity: (0, _reactNativeReanimated.interpolate)(opacityValue.value, inputRange ?? [], outputRange ?? [], 'clamp'),
      zIndex: 2
    };
  });
  return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [_reactNative.StyleSheet.absoluteFillObject, animatedStyle],
    pointerEvents: "none"
  }, /*#__PURE__*/_react.default.createElement(Component, null));
};
var _default = exports.default = OverlayLabel;
//# sourceMappingURL=OverlayLabel.js.map