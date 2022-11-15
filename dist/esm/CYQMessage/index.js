function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly &&
      (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })),
      keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2
      ? ownKeys(Object(source), !0).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
      : ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  var _i =
    arr == null
      ? null
      : (typeof Symbol !== 'undefined' && arr[Symbol.iterator]) || arr['@@iterator'];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { setCompCommonCls } from '../utils/myUtils';
import './index.less';
import { jsx as _jsx } from 'react/jsx-runtime';

var CYQMessage = function CYQMessage(props) {
  var show = props.show,
    children = props.children,
    _props$showTime = props.showTime,
    showTime = _props$showTime === void 0 ? 5000 : _props$showTime,
    _props$duration = props.duration,
    duration = _props$duration === void 0 ? 3000 : _props$duration,
    style = props.style,
    className = props.className;

  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    showing = _useState2[0],
    setShowing = _useState2[1]; // 正在展示中

  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    startAnimation = _useState4[0],
    setStartAnimation = _useState4[1]; // 开启动画

  var _useState5 = useState(1),
    _useState6 = _slicedToArray(_useState5, 2),
    opacityState = _useState6[0],
    setOpacityState = _useState6[1];

  var showTimerRef = useRef(undefined);
  var animationTimerRef = useRef(undefined);
  useEffect(
    function () {
      if (show && duration !== 0) {
        clearTimeout(showTimerRef.current);
        clearTimeout(animationTimerRef.current);
        setStartAnimation(false);
        setOpacityState(1);
        setShowing(true);
        showTimerRef.current = setTimeout(function () {
          setStartAnimation(true);
          setOpacityState(0);
          animationTimerRef.current = setTimeout(function () {
            setShowing(false);
            setStartAnimation(false);
          }, duration);
        }, showTime);
      } else if (show && duration === 0) {
        clearTimeout(showTimerRef.current);
        setShowing(true);
        showTimerRef.current = setTimeout(function () {
          setShowing(false);
        }, showTime);
      }
    },
    [show],
  );
  useEffect(function () {}, [showing]);
  var getCls = setCompCommonCls('cyq', 'message');
  return /*#__PURE__*/ _jsx('div', {
    style: _objectSpread(
      _objectSpread(
        {
          transition: startAnimation ? 'opacity '.concat(duration, 'ms') : 'none',
        },
        style,
      ),
      {},
      {
        opacity: opacityState,
        display: showing ? 'flex' : 'none',
      },
    ),
    className: classNames(getCls('wrapper'), className),
    children: children,
  });
};

export default /*#__PURE__*/ React.memo(CYQMessage);
