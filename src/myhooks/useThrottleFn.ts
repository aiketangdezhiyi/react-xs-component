import { throttle } from "lodash";
import { useMemo } from "react";
import { useLatest } from "./useLatest";
export interface ThrottleOptions {
  /** 等待时间，单位为毫秒  默认值为1000 */
  wait?: number;
  /** 是否在延迟开始前调用函数 默认true */
  leading?: boolean;
  /** 是否在延迟开始后调用函数 默认true */
  trailing?: boolean;
}
export const useThrottleFn = (fn: Function, option?: ThrottleOptions) => {
  const fnRef = useLatest<Function>(fn);
  const wait = option?.wait ?? 1000; // 执行周期
  const fnWithThrottle = useMemo(
    () =>
      throttle(
        (...args) => {
          return fnRef.current.apply(this, args); // 这里为什么不会犯https://blog.csdn.net/weixin_45696837/article/details/125862942?spm=1001.2014.3001.5502的错误?
        },
        wait,
        option
      ),
    []
  );
  return {
    run: fnWithThrottle,
  };
};
