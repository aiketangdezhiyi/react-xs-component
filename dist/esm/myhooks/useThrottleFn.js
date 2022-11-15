var _this = this;

import { throttle } from 'lodash';
import { useMemo } from 'react';
import { useLatest } from './useLatest';
export var useThrottleFn = function useThrottleFn(fn, option) {
  var _option$wait;

  var fnRef = useLatest(fn);
  var wait =
    (_option$wait = option === null || option === void 0 ? void 0 : option.wait) !== null &&
    _option$wait !== void 0
      ? _option$wait
      : 1000; // 执行周期

  var fnWithThrottle = useMemo(function () {
    return throttle(
      function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return fnRef.current.apply(_this, args); // 这里为什么不会犯https://blog.csdn.net/weixin_45696837/article/details/125862942?spm=1001.2014.3001.5502的错误?
      },
      wait,
      option,
    );
  }, []);
  return {
    run: fnWithThrottle,
  };
};
