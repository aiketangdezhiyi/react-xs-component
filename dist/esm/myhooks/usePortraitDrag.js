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

import { boundary } from '../utils/math';
import { useLatest } from 'ahooks';
import { useRef, useState } from 'react';
import { useForce } from './useForce';
import { useMount } from './useMount';
/** 纵向拖拽 */

export var usePortraitDrag = function usePortraitDrag(maxTop) {
  var _useState = useState(0),
    _useState2 = _slicedToArray(_useState, 2),
    dragY = _useState2[0],
    _setDragY = _useState2[1];

  var isDragRef = useRef(false);
  var lastDragYRef = useRef(0);
  var dragStartPosRef = useRef(0);
  var maxTopRef = useLatest(maxTop);

  var _useForce = useForce(),
    refresh = _useForce.refresh;

  var onDragStart = function onDragStart(e) {
    dragStartPosRef.current = e.screenY;
    isDragRef.current = true;
    lastDragYRef.current = dragY;
    refresh();
  };

  var onDragEnd = function onDragEnd() {
    isDragRef.current = false;
    refresh();
  };

  var onDragMove = function onDragMove(e) {
    if (!isDragRef.current) {
      return;
    }

    var disY = e.screenY - dragStartPosRef.current;

    _setDragY(boundary(lastDragYRef.current + disY, 0, maxTopRef.current));
  };

  useMount(function () {
    document.addEventListener('mousemove', onDragMove);
    return function () {
      document.removeEventListener('mousemove', onDragMove);
    };
  });
  useMount(function () {
    document.addEventListener('mouseup', onDragEnd);
    return function () {
      document.removeEventListener('mouseup', onDragEnd);
    };
  });
  return {
    dragY: dragY,
    onDragStart: onDragStart,
    isDragRef: isDragRef,
    setDragY: function setDragY(newDragY) {
      _setDragY(boundary(newDragY, 0, maxTopRef.current));
    },
  };
};
