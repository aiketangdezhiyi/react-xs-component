function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { getImageSize } from 'yuxuannnn_utils';
import { useSetState } from 'ahooks';
import { useEffect, useRef } from 'react';
import { showImageInitState } from "../state";
import { computedImageSize } from "../utils";
/**
 *
 * @param images 图片数组
 * @param showImageIdx 展示图片的索引
 * @param show 是否展示
 * @returns
 */

export var useAdaptivePicture = function useAdaptivePicture(images, showImageIdx, show) {
  // 一个自适应图片的hook 通用性不高 作为组件hook
  var wrapperRef = useRef(null);

  var _useSetState = useSetState(showImageInitState),
      _useSetState2 = _slicedToArray(_useSetState, 2),
      showImageInfo = _useSetState2[0],
      setShowImageInfo = _useSetState2[1];

  var showContainerRef = useRef(null);
  var width = showImageInfo.width,
      height = showImageInfo.height,
      rotateAngle = showImageInfo.rotateAngle,
      magnification = showImageInfo.magnification;
  useEffect(function () {
    // 保证图片变化时，图片比例始终与容器保持最优
    getImageSize(images[showImageIdx]).then(function (imageSize) {
      if (!showContainerRef.current) {
        return;
      }

      var computedInfo = {
        originWidth: imageSize.width,
        originHeight: imageSize.height,
        containerWidth: showContainerRef.current.clientWidth,
        containerHeight: showContainerRef.current.clientHeight,
        rotateAngle: 0
      };
      setShowImageInfo(_objectSpread(_objectSpread(_objectSpread({}, computedInfo), computedImageSize(computedInfo)), {}, {
        magnification: 1
      }));
    });
  }, [showImageIdx, show, images]);
  return {
    showImageInfo: showImageInfo,
    // 展示图片的信息 showImageInfoType
    setShowImageInfo: setShowImageInfo,
    showContainerRef: showContainerRef,
    // 展示图片容器的ref
    wrapperRef: wrapperRef,
    // 底部容器的ref
    width: width,
    height: height,
    rotateAngle: rotateAngle,
    magnification: magnification
  };
};