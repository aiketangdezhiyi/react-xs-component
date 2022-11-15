import React, { ReactNode } from 'react';
import { btnType, onBtnClickType } from '../FunctionButton';
import './index.less';
import { ICompProps } from '../../../type';
interface IProps extends ICompProps {
  /** 按钮类型数组 */
  btnTypeGroup?: btnType[];
  btnTypeGroupClick: onBtnClickType[];
  /** 自定义按钮组 优先级比btnTypeGroup高 */
  customTypeGroup?: ReactNode[];
  /** 每个按钮的大小 默认40 */
  btnSize?: number;
  btnStyle?: React.CSSProperties;
}
declare const _default: (props: IProps) => JSX.Element;
export default _default;
