// 这里写一些关于web性能的工具函数

/**
 * 防抖
 * @param func 执行函数
 * @param delay 延迟时间
 * @returns
 */
export var debounce = function debounce(func) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;
  var timer = void 0;
  return function () {
    var _this = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    clearTimeout(timer);
    timer = setTimeout(function () {
      func.apply(_this, args);
    }, delay);
  };
};
/**
 *
 * @param func
 * @param duration 两次函数执行的时间间隔
 */

export var throttle = function throttle(func, duration) {
  var lastTime = 0;
  return function () {
    var nowTime = Date.now();

    if (nowTime - lastTime >= duration) {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      func.apply(this, args);
      lastTime = nowTime;
    }
  };
};