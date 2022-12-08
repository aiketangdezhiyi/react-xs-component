// 这里写一些关于web性能的工具函数

import { Timeout } from 'ahooks/lib/useRequest/src/types';

/**
 * 防抖
 * @param func 执行函数
 * @param delay 延迟时间
 * @returns
 */
export const debounce = (func: Function, delay: number = 3000) => {
  let timer: any = void 0;
  return function (this: unknown, ...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

/**
 *
 * @param func
 * @param duration 两次函数执行的时间间隔
 */
export const throttle = (func: Function, duration: number) => {
  let lastTime = 0;
  return function (this: unknown, ...args: any[]) {
    const nowTime = Date.now();
    if (nowTime - lastTime >= duration) {
      func.apply(this, args);
      lastTime = nowTime;
    }
  };
};
