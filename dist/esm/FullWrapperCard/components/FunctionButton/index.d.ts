import { ReactNode } from 'react';
import './index.less';
import { ICompProps } from '../../../type';
export declare type btnType =
  | 'full'
  | 'left-rotate'
  | 'right-rotate'
  | 'download'
  | 'scale-big'
  | 'scale-small'
  | 'location'
  | 'custom';
export declare type onBtnClickType = (type: btnType) => void;
interface IProps extends ICompProps {
  btnType?: btnType;
  btnSize?: number;
  /** 按钮点击事件 */
  onBtnClick?: onBtnClickType;
  /** 自定Icon图标 默认这个优先级最高 btnType为custom */
  customIcon?: ReactNode;
}
declare const _default: (props: IProps) => JSX.Element;
export default _default;
