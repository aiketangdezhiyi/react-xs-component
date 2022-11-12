import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { ICompProps } from '../type';
import { setCompCommonCls } from '../utils/myUtils';
import './index.less';

interface IProps extends ICompProps {
  show: boolean;
  children: any;
  /** 显示多长时间后进入动画 默认5000 */
  showTime?: number;
  /** 动画持续事件 默认1000 默认不开启动画 0 */
  duration?: number;
}

const CYQMessage = (props: IProps) => {
  const { show, children, showTime = 5000, duration = 3000, style, className } = props;
  const [showing, setShowing] = useState(false); // 正在展示中
  const [startAnimation, setStartAnimation] = useState(false); // 开启动画
  const [opacityState, setOpacityState] = useState(1);
  const showTimerRef = useRef<number | undefined>(undefined);
  const animationTimerRef = useRef<number | undefined>(undefined);
  useEffect(() => {
    if (show && duration !== 0) {
      clearTimeout(showTimerRef.current);
      clearTimeout(animationTimerRef.current);

      setStartAnimation(false);
      setOpacityState(1);
      setShowing(true);

      showTimerRef.current = setTimeout(() => {
        setStartAnimation(true);
        setOpacityState(0);
        animationTimerRef.current = setTimeout(() => {
          setShowing(false);
          setStartAnimation(false);
        }, duration);
      }, showTime);
    } else if (show && duration === 0) {
      clearTimeout(showTimerRef.current);
      setShowing(true);
      showTimerRef.current = setTimeout(() => {
        setShowing(false);
      }, showTime);
    }
  }, [show]);

  useEffect(() => {}, [showing]);

  const getCls = setCompCommonCls('cyq', 'message');

  return (
    <div
      style={{
        transition: startAnimation ? `opacity ${duration}ms` : 'none',
        ...style,
        opacity: opacityState,
        display: showing ? 'flex' : 'none',
      }}
      className={classNames(getCls('wrapper'), className)}
    >
      {children}
    </div>
  );
};

export default React.memo(CYQMessage);
