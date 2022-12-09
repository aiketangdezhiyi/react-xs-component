function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { throttle } from 'yuxuannnn_utils';
import { useCallback, useEffect, useRef, useState } from 'react';
/**
 *
 * @param max
 * @param initCounter
 * @param duration 节流的时间
 * @returns
 */

export var useCounterControl = function useCounterControl(max, initCounter, duration) {
  var _useState = useState(initCounter === undefined ? 0 : initCounter),
      _useState2 = _slicedToArray(_useState, 2),
      count = _useState2[0],
      setCount = _useState2[1];

  var counterRef = useRef(initCounter === undefined ? 0 : initCounter);
  duration = duration !== undefined ? duration : 1000;
  useEffect(function () {
    counterRef.current = count; // 双向绑定 保证更新不出错
  }, [count]);
  var handleDecrease = useCallback(function () {
    counterRef.current = (counterRef.current - 1 + max) % max;
    setCount(counterRef.current);
  }, [max]);
  var handleIncrease = useCallback(function () {
    counterRef.current = (counterRef.current + 1) % max;
    setCount(counterRef.current);
  }, [max]);
  var handleIncreaseWithDebounce = useCallback(throttle(handleIncrease, duration), [handleIncrease, duration]);
  var handleDecreaseWithDebounce = useCallback(throttle(handleDecrease, duration), [handleDecrease, duration]);
  return {
    count: count,
    handleIncrease: handleIncrease,
    handleDecrease: handleDecrease,
    handleIncreaseWithDebounce: handleIncreaseWithDebounce,
    handleDecreaseWithDebounce: handleDecreaseWithDebounce,
    setCount: setCount
  };
};