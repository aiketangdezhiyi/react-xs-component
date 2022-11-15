/**
 * 加载图片，加载完成后调用回调
 * @param src 需要加载的图片
 * @param cb 回调
 */
export declare const loadImage: (src: string, cb?: () => void) => void;
/**
 * 获取图片的原始尺寸
 * @param src
 * @param cb
 */
export declare const getImageSize: (src: string, cb?: ((size: ImageSize) => void) | undefined) => void;
/**
 *
 * @param wrapperPrefix
 * @returns
 */
export declare const setCommonCls: (...wrapperPrefix: string[]) => (className: string) => string;
export declare const setCompCommonCls: (...wrapperPrefix: string[]) => (className: string) => string;
/**
 * 使用js进行链接跳转
 * @param url 跳转的链接
 * @param method 跳转方式 默认空白页跳转
 * @param delayTime 延迟跳转时间 默认 0 单位 ms
 * @param cb 默认跳转前执行的回调 方法调用回调立刻执行
 */
export declare const jsLink: (url?: string, method?: '_self' | '_blank', delayTime?: number, cb?: () => void) => void;
