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
import classNames from 'classnames';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { cloneReactElementArray } from '../utils/reactUtils';
import './index.less';
import { getConcatArray } from '../utils/Array';
import { jsx as _jsx } from 'react/jsx-runtime';

/**
 *
 * @param curIdx 当前索引
 * @param max 最大值
 */
var getNextIdx = function getNextIdx(curIdx, max) {
  var nextIdx = (curIdx + 1) % (max + 1);
  return nextIdx;
};

var BroadcastInformation = function BroadcastInformation(props) {
  var _props$informationLis = props.informationList,
    informationList = _props$informationLis === void 0 ? [] : _props$informationLis,
    informationNodeList = props.informationNodeList,
    _props$duration = props.duration,
    duration = _props$duration === void 0 ? 3000 : _props$duration,
    _props$animationTime = props.animationTime,
    animationTime = _props$animationTime === void 0 ? 500 : _props$animationTime,
    _props$itemHeight = props.itemHeight,
    itemHeight = _props$itemHeight === void 0 ? 20 : _props$itemHeight,
    _props$number = props.number,
    number = _props$number === void 0 ? 1 : _props$number,
    width = props.width,
    _props$suspend = props.suspend,
    suspend = _props$suspend === void 0 ? true : _props$suspend,
    _onClick = props.onClick,
    style = props.style,
    className = props.className;

  var _useState = useState(0),
    _useState2 = _slicedToArray(_useState, 2),
    showIdx = _useState2[0],
    setShowIdx = _useState2[1];

  var _useState3 = useState(true),
    _useState4 = _slicedToArray(_useState3, 2),
    startAnimation = _useState4[0],
    setStartAnimation = _useState4[1];

  var timerRef = useRef();

  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isEnter = _useState6[0],
    setIsEnter = _useState6[1];

  var getCls = setCommonCls('comp', 'broadcast');
  var containerHeight = itemHeight * number; // 容器高度

  var moveHeight = containerHeight; // 每次动画移动的高度 默认与容器高度保持一致

  if (!informationList && !informationNodeList) {
    throw new Error('informationList 和 informationNodeList 至少传一个');
  }

  var max = Math.max(
    informationList ? informationList.length : 0,
    informationNodeList ? informationNodeList.length : 0,
  );

  if (max % number !== 0) {
    throw new Error('播放的条数必须能整除于每次展示的条数');
  }

  var maxIdx = Math.floor(max / number);
  var informationListJSX = useMemo(
    function () {
      if (informationNodeList) {
        return cloneReactElementArray(informationNodeList, number);
      }

      return getConcatArray(informationList, number).map(function (information, i) {
        return /*#__PURE__*/ _jsx(
          'li',
          {
            style: {
              height: itemHeight,
              lineHeight: ''.concat(itemHeight, 'px'),
            },
            children: information,
          },
          information + i,
        );
      });
    },
    [informationList, number, informationNodeList],
  );
  useEffect(
    function () {
      if (isEnter) {
        return;
      }

      if (showIdx === 0) {
        clearTimeout(timerRef.current);
        startBroadcastAnimation();
      }
    },
    [showIdx, isEnter],
  );

  var startBroadcastAnimation = function startBroadcastAnimation() {
    timerRef.current = setTimeout(function () {
      var nextIdx = getNextIdx(showIdx, max);
      setStartAnimation(true);
      setShowIdx(nextIdx);
    }, duration);
  };

  var onTransitionEnd = function onTransitionEnd() {
    if (showIdx === maxIdx) {
      setShowIdx(0);
      setStartAnimation(false);
    }

    if (isEnter) {
      return;
    }

    startBroadcastAnimation();
  };

  var onMouseEnter;
  var onMouseLeave;

  if (suspend) {
    onMouseEnter = function onMouseEnter() {
      if (!suspend) {
        return;
      }

      clearTimeout(timerRef.current);
      setIsEnter(true);
    };

    onMouseLeave = function onMouseLeave() {
      setIsEnter(false);
      startBroadcastAnimation();
    };
  }

  return /*#__PURE__*/ _jsx('div', {
    className: classNames(getCls('container'), className),
    style: _objectSpread(
      {
        width: width,
        height: containerHeight,
      },
      style,
    ),
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    onClick: function onClick() {
      var startIdx = showIdx;

      if (showIdx === max) {
        startIdx = 0;
      }

      typeof _onClick === 'function' &&
        _onClick(
          informationNodeList
            ? informationListJSX.slice(startIdx * number, startIdx * number + number)
            : informationList.slice(startIdx * number, startIdx * number + number),
        );
    },
    children: /*#__PURE__*/ _jsx('ul', {
      style: {
        transition: startAnimation ? 'transform '.concat(animationTime, 'ms') : 'none',
        transform: 'translateY(-'.concat(showIdx * moveHeight, 'px)'),
      },
      className: getCls('ul'),
      onTransitionEnd: onTransitionEnd,
      children: informationListJSX,
    }),
  });
};

export default /*#__PURE__*/ React.memo(BroadcastInformation);
