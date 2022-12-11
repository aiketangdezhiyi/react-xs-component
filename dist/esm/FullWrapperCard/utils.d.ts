import { virtualListType } from './type';
export declare type computedInfoType = {
    originWidth: number;
    originHeight: number;
    containerWidth: number;
    containerHeight: number;
    rotateAngle: number;
};
/**
 * 通过给定数据计算出合适的图片展示宽高
 * @param rotateInfo
 */
export declare const computedImageSize: (rotateInfo: computedInfoType) => {
    width: number;
    height: number;
};
/** 获取放大的倍数 */
export declare const getMagnification: (scale: number, magnification: number) => number;
/**
 * 获取横向虚拟列表的一些信息
 * 简单一点 元素的宽高是固定，非动态
 * 第一步 我先知道我要渲染第几个元素 渲染结束的索引 距离开始的位置是多少
 * @param width 每一个元素的宽度
 * @param left 当前定位的左边界
 * @param offsetWith 容器元素展示区域的宽度
 * @param reality dom真实数量
 */
export declare const getTransverseVirtualListInfo: (width: number, left: number, offsetWith: number, reality: number) => virtualListType;
