export interface ThrottleOptions {
    /** 等待时间，单位为毫秒  默认值为1000 */
    wait?: number;
    /** 是否在延迟开始前调用函数 默认true */
    leading?: boolean;
    /** 是否在延迟开始后调用函数 默认true */
    trailing?: boolean;
}
export declare const useThrottleFn: (fn: Function, option?: ThrottleOptions) => {
    run: any;
};
