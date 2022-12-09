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
