function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/** 返回一个由data填充且长度为length的数组 */
export var getArray = function getArray(length, data) {
  // map会忽略空值
  data = data ? data : 0;
  return new Array(length).fill(data);
};
export var getObjOrArrayType = function getObjOrArrayType(obj) {
  if (_typeof(obj) !== 'object') {
    return undefined;
  }

  var type = Object.prototype.toString.call(obj);

  if (type === '[object Object]') {
    return 'object';
  } else if (type === '[object Array]') {
    return 'array';
  }

  return undefined;
};

var deepCloneArr = function deepCloneArr(arr) {
  var result = [];

  for (var i = 0; i < arr.length; i++) {
    if (_typeof(arr[i]) !== 'object') {
      result[i] = arr[i];
    } else {
      result[i] = deepClone(arr[i]);
    }
  }

  return result;
};

var deepCloneObj = function deepCloneObj(obj) {
  var result = {};

  for (var prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      if (_typeof(obj[prop]) !== 'object') {
        result[prop] = obj[prop];
      } else {
        result[prop] = deepClone(obj[prop]);
      }
    }
  }

  return result;
};

export var deepClone = function deepClone(obj) {
  if (_typeof(obj) !== 'object') {
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

export var getConcatArray = function getConcatArray(arr, number) {
  return arr.concat(deepClone(arr).slice(0, number));
};