/** 限制最小值 */
export const boundaryMin = (value: number, min: number) => {
  return value >= min ? value : min;
};

/** 限制最大值 */
export const boundaryMax = (value: number, max: number) => {
  return value <= max ? value : max;
};

/**
 * 给定一个值和能取到的最大值以及最小值，返回边界内的数据，能取到边界值
 * @param value
 * @param min
 * @param max
 */
export const boundary = (value: number, min: number, max: number) => {
  value = boundaryMin(value, min);
  return boundaryMax(value, max);
};