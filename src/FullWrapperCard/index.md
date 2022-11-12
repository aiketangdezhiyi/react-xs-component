## FullWrapperCard

> 新浪微博图片组件一个可以撑满外层容器的图片选项卡

### 与相册组件联合使用

```tsx
import React, { useState } from 'react';
import { Album, FullWrapperCard } from 'react-xs-component';
import { images1, images2, images3 } from './test/images';

export default () => {
  const [show, setShow] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  return (
    <div
      style={{
        paddingTop: 10,
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
      }}
    >
      <Album
        width={300}
        image={images1[0]}
        title="《月上重火》重雪芝"
        number={100}
        onClick={() => {
          setShow(true);
          setImages(images1);
        }}
      />
      <Album
        width={300}
        image={images2[0]}
        title="梁洁"
        number={5}
        onClick={() => {
          setShow(true);
          setImages(images2);
        }}
      />
      <Album
        width={300}
        image={images3[0]}
        title="王丽坤"
        number={images3.length}
        onClick={() => {
          setShow(true);
          setImages(images3);
        }}
      />
      <FullWrapperCard
        onMaskClick={() => {
          setShow(false);
        }}
        style={{
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          right: 0,
          top: 0,
          zIndex: 1024,
        }}
        scale={0.15}
        bottomImageWidth={80}
        show={show}
        images={images}
      ></FullWrapperCard>
    </div>
  );
};
```

### record

2022/07/11 新增受控属性

2022/07/12 新增底层左右按钮

> 我想到这个可以做成一个比较完美的组件底层图片宽度可以受控，展示图片使用预加载，新增底层图片懒加载和延迟加载，长列表优化暂时不考虑

2022/07/14 考虑到组件复用的问题，像多个相册集组件使用同一个

2022/07/14 下午 优化多个组件复用的问题 并且提供了窗口变化之后的适配行为

> 考虑加上一个图片跳转的功能还可以加上一个放大缩小的功能

2022/07/14 晚上新增子组件功能按钮组组件，新增功能旋转

> 后面放大缩小功能可以加一个提示缩放信息的功能，可以做一个通用的组件还可以实现拖拽功能

2022/07/15 上午和下午 实现放大缩小功能外加新增一个信息提示组件以及实现图片定位功能

2022/07/18 新增滚动下一张图片的功能

2022/07/19 新增虚拟列表优化

## api

| option | description | type | required | example | remark |
| --- | --- | --- | --- | --- | --- |
| images | 图片数组 | string[] | true |  |  |
| show | 是否展示 | boolean | false |  |  |
| onMaskClick | 点击遮罩后的回调 | (status: boolean) => void | false |  |  |
| bottomImageWidth | 底层每一张图片的宽度 默认 66 | number | false |  |  |
| preloadNum | 优先加载多少张图片 默认 27 | number | false |  |  |
| scale | 每次放大缩小的倍数 默认 .25 | number | false |  |  |
| messagePlayingTime | 信息提示时长 默认 1000 | number | false |  |  |
