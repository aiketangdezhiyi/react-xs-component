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

import React, { useEffect, useMemo, useState } from 'react';
import './index.less';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { setCompCommonCls } from '../utils/myUtils';
import Loading from '../Loading';
import classNames from 'classnames';
import { loadImage } from 'yuxuannnn_utils';
import { jsx as _jsx } from 'react/jsx-runtime';
import { jsxs as _jsxs } from 'react/jsx-runtime';

var ImageCard = function ImageCard(props) {
  var _props$images = props.images,
    images = _props$images === void 0 ? [] : _props$images,
    _props$size = props.size,
    size = _props$size === void 0 ? 450 : _props$size,
    style = props.style,
    className = props.className;

  var _useState = useState(''),
    _useState2 = _slicedToArray(_useState, 2),
    showImage = _useState2[0],
    setShowImage = _useState2[1];

  var _useState3 = useState(0),
    _useState4 = _slicedToArray(_useState3, 2),
    translateX = _useState4[0],
    setTranslateX = _useState4[1];

  var getCls = setCompCommonCls('img');
  useEffect(
    function () {
      var src = images[0] ? images[0] : '';
      loadImage(src).then(function () {
        setShowImage(src);
      });
    },
    [images],
  );
  var ImgList = useMemo(
    function () {
      return images.map(function (imgSrc) {
        return /*#__PURE__*/ _jsx(
          'div',
          {
            className: classNames(getCls('item')),
            onClick: function onClick() {
              setShowImage(imgSrc);
            },
            children: /*#__PURE__*/ _jsx('img', {
              src: imgSrc,
              className: showImage === imgSrc ? 'active' : '',
              alt: '',
            }),
          },
          imgSrc,
        );
      });
    },
    [images, showImage],
  );

  var handleCardListRight = function handleCardListRight() {
    // 图片向右滑动
    var newX = translateX - (size - 120);
    var max = -66 * images.length + (size - 120);

    if (newX < 0 && newX < max) {
      newX = max;
    }

    setTranslateX(newX);
  };

  var handleCardListLeft = function handleCardListLeft() {
    // 图片向左滑动
    var newX = translateX + (size - 120);

    if (newX >= 0) {
      newX = 0;
    }

    setTranslateX(newX);
  };

  return /*#__PURE__*/ _jsxs('div', {
    className: classNames(getCls('list-wrapper'), className),
    style: _objectSpread(
      {
        width: size,
      },
      style,
    ),
    children: [
      showImage === ''
        ? /*#__PURE__*/ _jsx(Loading, {
            style: {
              width: size,
              height: size,
            },
          })
        : /*#__PURE__*/ _jsx('div', {
            className: classNames(getCls('show-container')),
            style: {
              width: size,
              height: size,
            },
            children: /*#__PURE__*/ _jsx('img', {
              src: showImage,
              alt: '',
            }),
          }),
      /*#__PURE__*/ _jsxs('div', {
        className: classNames(getCls('bottom-container')),
        children: [
          /*#__PURE__*/ _jsx('span', {
            className: 'left',
            onClick: handleCardListLeft,
            children: /*#__PURE__*/ _jsx(DoubleLeftOutlined, {}),
          }),
          /*#__PURE__*/ _jsx('span', {
            className: 'right',
            onClick: handleCardListRight,
            children: /*#__PURE__*/ _jsx(DoubleRightOutlined, {}),
          }),
          /*#__PURE__*/ _jsx('div', {
            className: 'comp-img-bottom-list',
            style: {
              transform: 'translateX('.concat(translateX, 'px)'),
            },
            children: ImgList,
          }),
        ],
      }),
    ],
  });
};

export default /*#__PURE__*/ React.memo(ImageCard);
