import { boundary, boundaryMax, boundaryMin } from 'yuxuannnn_utils';
import { ERotateAngle, virtualListType } from './type';

export type computedInfoType = {
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
export const computedImageSize = (rotateInfo: computedInfoType) => {
  let { originHeight, originWidth, containerHeight, containerWidth, rotateAngle } = rotateInfo;
  // 有个非常巧妙的处理过程 图片不看内容的话 是不是旋转一下就是图片的宽高改变了
  if (
    rotateAngle === ERotateAngle.ninety ||
    rotateAngle === ERotateAngle['two hundred and seventy']
  ) {
    [containerWidth, containerHeight] = [containerHeight, containerWidth];
  }

  // 下面的处理过程适用
  const widthRate = originWidth / containerWidth;
  const heightRate = originHeight / containerHeight;
  if (widthRate > heightRate) {
    // 比值大的一边撑满
    return {
      width: containerWidth,
      height: originHeight / widthRate,
    };
  } else {
    return {
      width: originWidth / heightRate,
      height: containerHeight,
    };
  }
};

/** 获取放大的倍数 */
export const getMagnification = (scale: number, magnification: number) => {
  return boundary(magnification + scale, 0.1, 3);
};

/**
 * 获取横向虚拟列表的一些信息
 * 简单一点 元素的宽高是固定，非动态
 * 第一步 我先知道我要渲染第几个元素 渲染结束的索引 距离开始的位置是多少
 * @param width 每一个元素的宽度
 * @param left 当前定位的左边界
 * @param offsetWith 容器元素展示区域的宽度
 * @param reality dom真实数量
 */
export const getTransverseVirtualListInfo = (
  width: number,
  left: number,
  offsetWith: number,
  reality: number,
): virtualListType => {
  const startIdx = boundaryMin(Math.floor(left / width) - 10, 0);
  const endIdx = boundaryMax(Math.ceil((left + offsetWith) / width) + 10, reality - 1);

  const startDomLeft = startIdx * width;

  return {
    width,
    startIdx,
    endIdx,
    startDomLeft,
  };
};
