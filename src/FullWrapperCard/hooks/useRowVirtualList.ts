import { ReactNode, useMemo } from 'react';
import { getTransverseVirtualListInfo } from '../utils';

export function useRowVirtualList<T = any>(
  originList: T[],
  renderItem: (params: { origin: T; left: number; idx: number }) => ReactNode,
  options: {
    /** 每一个元素的宽度 */
    width: number;
    /** 容器元素展示区域的宽度 */
    containerWidth: number;
    /** 外层容器的偏移量 */
    left: number;
  },
) {
  const allVirtualList = useRowOriginVirtualList(originList, renderItem, options);

  return useMemo(() => {
    const { startIdx, endIdx } = getTransverseVirtualListInfo(
      options.width,
      options.left,
      options.containerWidth,
      originList.length,
    );
    return allVirtualList.slice(startIdx, endIdx + 1);
  }, [allVirtualList, options.width, options.left, options.containerWidth]);
}

/**
 * 获取所有
 * @param originList
 * @param renderItem
 * @param options
 * @returns
 */
export function useRowOriginVirtualList<T = any>(
  originList: T[],
  renderItem: (params: { origin: T; left: number; idx: number }) => ReactNode,
  options: {
    /** 每一个元素的宽度 */
    width: number;
    /** 容器元素展示区域的宽度 */
    containerWidth: number;
  },
): ReactNode[] {
  const memoList = useMemo(() => {
    return originList.map((it, i) =>
      renderItem({
        origin: it,
        left: options.width * i,
        idx: i,
      }),
    );
  }, [originList, renderItem, options.width, options.containerWidth]);
  return memoList;
}
