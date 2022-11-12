## SwiperInput

> 做一个有很多预设搜索词的搜索框

### 基本使用

```tsx
import { WeiboCircleOutlined, CodepenCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { SwiperInput, presetType } from 'react-xs-component';

export default function index() {
  const presetKeys: presetType[] = [
    {
      word: '陈钰琪',
      icon: <CodepenCircleOutlined />,
    },
    {
      word: '赵敏',
      icon: <WeiboCircleOutlined />,
    },
    {
      word: '张无忌',
    },
  ];
  return (
    <SwiperInput
      style={{
        top: 10,
        left: 10,
      }}
      duration={3000}
      presetWordString={presetKeys}
      onClick={(value) => {
        console.log(value);
      }}
    ></SwiperInput>
  );
}
```

## api

```ts
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
```
