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

import { loadImage } from 'yuxuannnn_utils';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import './index.less';
import { jsx as _jsx } from 'react/jsx-runtime';
import { jsxs as _jsxs } from 'react/jsx-runtime';

/**
 * 获取放大镜的中心位置
 * @param e
 * @param originDom 小图片的父元素
 * @param dom 放大镜元素
 * @returns
 */
var getOffset = function getOffset(e, originDom, dom) {
  if (!originDom || !dom) {
    return {
      left: 0,
      top: 0,
    };
  }

  if (e.target === originDom) {
    return {
      left: e.nativeEvent.offsetX,
      top: e.nativeEvent.offsetY,
    };
  } else {
    // mousemove没有事件冒泡
    // 对放大镜事件源也要进行处理
    var style = getComputedStyle(dom);
    var left = parseFloat(style.left);
    var top = parseFloat(style.top);
    return {
      left: e.nativeEvent.offsetX + left + 1,
      //加1是因为边框
      top: e.nativeEvent.offsetY + top + 1,
    };
  }
};

var Magnifier = function Magnifier(props) {
  var Image = props.Image,
    _props$scale = props.scale,
    scale = _props$scale === void 0 ? 1.5 : _props$scale,
    _props$scaleImage = props.scaleImage,
    scaleImage = _props$scaleImage === void 0 ? Image : _props$scaleImage,
    _props$originSize = props.originSize,
    width = _props$originSize.width,
    height = _props$originSize.height;

  var _useState = useState(''),
    _useState2 = _slicedToArray(_useState, 2),
    smallImage = _useState2[0],
    setSmallImage = _useState2[1];

  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    show = _useState4[0],
    setShow = _useState4[1];

  var wrapperDOMRef = useRef(null);
  var overDOMRef = useRef(null);

  var _useState5 = useState({
      left: 0,
      top: 0,
    }),
    _useState6 = _slicedToArray(_useState5, 2),
    magnifierPosition = _useState6[0],
    setMagnifierPosition = _useState6[1]; // 放大镜的位置

  var _useState7 = useState({
      left: 0,
      top: 0,
    }),
    _useState8 = _slicedToArray(_useState7, 2),
    bgPosition = _useState8[0],
    setBgPosition = _useState8[1]; // 放大镜的位置

  loadImage(Image).then(function () {
    setSmallImage(Image);
  });
  var magnifierSize = {
    width: width / 2,
    height: height / 2,
  }; // 放大镜的尺寸

  var bigImageSize = {
    width: width * scale,
    height: height * scale,
  };
  var bgImageSize = {
    width: bigImageSize.width * 2,
    height: bigImageSize.height * 2,
  };
  /**
   * 设置放大镜的位置
   * @param offset 放大镜的中心位置
   * @param MagnifierSize 放大镜尺寸
   * @param smallImageSize 小图片的尺寸
   */

  var refreshMagnifierPosition = function refreshMagnifierPosition(
    offset,
    MagnifierSize,
    smallImageSize,
  ) {
    var left = offset.left,
      top = offset.top;
    var l = left - MagnifierSize.width / 2;
    var t = top - MagnifierSize.height / 2;

    if (l < 0) {
      l = 0;
    }

    if (t < 0) {
      t = 0;
    }

    if (l > smallImageSize.width - MagnifierSize.width) {
      l = smallImageSize.width - MagnifierSize.width;
    }

    if (t > smallImageSize.height - MagnifierSize.height) {
      t = smallImageSize.height - MagnifierSize.height;
    }

    setMagnifierPosition({
      left: l,
      top: t,
    });
  };
  /** 设置背景的位置 */

  var refreshBgPosition = function refreshBgPosition() {
    var left = magnifierPosition.left,
      top = magnifierPosition.top;
    setBgPosition({
      left: left * scale * 2,
      top: top * scale * 2,
    });
  };

  var handleMouseEnter = function handleMouseEnter(e) {
    if (!wrapperDOMRef.current) {
      return;
    }

    setShow(true);
    refreshMagnifierPosition(
      getOffset(e, wrapperDOMRef.current, overDOMRef.current),
      magnifierSize,
      props.originSize,
    );
    refreshBgPosition();
  };

  var handleSquareMove = function handleSquareMove(e) {
    // 放大镜移动
    if (!wrapperDOMRef.current) {
      return;
    }

    refreshMagnifierPosition(
      getOffset(e, wrapperDOMRef.current, overDOMRef.current),
      magnifierSize,
      props.originSize,
    );
    refreshBgPosition();
  };

  var handleMouseLeave = function handleMouseLeave() {
    setShow(false);
  };

  return /*#__PURE__*/ _jsxs('div', {
    className: classNames('magnifier-container', props.className),
    children: [
      /*#__PURE__*/ _jsxs('div', {
        className: 'magnifier-small-wrapper',
        ref: wrapperDOMRef,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onMouseMove: handleSquareMove,
        style: {
          width: width,
          height: height,
        },
        children: [
          /*#__PURE__*/ _jsx('img', {
            src: smallImage,
            alt: '',
          }),
          /*#__PURE__*/ _jsx('div', {
            ref: overDOMRef,
            style: _objectSpread(
              _objectSpread(
                {
                  visibility: show ? 'visible' : 'hidden',
                },
                magnifierSize,
              ),
              magnifierPosition,
            ),
            className: 'magnifier-over-square',
          }),
        ],
      }),
      /*#__PURE__*/ _jsx('div', {
        className: 'magnifier-big-wrapper',
        style: _objectSpread(
          _objectSpread(
            {
              backgroundImage: 'url('.concat(scaleImage, ')'),
              left: width + 5,
            },
            bigImageSize,
          ),
          {},
          {
            backgroundPosition: '-'.concat(bgPosition.left, 'px -').concat(bgPosition.top, 'px'),
            visibility: show ? 'visible' : 'hidden',
            backgroundSize: ''.concat(bgImageSize.width, 'px ').concat(bgImageSize.height, 'px'),
          },
        ),
      }),
    ],
  });
};

export default /*#__PURE__*/ React.memo(Magnifier);
