import { setCommonCls } from '../utils/myUtils';
import classNames from 'classnames';
import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { ICompProps } from '../type';
import { cloneReactElementArray } from '../utils/reactUtils';
import './index.less';
import { getConcatArray } from '../utils/Array';
import { useEventListener } from 'xshooks';

interface IProps extends ICompProps {
  /** 播放信息列表 */
  informationList?: string[];
  /** 自定义播放信息列表 优先级高于播放信息列表 */
  informationNodeList?: ReactNode[];
  /** 播放的时间 默认3000 */
  duration?: number;
  /** 动画时间 500 */
  animationTime?: number;
  /** 每一项默认的高度与行高 默认20 默认与容器高度保持一致 */
  itemHeight?: number;
  /** 宽度 */
  width: number;
  /** 每次展示的条数 默认为1 */
  number?: number;
  /** 点击的回调  showItems当前展示元素 */
  onClick?: (showItems: any[]) => void;
}

/**
 *
 * @param curIdx 当前索引
 * @param max 最大值
 */
const getNextIdx = (curIdx: number, max: number) => {
  let nextIdx = (curIdx + 1) % (max + 1);
  return nextIdx;
};

const BroadcastInformation = (props: IProps) => {
  let {
    informationList = [],
    informationNodeList,
    duration = 3000,
    animationTime = 500,
    itemHeight = 20,
    number = 1,
    width,
    onClick,
    style,
    className,
  } = props;
  const [showIdx, setShowIdx] = useState(0);
  const [startAnimation, setStartAnimation] = useState(true);
  const timerRef = useRef<number | undefined>();
  const [isEnter, setIsEnter] = useState(false);

  const getCls = setCommonCls('comp', 'broadcast');

  const containerHeight = itemHeight * number; // 容器高度
  const moveHeight = containerHeight; // 每次动画移动的高度 默认与容器高度保持一致

  if (!informationList && !informationNodeList) {
    throw new Error('informationList 和 informationNodeList 至少传一个');
  }
  const max = Math.max(
    informationList ? informationList.length : 0,
    informationNodeList ? informationNodeList.length : 0,
  );

  if (max % number !== 0) {
    throw new Error('播放的条数必须能整除于每次展示的条数');
  }
  const maxIdx = Math.floor(max / number);

  const informationListJSX = useMemo(() => {
    if (informationNodeList) {
      return cloneReactElementArray(informationNodeList, number);
    }
    return getConcatArray(informationList, number).map((information, i) => (
      <li
        style={{
          height: itemHeight,
          lineHeight: `${itemHeight}px`,
        }}
        key={information + i}
      >
        {information}
      </li>
    ));
  }, [informationList, number, informationNodeList]);

  useEffect(() => {
    if (isEnter) {
      return;
    }
    if (showIdx === 0) {
      clearTimeout(timerRef.current);
      startBroadcastAnimation();
    }
  }, [showIdx, isEnter]);

  const startBroadcastAnimation = () => {
    timerRef.current = setTimeout(() => {
      const nextIdx = getNextIdx(showIdx, max);
      setStartAnimation(true);
      setShowIdx(nextIdx);
    }, duration);
  };

  const onTransitionEnd = () => {
    if (showIdx === maxIdx) {
      setShowIdx(0);
      setStartAnimation(false);
    }
    if (isEnter) {
      return;
    }
    startBroadcastAnimation();
  };

  let onMouseEnter: () => void = () => {
    clearTimeout(timerRef.current);
    setIsEnter(true);
  };
  let onMouseLeave: () => void = () => {
    setIsEnter(false);
    startBroadcastAnimation();
  };
  useEventListener(
    'visibilitychange',
    () => {
      if (document.visibilityState === 'visible') {
        typeof onMouseLeave === 'function' && onMouseLeave();
      } else {
        typeof onMouseEnter === 'function' && onMouseEnter();
      }
    },
    {
      target: document,
    },
  );

  return (
    <div
      className={classNames(getCls('container'), className)}
      style={{
        width,
        height: containerHeight,
        ...style,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => {
        let startIdx = showIdx;
        if (showIdx === max) {
          startIdx = 0;
        }
        typeof onClick === 'function' &&
          onClick(
            informationNodeList
              ? informationListJSX.slice(startIdx * number, startIdx * number + number)
              : informationList.slice(startIdx * number, startIdx * number + number),
          );
      }}
    >
      <ul
        style={{
          transition: startAnimation ? `transform ${animationTime}ms` : 'none',
          transform: `translateY(-${showIdx * moveHeight}px)`,
        }}
        onTransitionEndCapture={onTransitionEnd}
        className={getCls('ul')}
      >
        {informationListJSX}
      </ul>
    </div>
  );
};

export default React.memo(BroadcastInformation);
