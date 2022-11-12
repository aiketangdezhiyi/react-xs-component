## PrivateInformation

> 敏感信息隐藏组件例如,昵称,手机,微信号这些,可以只展示首尾,中间采用星号隐藏关键信息然后有权限的情况下可以点击展开全部信息

### 基本使用

```tsx
import React, { useState } from 'react';
import { PrivateInformation } from 'react-xs-component';
export default () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <PrivateInformation
        visible={visible}
        onVisibleChange={() => {
          setVisible(true);
        }}
        text="13414079720"
      ></PrivateInformation>

      <PrivateInformation text="王晓烁"></PrivateInformation>
    </div>
  );
};
```

## api

```ts
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
```
