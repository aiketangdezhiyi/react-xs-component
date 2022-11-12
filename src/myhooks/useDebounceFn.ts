import { debounce } from "lodash";
import { useMemo } from "react";
import { useLatest } from "./useLatest";

export interface DebounceOptions {
  /** 等待时间，单位为毫秒 默认值1000 */
  wait?: number;
  /** 是否在延迟开始前调用函数 默认值false */
  leading?: boolean;
  /** 是否在延迟开始后调用函数 默认值true */
  trailing?: boolean;
  /** 最大等待时间，单位为毫秒 */
  maxWait?: number;
}

/**
 * 对某个函数进行
 */
export const useDebounceFn = (fn: Function, option?: DebounceOptions) => {
  const fnRef = useLatest(fn); // 实时获取最新的函数引用

  const wait = option?.wait ?? 1000; // 等待时间，单位为毫秒

  const fnWithDebounce = useMemo(
    () =>
      debounce(
        (...args) => {
          const result = fnRef.current.apply(this, args);
          return result;
        },
        wait,
        option
      ),
    []
  );
  return {
    run: fnWithDebounce,
  };
};
