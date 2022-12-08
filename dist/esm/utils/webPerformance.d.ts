/**
 * 防抖
 * @param func 执行函数
 * @param delay 延迟时间
 * @returns
 */
export declare const debounce: (func: Function, delay?: number) => (...args: any[]) => void;
/**
 *
 * @param func
 * @param duration 两次函数执行的时间间隔
 */
export declare const throttle: (func: Function, duration: number) => (...args: any[]) => void;
