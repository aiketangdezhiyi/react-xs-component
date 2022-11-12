import { MyObject } from '../type';

/** 返回一个由data填充且长度为length的数组 */
export const getArray = (length: number, data?: any) => {
  // map会忽略空值
  data = data ? data : 0;
  return new Array(length).fill(data);
};

export const getObjOrArrayType = (obj: any) => {
  if (typeof obj !== 'object') {
    return undefined;
  }
  const type = Object.prototype.toString.call(obj);
  if (type === '[object Object]') {
    return 'object';
  } else if (type === '[object Array]') {
    return 'array';
  }
  return undefined;
};
const deepCloneArr = (arr: Array<any>): Array<any> => {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== 'object') {
      result[i] = arr[i];
    } else {
      result[i] = deepClone(arr[i]);
    }
  }
  return result;
};

const deepCloneObj = (obj: MyObject) => {
  const result: MyObject = {};
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      if (typeof obj[prop] !== 'object') {
        result[prop] = obj[prop];
      } else {
        result[prop] = deepClone(obj[prop]);
      }
    }
  }
  return result;
};

export const deepClone = (obj: any) => {
  if (typeof obj !== 'object') {
    return obj;
  }
  if (getObjOrArrayType(obj) === 'object') {
    return deepCloneObj(obj);
  }
  if (getObjOrArrayType(obj) === 'array') {
    return deepCloneArr(obj);
  }
};

/** 复制数组的开头一部分填充到数组的最后 用于制作无缝轮播 */
export const getConcatArray = (arr: any[], number: number) => {
  return arr.concat(deepClone(arr).slice(0, number));
};
