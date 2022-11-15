import React, { ReactNode } from 'react';
import './index.less';
import { ICompProps } from '../type';
export declare type presetType = {
    word: string;
    icon?: ReactNode;
};
interface IProps extends ICompProps {
    /** 预设搜索词 字符串 */
    presetWordString: presetType[];
    /** 每个搜索词出现的时长 单位ms */
    duration?: number;
    /** 点击按钮的回调 */
    onClick?: (value: string) => void;
    /** 按钮的标题  默认搜索 */
    btnTitle?: string;
    /** 按钮的icon图标 */
    btnIcon?: ReactNode;
    showClear?: boolean;
    placeholder?: string;
    width?: number;
    buttonStyle?: React.CSSProperties;
    inputStyle?: React.CSSProperties;
}
declare const _default: (props: IProps) => JSX.Element;
export default _default;
