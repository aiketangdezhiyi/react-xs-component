/// <reference types="react" />
import { TooltipProps } from 'antd';
export interface IProps {
  /** 是否有权限看到具体信息 */
  isAuth?: boolean;
  /** 具体信息 */
  text: string;
  /** 开头展示几个具体信息 */
  head?: number;
  /** 尾部展示几个具体信息 */
  tail?: number;
  visible?: boolean;
  onVisibleChange?: (e: React.MouseEvent<HTMLElement>) => void;
  /** 鼠标悬停时气泡提示信息 */
  showTitle?: string;
  style?: React.CSSProperties;
  tooltipProps?: TooltipProps;
  className?: string;
}
