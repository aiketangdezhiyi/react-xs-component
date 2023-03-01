function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
export default (function (props) {
  var _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style;

  if (!style.width) {
    style.width = "100%";
    style.height = "100%";
  }

  return /*#__PURE__*/_jsx("div", _objectSpread(_objectSpread({}, props), {}, {
    style: _objectSpread({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#1890ff'
    }, style),
    children: /*#__PURE__*/_jsx(LoadingOutlined, {
      style: {
        fontSize: 60
      }
    })
  }));
});