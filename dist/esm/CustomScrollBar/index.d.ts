import React from 'react';
import { ICompProps } from '../type';
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
declare const _default: (props: IProps) => any;
export default _default;
