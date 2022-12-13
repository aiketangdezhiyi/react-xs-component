import { getTransverseVirtualListInfo } from './utils';
// 旧代码里面用的api目前不再使用
export const getRowVirtual = (
  originalList: any[],
  options: {
    /** 每一个元素的宽度 */
    width: number;
    /** 偏移量 */
    left: number;
    /** 容器元素展示区域的宽度 */
    containerWidth: number;
  },
) => {
  const { width, left, containerWidth } = options;
  const { startIdx, endIdx, startDomLeft } = getTransverseVirtualListInfo(
    width,
    left,
    containerWidth,
    originalList.length,
  );
  const virtualList: {
    origin: any;
    /** 这一项的偏移量 */
    left: number;
    /** 这一项在原来列表里对应的下标索引 */
    idx: number;
  }[] = []; // 虚拟列表
  for (let i = startIdx, j = 0; i <= endIdx; i++, j++) {
    virtualList.push({
      origin: originalList[i],
      left: startDomLeft + width * j,
      idx: i,
    });
  }
  return virtualList;
};
