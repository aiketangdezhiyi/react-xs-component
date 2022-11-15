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
import { Avatar } from 'antd';
import React, { useState } from 'react';
import { setCompCommonCls } from '../utils/myUtils';
import './index.less';
import { jsx as _jsx } from 'react/jsx-runtime';
import { jsxs as _jsxs } from 'react/jsx-runtime';

var Comment = function Comment(props) {
  var btnTitle = props.btnTitle,
    _props$maxCommentNum = props.maxCommentNum,
    maxCommentNum = _props$maxCommentNum === void 0 ? 300 : _props$maxCommentNum,
    _props$avatarSize = props.avatarSize,
    avatarSize = _props$avatarSize === void 0 ? 55 : _props$avatarSize,
    _props$placeholder = props.placeholder,
    placeholder = _props$placeholder === void 0 ? '请输入内容' : _props$placeholder,
    _props$textareaHeight = props.textareaHeight,
    textareaHeight = _props$textareaHeight === void 0 ? 150 : _props$textareaHeight,
    nickname = props.nickname,
    _props$onSubmit = props.onSubmit,
    onSubmit = _props$onSubmit === void 0 ? function () {} : _props$onSubmit,
    avatar = props.avatar,
    _props$borderStyle = props.borderStyle,
    borderStyle = _props$borderStyle === void 0 ? 'solid' : _props$borderStyle,
    _props$theme = props.theme,
    theme = _props$theme === void 0 ? 'light' : _props$theme,
    style = props.style,
    avatarStyle = props.avatarStyle,
    onAvatarClick = props.onAvatarClick,
    className = props.className;

  var _useState = useState(''),
    _useState2 = _slicedToArray(_useState, 2),
    comment = _useState2[0],
    setComment = _useState2[1];

  var getCls = setCompCommonCls('comment', theme);

  var handleCommentChange = function handleCommentChange(e) {
    setComment(e.target.value);
  };

  return /*#__PURE__*/ _jsxs('div', {
    className: classNames(getCls('wrapper'), className),
    children: [
      /*#__PURE__*/ _jsxs('div', {
        className: classNames(getCls('left')),
        onClick: onAvatarClick,
        children: [
          avatar
            ? /*#__PURE__*/ _jsx(Avatar, {
                size: avatarSize,
                style: {
                  filter: 'drop-shadow(1px 1px 3px rgba(0,0,0,.5))',
                },
                src: avatar,
              })
            : null,
          nickname
            ? /*#__PURE__*/ _jsx('span', {
                className: classNames(getCls('nickname')),
                children: nickname,
              })
            : null,
        ],
      }),
      /*#__PURE__*/ _jsxs('div', {
        className: classNames(getCls('right')),
        children: [
          /*#__PURE__*/ _jsx('textarea', {
            onChange: handleCommentChange,
            value: comment,
            placeholder: placeholder,
            style: _objectSpread(
              {
                borderStyle: borderStyle,
                height: textareaHeight,
              },
              style,
            ),
            maxLength: maxCommentNum,
            className: classNames(getCls('textarea')),
          }),
          /*#__PURE__*/ _jsxs('span', {
            style: {
              top: textareaHeight - 30,
            },
            className: classNames(getCls('count')),
            children: [comment.length, ' / ', maxCommentNum],
          }),
          /*#__PURE__*/ _jsx('button', {
            onClick: function onClick() {
              onSubmit(comment);
            },
            className: classNames(getCls('btn')),
            children: btnTitle,
          }),
        ],
      }),
    ],
  });
};

export default /*#__PURE__*/ React.memo(Comment);
