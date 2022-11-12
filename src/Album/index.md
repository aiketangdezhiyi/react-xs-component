## Album

> 百度相册集

### 与新浪图片组件联合使用

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

### api

| option      | description    | type        | required | default | example |
| ----------- | -------------- | ----------- | -------- | ------- | ------- |
| image       | 封面           | string      | true     | -       |         |
| number      | 共有多少张图片 | number      | true     | -       |         |
| title       | 标题           | string      | true     | -       |         |
| width       | 宽度           | number      | false    | 200     |         |
| imageHeight | 图片高度       | number      | false    | 150     |         |
| onClick     | 点击回调       | (e) => void | false    |         |         |
