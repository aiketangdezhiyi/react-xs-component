## BroadcastInformation

> 爱奇艺广播信息组件

### 一行文本

```tsx
import React from 'react';
import { BroadcastInformation } from 'react-xs-component';

export default () => {
  const JSX = [<div key={1}>你好</div>, <div key={2}>你好,陈钰琪</div>, <div key={3}>你好</div>];

  return (
    <BroadcastInformation
      style={{
        backgroundColor: '#1D1F23',
        marginRight: 10,
      }}
      duration={3000}
      width={200}
      animationTime={1000}
      number={1}
      itemHeight={21}
      informationNodeList={JSX}
      onClick={(data) => {
        console.log(data);
      }}
    />
  );
};
```

### 多行文本

```tsx
import React from 'react';
import { BroadcastInformation } from 'react-xs-component';

export default () => {
  const list = [
    '陈钰琪好帅',
    '期待超时空罗曼史',
    '喜欢钰琪姐',
    '加油王晓烁',
    '真的有点想见一下煜煊',
    '余生有你',
  ];

  return (
    <BroadcastInformation
      style={{
        backgroundColor: '#1D1F23',
      }}
      duration={3000}
      width={200}
      animationTime={1000}
      number={3}
      informationList={list}
      onClick={(data) => {
        console.log(data);
      }}
    />
  );
};
```

### 图片

```tsx
import React from 'react';
import { BroadcastInformation } from 'react-xs-component';

export default () => {
  const images = [
    'https://img0.baidu.com/it/u=3290117850,333291492&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
    'https://img2.baidu.com/it/u=842966913,1022776133&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
    'https://img1.baidu.com/it/u=3110260004,62302840&fm=253&fmt=auto&app=138&f=JPEG?w=561&h=500',
    'https://img2.baidu.com/it/u=638945913,833207029&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750',
  ];
  const imageList = images.map((src) => (
    <img
      key={src}
      style={{
        display: 'block',
        width: '100%',
        height: 200,
        objectFit: 'cover',
        objectPosition: 'center',
      }}
      src={src}
    />
  ));

  return (
    <BroadcastInformation
      style={{
        backgroundColor: '#1D1F23',
      }}
      duration={3000}
      width={200}
      animationTime={1000}
      number={2}
      itemHeight={200}
      informationNodeList={imageList}
      onClick={(data) => {
        console.log(data);
      }}
    />
  );
};
```

### api

| option | description | type | required | default | example |
| --- | --- | --- | --- | --- | --- |
| informationList | 播放信息列表(informationList 和 informationNodeList 必填一个) | string[] | false | - |  |
| informationNodeList | 自定义播放信息列表 优先级高于播放信息列表 | ReactNode[] | false | - |  |
| duration | 播放的时间 默认 3000 | number | false | 3000 |  |
| animationTime | 动画时间 500 | number | false | 500 |  |
| itemHeight | 每一项默认的高度与行高 默认 20 默认与容器高度保持一致 | number | false | 20 |  |
| width | 宽度 | number | true |  |  |
| number | 每次展示的条数 默认为 1 | number | false | 1 |  |
| suspend | hover 暂停 默认 true | boolean | false | true |  |
| onClick | 点击的回调 showItems 当前展示元素 | (showItems: any[]) => void | false |  |  |

### 待优化

- 切换时轮播暂停
