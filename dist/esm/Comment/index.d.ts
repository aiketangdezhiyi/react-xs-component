import React from 'react';
import { ICompProps } from '../type';
import './index.less';
interface IProps extends ICompProps {
  /** 按钮标题 */
  btnTitle: string;
  /** 文本框最多可以写多少个字 默认300 */
  maxCommentNum?: number;
  /** 是否有头像 */
  avatar?: string;
  /** 文本框高度 */
  textareaHeight?: number;
  avatarSize?: number;
  avatarStyle?: React.CSSProperties;
  onAvatarClick?: (e: any) => void;
  placeholder?: string;
  /** 边框样式 默认实线 */
  borderStyle?: 'dashed' | 'solid';
  /** 点击按钮的回调 */
  onSubmit?: (value: string) => void;
  /** 昵称 */
  nickname?: string;
  /** 主题根据背景来决定 */
  theme?: 'light' | 'dark';
}
declare const _default: React.MemoExoticComponent<(props: IProps) => JSX.Element>;
export default _default;
