import React, { ReactNode } from 'react';
import { ICompProps } from '../type';
import './index.less';
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
  /** hover 暂停 默认true */
  suspend?: boolean;
  /** 点击的回调  showItems当前展示元素 */
  onClick?: (showItems: any[]) => void;
}
declare const _default: React.MemoExoticComponent<(props: IProps) => JSX.Element>;
export default _default;
