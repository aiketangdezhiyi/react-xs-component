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

import { message, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { formatInformation } from './utils';
import classNames from 'classnames';
import style from './index.module.less';
import { jsx as _jsx } from 'react/jsx-runtime';
export default function PrivateInformation(props) {
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    show = _useState2[0],
    setShow = _useState2[1];

  var head = props.head,
    tail = props.tail,
    text = props.text,
    _props$isAuth = props.isAuth,
    isAuth = _props$isAuth === void 0 ? true : _props$isAuth,
    onVisibleChange = props.onVisibleChange,
    _props$showTitle = props.showTitle,
    showTitle = _props$showTitle === void 0 ? '你可以点击查看隐私信息' : _props$showTitle,
    _props$tooltipProps = props.tooltipProps,
    tooltipProps = _props$tooltipProps === void 0 ? {} : _props$tooltipProps,
    className = props.className;
  head = typeof head === 'number' ? head : Math.floor(text.length / 3);
  tail = typeof tail === 'number' ? tail : Math.floor(text.length / 3);
  useEffect(
    function () {
      if ('visible' in props) {
        setShow(!!props.visible);
      }
    },
    [props.visible],
  );

  if (show) {
    return /*#__PURE__*/ _jsx('span', {
      className: className,
      children: text,
    });
  }

  return /*#__PURE__*/ _jsx(
    Tooltip,
    _objectSpread(
      _objectSpread({}, tooltipProps),
      {},
      {
        title: showTitle,
        children: /*#__PURE__*/ _jsx('span', {
          className: classNames(style['hide-information'], className),
          onClick: function onClick(e) {
            e.stopPropagation();
            onVisibleChange === null || onVisibleChange === void 0 ? void 0 : onVisibleChange(e);

            if (e.defaultPrevented) {
              return;
            }

            if (!('visible' in props)) {
              if (typeof isAuth === 'boolean') {
                isAuth && setShow(true);
                !isAuth && message.info('抱歉,你没有权限查看该信息');
              }
            }
          },
          children: formatInformation(text, head, tail),
        }),
      },
    ),
  );
}
