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

import { setCommonCls } from '../utils/myUtils';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import './index.less';
import { jsx as _jsx } from 'react/jsx-runtime';
import { jsxs as _jsxs } from 'react/jsx-runtime';
export default (function (props) {
  var _props$presetWordStri = props.presetWordString,
    presetWordString = _props$presetWordStri === void 0 ? [] : _props$presetWordStri,
    _props$duration = props.duration,
    duration = _props$duration === void 0 ? 3000 : _props$duration,
    onClick = props.onClick,
    _props$showClear = props.showClear,
    showClear = _props$showClear === void 0 ? true : _props$showClear,
    _props$width = props.width,
    width = _props$width === void 0 ? 480 : _props$width,
    _props$btnIcon = props.btnIcon,
    btnIcon = _props$btnIcon === void 0 ? /*#__PURE__*/ _jsx(SearchOutlined, {}) : _props$btnIcon,
    _props$btnTitle = props.btnTitle,
    btnTitle = _props$btnTitle === void 0 ? '搜索' : _props$btnTitle,
    _props$placeholder = props.placeholder,
    placeholder = _props$placeholder === void 0 ? '请输入内容' : _props$placeholder,
    buttonStyle = props.buttonStyle,
    inputStyle = props.inputStyle,
    style = props.style,
    className = props.className;

  var _useState = useState(0),
    _useState2 = _slicedToArray(_useState, 2),
    placeholderIdx = _useState2[0],
    setPlaceholderIdx = _useState2[1];

  var inputRef = useRef(null);

  var _useState3 = useState(''),
    _useState4 = _slicedToArray(_useState3, 2),
    keyWord = _useState4[0],
    setKeyWord = _useState4[1];

  var timerRef = useRef();
  useEffect(
    function () {
      if (presetWordString.length === 0) {
        presetWordString.push({
          word: placeholder,
        });
      }
    },
    [placeholder],
  );
  var activePreset = presetWordString[placeholderIdx];
  var getCls = setCommonCls('comp', 'preset', 'input');
  useEffect(
    function () {
      if (keyWord) {
        return;
      }

      timerRef.current = setTimeout(function () {
        var idx = (placeholderIdx + 1) % presetWordString.length;
        setPlaceholderIdx(idx);
      }, duration);
      return function () {
        clearTimeout(timerRef.current);
      };
    },
    [presetWordString, duration, placeholderIdx, timerRef.current, keyWord],
  );

  var handleChangeKeyword = function handleChangeKeyword(e) {
    setKeyWord(e.target.value);
  };

  var onSearchClick = function onSearchClick() {
    onClick && onClick(keyWord ? keyWord : activePreset.word);
  };

  return /*#__PURE__*/ _jsxs('div', {
    className: classNames(getCls('container'), className),
    style: _objectSpread(
      {
        width: width,
      },
      style,
    ),
    children: [
      /*#__PURE__*/ _jsx('span', {
        className: getCls('icon'),
        style: {
          display: activePreset.icon ? 'flex' : 'none',
        },
        children: activePreset.icon,
      }),
      /*#__PURE__*/ _jsx('input', {
        value: keyWord,
        onChange: function onChange() {},
        onInput: handleChangeKeyword,
        className: getCls('search'),
        ref: inputRef,
        type: 'text',
        placeholder: activePreset.word,
        style: _objectSpread(
          {
            textIndent: activePreset.icon ? 32 : 12,
          },
          inputStyle,
        ),
      }),
      /*#__PURE__*/ _jsx('div', {
        className: getCls('gradient'),
      }),
      showClear && keyWord.length > 0
        ? /*#__PURE__*/ _jsx('span', {
            className: getCls('clear'),
            children: /*#__PURE__*/ _jsx(CloseOutlined, {
              onClick: function onClick() {
                setKeyWord('');
              },
            }),
          })
        : null,
      /*#__PURE__*/ _jsxs('button', {
        className: getCls('btn'),
        style: buttonStyle,
        onClick: onSearchClick,
        children: [btnIcon, btnTitle],
      }),
    ],
  });
});
