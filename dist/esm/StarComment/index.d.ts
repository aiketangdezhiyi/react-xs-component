import React from 'react';
import './index.less';
interface IProps {
    /** 总共多少颗星星 */
    stars: number;
    /** 亮多少颗星星 */
    light: number;
    /** 有传就有评价 */
    comments?: string[];
    /** 是否动态可控 可以评价 */
    dynamic?: boolean;
    starStyle?: React.CSSProperties;
    starActiveStyle?: React.CSSProperties;
    commentStyle?: React.CSSProperties;
    className?: string;
}
declare const _default: (props: IProps) => JSX.Element | null;
export default _default;
