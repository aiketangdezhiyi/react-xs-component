function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { setCompCommonCls } from "../utils/myUtils";
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import "./index.less";
import { jsx as _jsx } from "react/jsx-runtime";

var explainTemplate = function explainTemplate(template, content) {
  // template 重新获取验证码({}) content 50秒 === 重新获取验证码(50秒)
  var first = template.indexOf('{');
  var second = template.indexOf('}');

  if (first === -1 || second === -1 || first > second) {
    return content;
  }

  return template.substring(0, first) + content + template.substring(second + 1);
};

function useStart() {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      start = _useState2[0],
      setStart = _useState2[1];

  return {
    start: start,
    onStart: function onStart() {
      setStart(true);
      setTimeout(function () {
        setStart(false);
      }, 1000);
    }
  };
}

export default function Timer(props) {
  var time = props.time,
      _props$onInterval = props.onInterval,
      onInterval = _props$onInterval === void 0 ? function () {} : _props$onInterval,
      text = props.text,
      onTimerFinish = props.onTimerFinish,
      _onClick = props.onClick,
      style = props.style,
      intervalStyle = props.intervalStyle,
      _props$template = props.template,
      template = _props$template === void 0 ? '{}' : _props$template,
      className = props.className;

  var _useState3 = useState(0),
      _useState4 = _slicedToArray(_useState3, 2),
      curTime = _useState4[0],
      setCurTime = _useState4[1];

  var _useStart = useStart(),
      start = _useStart.start,
      onStart = _useStart.onStart;

  var getCls = setCompCommonCls('timer');
  useEffect(function () {
    if (curTime === 0) {
      return;
    }

    setTimeout(function () {
      setCurTime(curTime - 1);
      onInterval && onInterval(curTime - 1);

      if (curTime === 1) {
        onTimerFinish && onTimerFinish();
      }
    }, 1000);
  }, [curTime]);
  useEffect(function () {
    if (start && curTime === 0 && time) {
      setCurTime(time);
    }
  }, [time, start]);

  var mergeStyle = _objectSpread({}, style);

  if (curTime > 0 && intervalStyle) {
    Object.assign(mergeStyle, intervalStyle);
  }

  return /*#__PURE__*/_jsx("div", {
    style: mergeStyle,
    className: classNames(getCls('container'), curTime > 0 ? 'interval' : '', className),
    onClick: function onClick() {
      _onClick && _onClick(curTime === 0 ? false : true);
      onStart();
    },
    children: curTime === 0 ? text : explainTemplate(template, curTime + '秒')
  });
}