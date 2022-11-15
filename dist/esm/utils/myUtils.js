/**
 * 加载图片，加载完成后调用回调
 * @param src 需要加载的图片
 * @param cb 回调
 */
export var loadImage = function loadImage(src, cb) {
  var oImg = new Image();

  oImg.onload = function () {
    typeof cb === 'function' && cb();
  };

  oImg.src = src;
};
/**
 * 获取图片的原始尺寸
 * @param src
 * @param cb
 */

export var getImageSize = function getImageSize(src, cb) {
  var oImg = new Image();

  oImg.onload = function () {
    typeof cb === 'function' &&
      cb({
        width: this.naturalWidth,
        height: this.naturalHeight,
      });
  };

  oImg.src = src;
};
/**
 *
 * @param wrapperPrefix
 * @returns
 */

export var setCommonCls = function setCommonCls() {
  for (
    var _len = arguments.length, wrapperPrefix = new Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    wrapperPrefix[_key] = arguments[_key];
  }

  return function (className) {
    return wrapperPrefix.concat(className).reduce(function (prefix, curPrefix) {
      return ''.concat(prefix, '-').concat(curPrefix);
    });
  };
};
export var setCompCommonCls = function setCompCommonCls() {
  for (
    var _len2 = arguments.length, wrapperPrefix = new Array(_len2), _key2 = 0;
    _key2 < _len2;
    _key2++
  ) {
    wrapperPrefix[_key2] = arguments[_key2];
  }

  return setCommonCls.apply(void 0, ['comp'].concat(wrapperPrefix));
};
/**
 * 使用js进行链接跳转
 * @param url 跳转的链接
 * @param method 跳转方式 默认空白页跳转
 * @param delayTime 延迟跳转时间 默认 0 单位 ms
 * @param cb 默认跳转前执行的回调 方法调用回调立刻执行
 */

export var jsLink = function jsLink(url, method, delayTime, cb) {
  if (!url) {
    return;
  }

  var a = document.createElement('a');
  a.href = url;
  a.target = method ? method : '_blank';

  if (delayTime) {
    typeof cb === 'function' && cb();
    setTimeout(function () {
      a.click();
    }, delayTime);
    return;
  }

  a.click();
};
