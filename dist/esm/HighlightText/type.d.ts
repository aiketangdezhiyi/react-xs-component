/// <reference types="react" />
export interface IProps {
  /** 匹配的词组  */
  keywords: string[];
  text: string;
  /** 高亮类型 */
  type?: 'background' | 'text';
  style?: React.CSSProperties;
  highlightColor?: string;
  className?: string;
}
