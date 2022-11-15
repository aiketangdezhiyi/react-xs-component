import { ReactNode } from 'react';
export interface IProps {
  topContent: ReactNode;
  bottomContent: ReactNode;
  type?: 'circle' | 'dashed';
  borderColor?: string;
  style?: React.CSSProperties;
  className?: string;
}
