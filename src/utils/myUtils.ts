import { ImageSize } from '../type';

/**
 * 加载图片，加载完成后调用回调
 * @param src 需要加载的图片
 * @param cb 回调
 */
export const loadImage = (src: string, cb?: () => void) => {
  const oImg = new Image();
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
export const getImageSize = (src: string, cb?: (size: ImageSize) => void) => {
  const oImg = new Image();
  oImg.onload = function () {
    typeof cb === 'function' &&
      cb({
        width: (this as any).naturalWidth,
        height: (this as any).naturalHeight,
      });
  };
  oImg.src = src;
};

/**
 *
 * @param wrapperPrefix
 * @returns
 */
export const setCommonCls = (...wrapperPrefix: string[]) => {
  return (className: string) =>
    wrapperPrefix.concat(className).reduce((prefix, curPrefix) => `${prefix}-${curPrefix}`);
};

export const setCompCommonCls = (...wrapperPrefix: string[]) => {
  return setCommonCls('comp', ...wrapperPrefix);
};

/**
 * 使用js进行链接跳转
 * @param url 跳转的链接
 * @param method 跳转方式 默认空白页跳转
 * @param delayTime 延迟跳转时间 默认 0 单位 ms
 * @param cb 默认跳转前执行的回调 方法调用回调立刻执行
 */
export const jsLink = (
  url?: string,
  method?: '_self' | '_blank',
  delayTime?: number,
  cb?: () => void,
) => {
  if (!url) {
    return;
  }
  const a = document.createElement('a');
  a.href = url;
  a.target = method ? method : '_blank';
  if (delayTime) {
    typeof cb === 'function' && cb();
    setTimeout(() => {
      a.click();
    }, delayTime);
    return;
  }
  a.click();
};
