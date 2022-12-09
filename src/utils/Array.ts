import { deepClone } from 'yuxuannnn_utils';

/** 返回一个由data填充且长度为length的数组 */
export const getArray = (length: number, data?: any) => {
  // map会忽略空值
  data = data ? data : 0;
  return new Array(length).fill(data);
};

/** 复制数组的开头一部分填充到数组的最后 用于制作无缝轮播 */
export const getConcatArray = (arr: any[], number: number) => {
  return arr.concat(deepClone(arr).slice(0, number));
};
