import React from 'react';
import './index.less';
import { ICompProps } from '../type';
interface IProps extends ICompProps {
  /** 封面 */
  image: string;
  /** 共有多少张图片 */
  number: number;
  title: string;
  /** 默认 200 */
  width?: number;
  /** 图片高度 默认150 */
  imageHeight?: number;
  onClick?: (e: any) => void;
}
declare const _default: React.MemoExoticComponent<(props: IProps) => JSX.Element>;
export default _default;
