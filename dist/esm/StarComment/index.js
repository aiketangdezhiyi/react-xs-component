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
import React, { useEffect, useMemo, useRef, useState } from 'react';
import './index.less';
import { jsx as _jsx } from 'react/jsx-runtime';
import { jsxs as _jsxs } from 'react/jsx-runtime';
export default (function (props) {
  var stars = props.stars,
    light = props.light,
    _props$comments = props.comments,
    comments = _props$comments === void 0 ? [] : _props$comments,
    _props$dynamic = props.dynamic,
    dynamic = _props$dynamic === void 0 ? false : _props$dynamic,
    starStyle = props.starStyle,
    starActiveStyle = props.starActiveStyle,
    commentStyle = props.commentStyle,
    className = props.className;

  var _useState = useState(0),
    _useState2 = _slicedToArray(_useState, 2),
    starIndex = _useState2[0],
    setStarIndex = _useState2[1];

  var commentJSX = null;

  if (light > stars) {
    light = stars;
  }

  if (comments && comments.length > stars) {
    return null;
  }

  useEffect(
    function () {
      setStarIndex(light);
    },
    [light],
  );
  commentJSX = /*#__PURE__*/ _jsx('span', {
    className: 'star-comment',
    style: commentStyle,
    children: comments[starIndex - 1],
  });
  var selectRef = useRef(false); // 动态时是否已经评价

  var handleClick = function handleClick() {
    selectRef.current = true;
  };

  var starsList = useMemo(
    function () {
      var starsList = [];

      var _loop = function _loop(i) {
        var handleMouseEnter = void 0;

        if (dynamic && !selectRef.current) {
          handleMouseEnter = function handleMouseEnter() {
            if (selectRef.current) {
              return;
            }

            setStarIndex(i + 1);
          };
        }

        i < starIndex &&
          starsList.push(
            /*#__PURE__*/ _jsx(
              'span',
              {
                onMouseEnter: handleMouseEnter,
                onClick: handleClick,
                className: 'star-item light',
                style: starActiveStyle,
              },
              i,
            ),
          );
        i >= starIndex &&
          starsList.push(
            /*#__PURE__*/ _jsx(
              'span',
              {
                onMouseEnter: handleMouseEnter,
                onClick: handleClick,
                className: 'star-item',
                style: starStyle,
              },
              i,
            ),
          );
      };

      for (var i = 0; i < stars; i++) {
        _loop(i);
      }

      return starsList;
    },
    [stars, starIndex],
  );
  return /*#__PURE__*/ _jsxs('div', {
    className: classNames('star-container', className),
    children: [
      /*#__PURE__*/ _jsx('div', {
        className: 'star-wrapper',
        children: starsList,
      }),
      commentJSX,
    ],
  });
});
