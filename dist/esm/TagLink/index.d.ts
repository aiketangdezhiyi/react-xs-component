import React, { ReactNode } from 'react';
import './index.less';
import { ICompProps } from '../type';
interface IProps extends ICompProps {
  /** 跳转的url */
  url?: string;
  /** 跳转方式 默认_blank */
  target?: '_self' | '_blank';
  /** 是否延迟跳转 */
  delayTime?: number;
  width?: number;
  title: string;
  titleStyle?: React.CSSProperties;
  bottomNode?: ReactNode;
  onClick?: (props: any) => void;
  key?: any;
}
declare const _default: (props: IProps) => JSX.Element;
export default _default;
