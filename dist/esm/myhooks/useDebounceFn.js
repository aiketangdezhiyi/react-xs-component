var _this = this;

import { debounce } from 'lodash';
import { useMemo } from 'react';
import { useLatest } from './useLatest';

/**
 * 对某个函数进行
 */
export var useDebounceFn = function useDebounceFn(fn, option) {
  var _option$wait;

  var fnRef = useLatest(fn); // 实时获取最新的函数引用

  var wait =
    (_option$wait = option === null || option === void 0 ? void 0 : option.wait) !== null &&
    _option$wait !== void 0
      ? _option$wait
      : 1000; // 等待时间，单位为毫秒

  var fnWithDebounce = useMemo(function () {
    return debounce(
      function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var result = fnRef.current.apply(_this, args);
        return result;
      },
      wait,
      option,
    );
  }, []);
  return {
    run: fnWithDebounce,
  };
};
