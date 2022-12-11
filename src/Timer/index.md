## Timer

> 做一个倒计时组件提供从哪一秒开始倒计时每一秒可以提供一个事件计时结束恢复默认样式，并且提供一个事件

### 基本使用

```tsx
import { useForce } from 'xshooks';
import { message } from 'antd';
import React from 'react';
import { Timer } from 'react-xs-component';

export default function Index() {
  const { refresh } = useForce();
  return (
    <Timer
      time={120}
      text="发送验证码"
      onClick={(isInterval) => {
        if (!isInterval) {
          refresh();
          message.success('验证码已发送');
        }
      }}
      onInterval={(time) => {
        console.log(time);
      }}
      onTimerFinish={() => {
        console.log('计时完成');
      }}
      template="重新获取验证码({})"
      intervalStyle={{
        color: '#666',
      }}
    />
  );
}
```

## api

```ts
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
```
