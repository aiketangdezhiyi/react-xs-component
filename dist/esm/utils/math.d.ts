/** 限制最小值 */
export declare const boundaryMin: (value: number, min: number) => number;
/** 限制最大值 */
export declare const boundaryMax: (value: number, max: number) => number;
/**
 * 给定一个值和能取到的最大值以及最小值，返回边界内的数据，能取到边界值
 * @param value
 * @param min
 * @param max
 */
export declare const boundary: (value: number, min: number, max: number) => number;
