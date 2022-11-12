## Magnifier

> 组件：类似淘宝京东那样的放大镜

### 基本使用

```tsx
import React from 'react';
import { Magnifier } from 'react-xs-component';
export default function index() {
  return (
    <Magnifier
      Image="https://img1.baidu.com/it/u=1715362183,607652543&fm=253&fmt=auto&app=138&f=JPEG?w=764&h=500"
      originSize={{
        width: 500,
        height: 333,
      }}
    />
  );
}
```

## api

| option     | description                         | type          | required | example | remark |
| ---------- | ----------------------------------- | ------------- | -------- | ------- | ------ |
| Image      | 图片地址                            | string[]      | true     |         |        |
| scale      | 放大的倍数，默认 1.5                | number        | false    |         |        |
| originSize |                                     | ContainerSize | true     |         |        |
| scaleImage | 放大的图片 默认使用原始图片进行放大 | string        | false    |         |        |
