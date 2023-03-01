import React from 'react';
import './index.less';
import { ICompProps } from '../type';
declare type ContainerSize = {
    width: number;
    height: number;
};
interface IProps extends ICompProps {
    /** 图片地址 */
    Image: string;
    /** 放大的倍数 */
    scale?: number;
    originSize: ContainerSize;
    /** 放大的图片 默认使用原始图片进行放大 */
    scaleImage?: string;
}
declare const _default: React.MemoExoticComponent<(props: IProps) => JSX.Element>;
export default _default;
