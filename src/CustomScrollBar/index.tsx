import { usePortraitDrag } from '../myhooks/usePortraitDrag';
import { setCompCommonCls } from '../utils/myUtils';
import classNames from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ICompProps } from '../type';
import { useEventListener } from 'xshooks';
import './index.less';

interface IProps extends ICompProps {
  children: any;
  /** 这个容器的高度 */
  height: number;
  /** 滚轮滚动的速度 默认10 */
  scrollSpeed?: number;
  /** 滑块样式 */
  squareStyle?: React.CSSProperties;
  /** 滚动框样式  */
  barWrapperStyle?: React.CSSProperties;
}

/**
 * 计算滚动块的高度
 * @param containerHeight 容器的高度
 * @param domHeight dom的高度
 */
const computedBarHeight = (containerHeight: number, domHeight: number) => {
  return containerHeight * (containerHeight / domHeight);
};

export default (props: IProps) => {
  const {
    scrollSpeed = 10,
    barWrapperStyle,
    squareStyle,
    height,
    children,
    style,
    className,
  } = props;
  const childrenRef = useRef<HTMLDivElement>(null);
  const getCls = setCompCommonCls('custom', 'scroll', 'bar');
  const [barHeight, setBarHeight] = useState(0);
  const scrollDOMRef = useRef<HTMLDivElement>(null);
  const { dragY, onDragStart, isDragRef, setDragY } = usePortraitDrag(height - barHeight);
  const [domScrollTop, setDomScrollTop] = useState(0);

  useEffect(() => {
    // 还要考虑类似加载更多的情况
    setBarHeight(computedBarHeight(height, childrenRef?.current?.offsetHeight || 0));
  }, [childrenRef.current]);

  // 向children传递ref
  const createChildren = useCallback(
    () =>
      React.cloneElement(children, {
        ref: childrenRef,
      }),
    [children],
  );

  useEventListener(
    'wheel',
    (e: any) => {
      e.preventDefault(); // 注册原生事件阻止父容器滚动
      if (e.deltaY < 0) {
        // 向上
        setDragY(dragY - scrollSpeed);
      } else {
        // 向下
        setDragY(dragY + scrollSpeed);
      }
    },
    {
      target: scrollDOMRef.current as Element,
      passive: false,
    },
  );

  useEffect(() => {
    if (!scrollDOMRef.current) {
      return;
    }
    const scrollSpaceHeight = height - barHeight;
    const scrollTop = (dragY / scrollSpaceHeight) * (childrenRef.current.offsetHeight - height);
    scrollDOMRef.current.scrollTop = scrollTop;
    setDomScrollTop(scrollTop);
  }, [scrollDOMRef.current, dragY]);

  if (childrenRef.current && childrenRef.current.offsetHeight <= height) {
    return children;
  }

  return (
    <div
      className={classNames(getCls('container'), isDragRef.current ? 'active' : '', className)}
      ref={scrollDOMRef}
      style={{
        height,
        ...style,
      }}
    >
      {createChildren()}
      <div
        className={classNames(getCls('wrapper'))}
        style={{
          top: domScrollTop,
          ...barWrapperStyle,
        }}
      >
        <div
          className={getCls('yq')}
          onMouseDown={onDragStart}
          style={{
            height: barHeight,
            top: dragY,
            ...squareStyle,
          }}
        ></div>
      </div>
    </div>
  );
};
