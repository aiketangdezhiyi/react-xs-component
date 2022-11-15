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

import { jsLink, setCommonCls } from '../utils/myUtils';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import './index.less';
import { jsx as _jsx } from 'react/jsx-runtime';
import { jsxs as _jsxs } from 'react/jsx-runtime';
export default (function (props) {
  var url = props.url,
    _props$target = props.target,
    target = _props$target === void 0 ? '_blank' : _props$target,
    _props$width = props.width,
    width = _props$width === void 0 ? 360 : _props$width,
    delayTime = props.delayTime,
    bottomNode = props.bottomNode,
    title = props.title,
    titleStyle = props.titleStyle,
    _onClick = props.onClick,
    style = props.style,
    className = props.className;
  var contentRef = useRef(null);

  var _useState = useState(0),
    _useState2 = _slicedToArray(_useState, 2),
    lineHeight = _useState2[0],
    setLineHeight = _useState2[1];

  var getCls = setCommonCls('comp', 'tag', 'link');
  useEffect(
    function () {
      if (contentRef.current) {
        setLineHeight(contentRef.current.offsetHeight);
      }
    },
    [contentRef.current, bottomNode],
  );
  return /*#__PURE__*/ _jsxs('div', {
    style: _objectSpread(
      {
        width: width,
      },
      style,
    ),
    className: classNames(getCls('container'), className),
    onClick: function onClick() {
      typeof _onClick === 'function' && _onClick(props);
      jsLink(url, target, delayTime);
    },
    children: [
      /*#__PURE__*/ _jsx('span', {
        className: getCls('line'),
        style: {
          height: lineHeight,
        },
      }),
      /*#__PURE__*/ _jsxs('div', {
        className: getCls('content'),
        ref: contentRef,
        children: [
          /*#__PURE__*/ _jsx('div', {
            className: getCls('title'),
            style: titleStyle,
            children: title,
          }),
          bottomNode,
        ],
      }),
    ],
  });
});
