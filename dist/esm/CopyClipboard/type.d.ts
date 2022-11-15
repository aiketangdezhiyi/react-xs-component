import { ReactNode } from 'react';
import { TagProps } from 'antd';
export declare type ClipboardProps = {
  /** 复制成功提示时长 */
  tipDuration?: number;
  /** 复制的文本 */
  copyText: string;
  /** 复制文本的类 */
  copyTextClassName?: string;
  /** 不传children，默认用copyText作为展示的内容 */
  children?: ReactNode;
  /** 复制成功时tag提示的信息 */
  successTip?: string;
  className?: string;
  antdTagProp?: TagProps;
  onMouseEnter?: (e: any) => void;
  onMouseLeave?: (e: any) => void;
  onFocus?: (e: any) => void;
  onClick?: (e: any) => void;
};
