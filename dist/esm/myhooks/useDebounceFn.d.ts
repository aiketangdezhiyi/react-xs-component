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
export declare const useDebounceFn: (
  fn: Function,
  option?: DebounceOptions,
) => {
  run: any;
};
