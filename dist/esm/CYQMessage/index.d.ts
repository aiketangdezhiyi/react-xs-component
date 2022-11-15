import React from 'react';
import { ICompProps } from '../type';
import './index.less';
interface IProps extends ICompProps {
  show: boolean;
  children: any;
  /** 显示多长时间后进入动画 默认5000 */
  showTime?: number;
  /** 动画持续事件 默认1000 默认不开启动画 0 */
  duration?: number;
}
declare const _default: React.MemoExoticComponent<(props: IProps) => JSX.Element>;
export default _default;
