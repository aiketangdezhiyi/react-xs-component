import React from 'react';
import { ICompProps } from '../type';
import './index.less';
interface IProps extends ICompProps {
    /** 倒计时多少秒 */
    time: number;
    /** 倒计时事件 每秒触发一次 */
    onInterval?: (curTime: number) => void;
    /** 默认展示文本 */
    text: string;
    /** 倒计时结束事件 */
    onTimerFinish?: () => void;
    /** 点击事件 参数是否正在倒计时 */
    onClick?: (isInterval: boolean) => void;
    /** 计时过程的样式 */
    intervalStyle?: React.CSSProperties;
    /** 计时模板 重新获取验证码({}) === 重新获取验证码(50秒)  */
    template?: string;
}
export default function Timer(props: IProps): JSX.Element;
export {};
