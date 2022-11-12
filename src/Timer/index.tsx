import { setCompCommonCls } from '../utils/myUtils';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
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

const explainTemplate = (template: string, content: string) => {
  // template 重新获取验证码({}) content 50秒 === 重新获取验证码(50秒)
  const first = template.indexOf('{');
  const second = template.indexOf('}');
  if (first === -1 || second === -1 || first > second) {
    return content;
  }
  return template.substring(0, first) + content + template.substring(second + 1);
};

function useStart() {
  const [start, setStart] = useState(false);

  return {
    start,
    onStart: () => {
      setStart(true);
      setTimeout(() => {
        setStart(false);
      }, 1000);
    },
  };
}

export default function Timer(props: IProps) {
  const {
    time,
    onInterval = () => {},
    text,
    onTimerFinish,
    onClick,
    style,
    intervalStyle,
    template = '{}',
    className,
  } = props;
  const [curTime, setCurTime] = useState<number>(0);
  const { start, onStart } = useStart();

  const getCls = setCompCommonCls('timer');

  useEffect(() => {
    if (curTime === 0) {
      return;
    }
    setTimeout(() => {
      setCurTime(curTime - 1);
      onInterval && onInterval(curTime - 1);
      if (curTime === 1) {
        onTimerFinish && onTimerFinish();
      }
    }, 1000);
  }, [curTime]);

  useEffect(() => {
    if (start && curTime === 0 && time) {
      setCurTime(time);
    }
  }, [time, start]);
  const mergeStyle = { ...style };

  if (curTime > 0 && intervalStyle) {
    Object.assign(mergeStyle, intervalStyle);
  }

  return (
    <div
      style={mergeStyle}
      className={classNames(getCls('container'), curTime > 0 ? 'interval' : '', className)}
      onClick={() => {
        onClick && onClick(curTime === 0 ? false : true);
        onStart();
      }}
    >
      {curTime === 0 ? text : explainTemplate(template, curTime + '秒')}
    </div>
  );
}
