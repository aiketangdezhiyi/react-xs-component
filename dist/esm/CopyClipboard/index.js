var _excluded = [
  'tipDuration',
  'children',
  'copyTextClassName',
  'copyText',
  'successTip',
  'className',
];

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

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

import React, { forwardRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import classNames from 'classnames';
import { Tag } from 'antd';
import style from './index.module.less';
import { jsx as _jsx } from 'react/jsx-runtime';
import { jsxs as _jsxs } from 'react/jsx-runtime';
var CopyClipboard = /*#__PURE__*/ forwardRef(function (props, clipboardRef) {
  var _props$tipDuration = props.tipDuration,
    tipDuration = _props$tipDuration === void 0 ? 3000 : _props$tipDuration,
    children = props.children,
    copyTextClassName = props.copyTextClassName,
    _props$copyText = props.copyText,
    copyText = _props$copyText === void 0 ? '' : _props$copyText,
    _props$successTip = props.successTip,
    successTip = _props$successTip === void 0 ? '已复制' : _props$successTip,
    className = props.className,
    eventProps = _objectWithoutProperties(props, _excluded);

  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isCopy = _useState2[0],
    setIsCopy = _useState2[1];

  return /*#__PURE__*/ _jsxs(
    'div',
    _objectSpread(
      _objectSpread(
        {
          className: classNames(style['copy-wrapper'], className),
        },
        eventProps,
      ),
      {},
      {
        children: [
          /*#__PURE__*/ _jsx(CopyToClipboard, {
            text: copyText,
            onCopy: function onCopy() {
              setIsCopy(true);
              setTimeout(function () {
                setIsCopy(false);
              }, tipDuration);
            },
            children: /*#__PURE__*/ _jsx('span', {
              ref: clipboardRef,
              className: classNames(style['copy-text'], copyTextClassName),
              children: children || copyText,
            }),
          }),
          /*#__PURE__*/ _jsx(Tag, {
            className: isCopy
              ? ''.concat(style['copy-success-tag'], ' ').concat(style['show'])
              : ''.concat(style['copy-success-tag']),
            color: 'geekblue',
            children: successTip,
          }),
        ],
      },
    ),
  );
});
CopyClipboard.displayName = 'CopyClipboard';
export default /*#__PURE__*/ React.memo(CopyClipboard);
