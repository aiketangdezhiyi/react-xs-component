import { boundary, boundaryMax, boundaryMin } from 'yuxuannnn_utils';
import { ERotateAngle } from "./type";

/**
 * 通过给定数据计算出合适的图片展示宽高
 * @param rotateInfo
 */
export var computedImageSize = function computedImageSize(rotateInfo) {
  var originHeight = rotateInfo.originHeight,
      originWidth = rotateInfo.originWidth,
      containerHeight = rotateInfo.containerHeight,
      containerWidth = rotateInfo.containerWidth,
      rotateAngle = rotateInfo.rotateAngle; // 有个非常巧妙的处理过程 图片不看内容的话 是不是旋转一下就是图片的宽高改变了

  if (rotateAngle === ERotateAngle.ninety || rotateAngle === ERotateAngle['two hundred and seventy']) {
    var _ref = [containerHeight, containerWidth];
    containerWidth = _ref[0];
    containerHeight = _ref[1];
  } // 下面的处理过程适用


  var widthRate = originWidth / containerWidth;
  var heightRate = originHeight / containerHeight;

  if (widthRate > heightRate) {
    // 比值大的一边撑满
    return {
      width: containerWidth,
      height: originHeight / widthRate
    };
  } else {
    return {
      width: originWidth / heightRate,
      height: containerHeight
    };
  }
};
/** 获取放大的倍数 */

export var getMagnification = function getMagnification(scale, magnification) {
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

export var getTransverseVirtualListInfo = function getTransverseVirtualListInfo(width, left, offsetWith, reality) {
  var startIdx = boundaryMin(Math.floor(left / width) - 10, 0);
  var endIdx = boundaryMax(Math.ceil((left + offsetWith) / width) + 10, reality - 1);
  var startDomLeft = startIdx * width;
  return {
    startIdx: startIdx,
    endIdx: endIdx,
    startDomLeft: startDomLeft
  };
};