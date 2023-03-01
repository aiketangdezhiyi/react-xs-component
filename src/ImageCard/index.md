## ImageCard

> 淘宝图片选项卡组件

### 简单使用

```tsx
import React from 'react';
import { ImageCard } from 'react-xs-component';

export default () => {
  const images = [
    'https://img0.baidu.com/it/u=1921911183,4004299531&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=750',
    'https://img0.baidu.com/it/u=1831910797,484712372&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=750',
    'https://img0.baidu.com/it/u=594823224,1437956344&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=312',
    'https://img0.baidu.com/it/u=1102348370,2044721188&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
    'https://img1.baidu.com/it/u=2907610055,1064463461&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
    'https://img1.baidu.com/it/u=1509856330,2468451787&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750',
    'https://img2.baidu.com/it/u=1770656999,1371231797&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=404',
    'https://img2.baidu.com/it/u=585612897,2579386119&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
    'https://img0.baidu.com/it/u=412810083,3486846386&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
  ];
  return (
    <div
      style={{
        margin: 10,
      }}
    >
      <ImageCard images={images} />
    </div>
  );
};
```

> 建议使用功能更加强的 RelaxImageCard 组件

## api

| option | description        | type     | required | example | remark |
| ------ | ------------------ | -------- | -------- | ------- | ------ |
| images | 图片数组           | string[] | true     |         |        |
| size   | 容器宽度，默认 450 | number   | false    |         |        |
