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

import { setCompCommonCls } from '../utils/myUtils';
import classNames from 'classnames';
import React from 'react';
import './index.less';
import { jsx as _jsx } from 'react/jsx-runtime';
import { jsxs as _jsxs } from 'react/jsx-runtime';

var Album = function Album(props) {
  var image = props.image,
    number = props.number,
    _props$width = props.width,
    width = _props$width === void 0 ? 200 : _props$width,
    _props$imageHeight = props.imageHeight,
    imageHeight = _props$imageHeight === void 0 ? 150 : _props$imageHeight,
    title = props.title,
    onClick = props.onClick,
    style = props.style,
    className = props.className;
  var getCls = setCompCommonCls('album');
  return /*#__PURE__*/ _jsxs('div', {
    className: classNames(getCls('container'), className),
    style: _objectSpread(
      {
        width: width,
      },
      style,
    ),
    onClick: onClick,
    children: [
      /*#__PURE__*/ _jsx('div', {
        className: getCls('image'),
        style: {
          height: imageHeight,
        },
        children: /*#__PURE__*/ _jsx('img', {
          src: image,
          alt: '',
        }),
      }),
      /*#__PURE__*/ _jsxs('div', {
        className: getCls('bottom'),
        children: [
          title,
          /*#__PURE__*/ _jsxs('span', {
            children: ['(', number, '\u5F20)'],
          }),
        ],
      }),
      /*#__PURE__*/ _jsx('div', {
        className: getCls('bg'),
      }),
    ],
  });
};

export default /*#__PURE__*/ React.memo(Album);
