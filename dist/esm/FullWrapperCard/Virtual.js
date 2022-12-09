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
import { ArrowLeftOutlined, ExpandOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { setCommonCls, jsLink } from '../utils/myUtils';
import Loading from '../Loading';
import classNames from 'classnames';
import { useSetState } from 'ahooks';
import { rotateAngleArr } from './type';
import { initBottomState } from './state';
import FunctionButtonGroup from './components/FunctionButtonGroup';
import { computedImageSize, getMagnification, getTransverseVirtualListInfo } from './utils';
import CYQMessage from '../CYQMessage';
import { useResize } from '../myhooks/useRezie';
import { useAdaptivePicture } from './hooks/useAdaptivePicture';
import { useCounterControl } from '../myhooks/useCounterControl';
import { loadImage, boundary, boundaryMax, boundaryMin } from 'yuxuannnn_utils';
import { jsx as _jsx } from 'react/jsx-runtime';
import { Fragment as _Fragment } from 'react/jsx-runtime';
import { jsxs as _jsxs } from 'react/jsx-runtime';

var FullWrapperCard = function FullWrapperCard(props) {
  var _props$images = props.images,
    images = _props$images === void 0 ? [] : _props$images,
    style = props.style,
    className = props.className,
    _props$show = props.show,
    show = _props$show === void 0 ? false : _props$show,
    onMaskClick = props.onMaskClick,
    _props$bottomImageWid = props.bottomImageWidth,
    bottomImageWidth = _props$bottomImageWid === void 0 ? 60 : _props$bottomImageWid,
    _props$preloadNum = props.preloadNum,
    preloadNum = _props$preloadNum === void 0 ? 27 : _props$preloadNum,
    _props$messagePlaying = props.messagePlayingTime,
    messagePlayingTime = _props$messagePlaying === void 0 ? 1000 : _props$messagePlaying,
    _props$scale = props.scale,
    scale = _props$scale === void 0 ? 0.25 : _props$scale;

  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    showFullWrapper = _useState2[0],
    setShowFullWrapper = _useState2[1]; // 是否展示全容器图片组件

  var _useCounterControl = useCounterControl(images.length, 0, 100),
    showImageIdx = _useCounterControl.count,
    setShowImageIdx = _useCounterControl.setCount,
    handleChangeLeft = _useCounterControl.handleDecrease,
    handleChangeRight = _useCounterControl.handleIncrease,
    handleDecreaseWithDebounce = _useCounterControl.handleDecreaseWithDebounce,
    handleIncreaseWithDebounce = _useCounterControl.handleIncreaseWithDebounce;

  var _useState3 = useState(preloadNum),
    _useState4 = _slicedToArray(_useState3, 2),
    loadIdx = _useState4[0],
    setLoadIdx = _useState4[1]; // 已经加载到哪一张图片的索引

  var _useAdaptivePicture = useAdaptivePicture(images, showImageIdx, show),
    wrapperRef = _useAdaptivePicture.wrapperRef,
    showImageInfo = _useAdaptivePicture.showImageInfo,
    setShowImageInfo = _useAdaptivePicture.setShowImageInfo,
    showContainerRef = _useAdaptivePicture.showContainerRef;

  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    showCYQMessage = _useState6[0],
    setShowCYQMessage = _useState6[1];

  var _useSetState = useSetState(initBottomState),
    _useSetState2 = _slicedToArray(_useSetState, 2),
    _useSetState2$ = _useSetState2[0],
    offsetWidth = _useSetState2$.offsetWidth,
    scrollWidth = _useSetState2$.scrollWidth,
    isBottomOverflow = _useSetState2$.isBottomOverflow,
    left = _useSetState2$.left,
    resize = _useSetState2$.resize,
    setBottomStatus = _useSetState2[1];

  var getCls = setCommonCls('comp', 'full');
  var width = showImageInfo.width,
    height = showImageInfo.height,
    rotateAngle = showImageInfo.rotateAngle,
    magnification = showImageInfo.magnification;
  var imageContainerWidth = bottomImageWidth + 6; // 6是两个外边距

  useEffect(
    function () {
      if (typeof show === 'boolean') {
        // 这个组件变成受控组件
        setShowFullWrapper(show);
      }
    },
    [show],
  );
  useEffect(
    function () {
      if (showFullWrapper === false) return; // 组件被多次复用时图片数据发生变化时处理的一些逻辑

      var src = images[0] ? images[0] : '';
      setLoadIdx(preloadNum);
      setBottomStatus(initBottomState);
      loadImage(src).then(function () {
        setShowImageIdx(0);
      });
    },
    [showFullWrapper, images],
  );
  useEffect(
    function () {
      if (showFullWrapper) {
        document.body.style.overflowY = 'hidden';
      } else {
        document.body.style.overflowY = 'auto';
      }

      return function () {
        document.body.style.overflowY = 'auto';
      };
    },
    [showFullWrapper],
  );
  useEffect(
    function () {
      if (!showFullWrapper || !showContainerRef.current) {
        return;
      }

      setShowImageInfo(computedImageSize(showImageInfo));
    },
    [rotateAngle],
  );
  useResize(function () {
    // 处理当屏幕大小改变之后的一些问题
    setBottomStatus(initBottomState);
  }, 100);
  useEffect(
    function () {
      if (!wrapperRef.current) {
        return;
      }

      if (offsetWidth > 0 && scrollWidth > 0) {
        return;
      }

      if (!resize) {
        return;
      } // 开启虚拟列表

      setBottomStatus({
        scrollWidth: imageContainerWidth * images.length,
        offsetWidth: wrapperRef.current.offsetWidth - 60,
        // 60 是按钮的大小
        isBottomOverflow: imageContainerWidth * images.length > wrapperRef.current.offsetWidth,
        resize: false,
      });
    },
    [wrapperRef.current, showFullWrapper, images, resize],
  );
  var imgList = useMemo(
    function () {
      // 当图片的整体数量不超过容器时要做居中处理
      if (scrollWidth <= offsetWidth) {
        return images.map(function (imgSrc, i) {
          return /*#__PURE__*/ _jsx(
            'div',
            {
              className: getCls('item'),
              onClick: function onClick() {
                setShowImageIdx(i);
              },
              children: /*#__PURE__*/ _jsx('img', {
                src: i < loadIdx ? imgSrc : '',
                style: {
                  width: bottomImageWidth,
                  height: bottomImageWidth,
                },
                className: images[showImageIdx] === imgSrc ? 'active' : '',
                alt: '',
              }),
            },
            imgSrc,
          );
        });
      }

      var _getTransverseVirtual = getTransverseVirtualListInfo(
          imageContainerWidth,
          left,
          offsetWidth,
          images.length,
        ),
        width = _getTransverseVirtual.width,
        startIdx = _getTransverseVirtual.startIdx,
        endIdx = _getTransverseVirtual.endIdx,
        startDomLeft = _getTransverseVirtual.startDomLeft;

      var virtualList = []; // 虚拟列表

      var _loop = function _loop(i, j) {
        var imgSrc = images[i];
        virtualList.push(
          /*#__PURE__*/ _jsx(
            'div',
            {
              style: {
                position: 'absolute',
                left: startDomLeft + width * j,
              },
              className: getCls('item'),
              onClick: function onClick() {
                setShowImageIdx(i);
              },
              children: /*#__PURE__*/ _jsx('img', {
                src: i < loadIdx ? imgSrc : '',
                style: {
                  width: bottomImageWidth,
                  height: bottomImageWidth,
                },
                className: images[showImageIdx] === imgSrc ? 'active' : '',
                alt: '',
              }),
            },
            imgSrc,
          ),
        );
      };

      for (var i = startIdx, j = 0; i <= endIdx; i++, j++) {
        _loop(i, j);
      }

      return virtualList;
    },
    [images, scrollWidth, offsetWidth, left, showFullWrapper, showImageIdx, loadIdx],
  );

  var handleMaskHidden = function handleMaskHidden(e) {
    if (e.target === showContainerRef.current) {
      if (typeof show === 'boolean') {
        onMaskClick && onMaskClick(show);
        return;
      }

      setShowFullWrapper(false);
    }
  };

  var handleTranslateLeft = function handleTranslateLeft() {
    var n = Math.floor(offsetWidth / bottomImageWidth);
    var translateX = boundaryMin(left - n * imageContainerWidth, 0);
    setBottomStatus({
      left: translateX,
    });
  };

  var handleTranslateRight = function handleTranslateRight() {
    var n = Math.floor(offsetWidth / imageContainerWidth);
    var max = scrollWidth - offsetWidth + 60; // 60是按钮的宽度

    var translateX = boundaryMax(left + n * imageContainerWidth, max);
    setBottomStatus({
      left: translateX,
    });
  };

  useEffect(
    function () {
      // 处理下部图片滑动时请求的图片数量
      var boundIdx = Math.ceil((left + offsetWidth) / imageContainerWidth);

      if (boundIdx > loadIdx && loadIdx < images.length) {
        setLoadIdx(boundIdx + 5);
      }
    },
    [left],
  ); // 功能性按钮

  var handleFullScreenImage = function handleFullScreenImage() {
    jsLink(images[showImageIdx]);
  };

  var handleRotateLeft = function handleRotateLeft() {
    setShowImageInfo({
      rotateAngle: (rotateAngle - 1 + 4) % 4,
    });
  };

  var handleRotateRight = function handleRotateRight() {
    setShowImageInfo({
      rotateAngle: (rotateAngle + 1 + 4) % 4,
    });
  };

  var handleScale = function handleScale(scale) {
    setShowImageInfo({
      magnification: getMagnification(scale, magnification),
    });
    setShowCYQMessage(true);
    requestAnimationFrame(function () {
      setShowCYQMessage(false);
    });
  };

  var handleScaleBig = function handleScaleBig() {
    handleScale(scale);
  };

  var handleScaleSmall = function handleScaleSmall() {
    handleScale(-scale);
  };

  var handleRelocation = function handleRelocation() {
    // 定位到当前图片
    var n = Math.floor(offsetWidth / imageContainerWidth / 2);
    setBottomStatus({
      left: boundary((showImageIdx - n) * imageContainerWidth, 0, scrollWidth - offsetWidth + 60), // 6 是两个外边距
    });
  };

  return /*#__PURE__*/ _jsxs('div', {
    className: classNames(getCls('wrapper'), className),
    style: _objectSpread(
      {
        display: showFullWrapper ? 'block' : 'none',
      },
      style,
    ),
    children: [
      images[showImageIdx] === ''
        ? /*#__PURE__*/ _jsx(Loading, {})
        : /*#__PURE__*/ _jsxs('div', {
            ref: showContainerRef,
            onWheelCapture: function onWheelCapture(e) {
              e.stopPropagation();
              e.preventDefault();

              if (e.deltaY < 0) {
                // 上一张图片
                handleDecreaseWithDebounce();
              } else {
                handleIncreaseWithDebounce();
              }
            },
            className: getCls('show-container'),
            onClick: handleMaskHidden,
            style: {
              height: 'calc(100% - '.concat(bottomImageWidth + 20, 'px)'),
            },
            children: [
              /*#__PURE__*/ _jsx(FunctionButtonGroup, {
                style: {
                  position: 'absolute',
                  right: '2vw',
                  top: '2vw',
                  zIndex: 10,
                },
                btnTypeGroup: [
                  'full',
                  'left-rotate',
                  'right-rotate',
                  'scale-small',
                  'scale-big',
                  'location',
                  'download',
                ],
                btnTypeGroupClick: [
                  handleFullScreenImage,
                  handleRotateLeft,
                  handleRotateRight,
                  handleScaleSmall,
                  handleScaleBig,
                  handleRelocation,
                ],
              }),
              /*#__PURE__*/ _jsx(CYQMessage, {
                show: showCYQMessage,
                showTime: messagePlayingTime,
                duration: 600,
                children: /*#__PURE__*/ _jsxs(_Fragment, {
                  children: [
                    /*#__PURE__*/ _jsx(ExpandOutlined, {
                      style: {
                        fontSize: 25,
                        marginRight: 5,
                      },
                    }),
                    Math.floor(magnification * 100),
                    '%',
                  ],
                }),
              }),
              /*#__PURE__*/ _jsx('div', {
                className: classNames(getCls('show-btn'), getCls('show-back')),
                onClick: function onClick() {
                  onMaskClick && onMaskClick(show);
                  setShowFullWrapper(false);
                },
                children: /*#__PURE__*/ _jsx(ArrowLeftOutlined, {}),
              }),
              /*#__PURE__*/ _jsx('div', {
                className: classNames(getCls('show-btn'), getCls('show-left')),
                onClick: handleChangeLeft,
                children: /*#__PURE__*/ _jsx(LeftOutlined, {}),
              }),
              /*#__PURE__*/ _jsx('div', {
                className: classNames(getCls('show-btn'), getCls('show-right')),
                onClick: handleChangeRight,
                children: /*#__PURE__*/ _jsx(RightOutlined, {}),
              }),
              /*#__PURE__*/ _jsx('img', {
                style: {
                  width: width * magnification,
                  height: height * magnification,
                  transform: 'rotate('.concat(rotateAngleArr[rotateAngle], 'deg)'),
                },
                src: images[showImageIdx] ? images[showImageIdx] : '',
                alt: '',
              }),
            ],
          }),
      /*#__PURE__*/ _jsxs('div', {
        className: getCls('bottom-container'),
        style: {
          height: bottomImageWidth + 20,
        },
        ref: wrapperRef,
        children: [
          isBottomOverflow
            ? /*#__PURE__*/ _jsxs(_Fragment, {
                children: [
                  /*#__PURE__*/ _jsx('div', {
                    className: classNames(getCls('bottom-btn-left'), getCls('bottom-btn')),
                    onClick: handleTranslateLeft,
                    style: {
                      height: bottomImageWidth,
                    },
                    children: /*#__PURE__*/ _jsx(LeftOutlined, {}),
                  }),
                  /*#__PURE__*/ _jsx('div', {
                    className: classNames(getCls('bottom-btn-right'), getCls('bottom-btn')),
                    onClick: handleTranslateRight,
                    style: {
                      height: bottomImageWidth,
                    },
                    children: /*#__PURE__*/ _jsx(RightOutlined, {}),
                  }),
                ],
              })
            : null,
          /*#__PURE__*/ _jsx('div', {
            style: {
              transform: 'translateX(-'.concat(left, 'px)'),
              width: scrollWidth > offsetWidth ? scrollWidth : 'auto',
              height: bottomImageWidth,
            },
            className: getCls('bottom-list'),
            children: imgList,
          }),
        ],
      }),
    ],
  });
};

export default /*#__PURE__*/ React.memo(FullWrapperCard);
