/** 限制最小值 */
export var boundaryMin = function boundaryMin(value, min) {
  return value >= min ? value : min;
};
/** 限制最大值 */

export var boundaryMax = function boundaryMax(value, max) {
  return value <= max ? value : max;
};
/**
 * 给定一个值和能取到的最大值以及最小值，返回边界内的数据，能取到边界值
 * @param value
 * @param min
 * @param max
 */

export var boundary = function boundary(value, min, max) {
  value = boundaryMin(value, min);
  return boundaryMax(value, max);
};
