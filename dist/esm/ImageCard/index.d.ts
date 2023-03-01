import React from 'react';
import './index.less';
interface IProps {
    /** 图片数组 */
    images: string[];
    /** 传进来的图片 */
    size?: number;
    style?: React.CSSProperties;
    className?: string;
}
declare const _default: React.MemoExoticComponent<(props: IProps) => JSX.Element>;
export default _default;
