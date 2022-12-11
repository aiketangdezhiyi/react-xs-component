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

import { usePortraitDrag } from '../myhooks/usePortraitDrag';
import { setCompCommonCls } from '../utils/myUtils';
import classNames from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useEventListener } from 'xshooks';
import './index.less';
import { jsx as _jsx } from 'react/jsx-runtime';
import { jsxs as _jsxs } from 'react/jsx-runtime';

/**
 * 计算滚动块的高度
 * @param containerHeight 容器的高度
 * @param domHeight dom的高度
 */
var computedBarHeight = function computedBarHeight(containerHeight, domHeight) {
  return containerHeight * (containerHeight / domHeight);
};

export default (function (props) {
  var _props$scrollSpeed = props.scrollSpeed,
    scrollSpeed = _props$scrollSpeed === void 0 ? 10 : _props$scrollSpeed,
    barWrapperStyle = props.barWrapperStyle,
    squareStyle = props.squareStyle,
    height = props.height,
    children = props.children,
    style = props.style,
    className = props.className;
  var childrenRef = useRef(null);
  var getCls = setCompCommonCls('custom', 'scroll', 'bar');

  var _useState = useState(0),
    _useState2 = _slicedToArray(_useState, 2),
    barHeight = _useState2[0],
    setBarHeight = _useState2[1];

  var scrollDOMRef = useRef(null);

  var _usePortraitDrag = usePortraitDrag(height - barHeight),
    dragY = _usePortraitDrag.dragY,
    onDragStart = _usePortraitDrag.onDragStart,
    isDragRef = _usePortraitDrag.isDragRef,
    setDragY = _usePortraitDrag.setDragY;

  var _useState3 = useState(0),
    _useState4 = _slicedToArray(_useState3, 2),
    domScrollTop = _useState4[0],
    setDomScrollTop = _useState4[1];

  useEffect(
    function () {
      var _childrenRef$current;

      // 还要考虑类似加载更多的情况
      setBarHeight(
        computedBarHeight(
          height,
          (childrenRef === null || childrenRef === void 0
            ? void 0
            : (_childrenRef$current = childrenRef.current) === null ||
              _childrenRef$current === void 0
            ? void 0
            : _childrenRef$current.offsetHeight) || 0,
        ),
      );
    },
    [childrenRef.current],
  ); // 向children传递ref

  var createChildren = useCallback(
    function () {
      return /*#__PURE__*/ React.cloneElement(children, {
        ref: childrenRef,
      });
    },
    [children],
  );
  useEventListener(
    'wheel',
    function (e) {
      e.preventDefault(); // 注册原生事件阻止父容器滚动

      if (e.deltaY < 0) {
        // 向上
        setDragY(dragY - scrollSpeed);
      } else {
        // 向下
        setDragY(dragY + scrollSpeed);
      }
    },
    {
      target: scrollDOMRef.current,
      passive: false,
    },
  );
  useEffect(
    function () {
      if (!scrollDOMRef.current) {
        return;
      }

      var scrollSpaceHeight = height - barHeight;
      var scrollTop = (dragY / scrollSpaceHeight) * (childrenRef.current.offsetHeight - height);
      scrollDOMRef.current.scrollTop = scrollTop;
      setDomScrollTop(scrollTop);
    },
    [scrollDOMRef.current, dragY],
  );

  if (childrenRef.current && childrenRef.current.offsetHeight <= height) {
    return children;
  }

  return /*#__PURE__*/ _jsxs('div', {
    className: classNames(getCls('container'), isDragRef.current ? 'active' : '', className),
    ref: scrollDOMRef,
    style: _objectSpread(
      {
        height: height,
      },
      style,
    ),
    children: [
      createChildren(),
      /*#__PURE__*/ _jsx('div', {
        className: classNames(getCls('wrapper')),
        style: _objectSpread(
          {
            top: domScrollTop,
          },
          barWrapperStyle,
        ),
        children: /*#__PURE__*/ _jsx('div', {
          className: getCls('yq'),
          onMouseDown: onDragStart,
          style: _objectSpread(
            {
              height: barHeight,
              top: dragY,
            },
            squareStyle,
          ),
        }),
      }),
    ],
  });
});
