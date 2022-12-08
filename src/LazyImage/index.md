## LazyImage

> 懒加载图片

### 简单使用

> 默认图片撑满外层容器 可以通过`style`和`imgStyle`进行控制

```tsx
import React from 'react';
import { LazyImage } from 'react-xs-component';

export default () => {
  return (
    <>
      <div
        style={{
          width: 300,
          height: 300,
        }}
      >
        <LazyImage
          style={{
            marginTop: 1000,
            borderRadius: 8,
          }}
          imgStyle={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          src="https://img0.baidu.com/it/u=2332542673,2619502413&fm=253&fmt=auto&app=120&f=PNG?w=459&h=577"
        ></LazyImage>
      </div>
      <div>
        <LazyImage
          style={{
            width: 100,
            height: 100,
            borderRadius: 8,
          }}
          imgStyle={{
            width: '100%',
            height: 'auto',
          }}
          src="https://img0.baidu.com/it/u=2332542673,2619502413&fm=253&fmt=auto&app=120&f=PNG?w=459&h=577"
        ></LazyImage>
      </div>
    </>
  );
};
```

### 内嵌的滚动容器

```tsx
import React from 'react';
import { LazyImage, lazyImageControl } from 'react-xs-component';

export default () => {
  return (
    <div
      ref={(el) => {
        if (el) {
          lazyImageControl.extends(el);
        }
      }}
      style={{
        width: 500,
        height: 600,
        overflow: 'auto',
      }}
    >
      <div
        style={{
          width: 300,
          height: 900,
        }}
      ></div>
      <LazyImage
        style={{
          width: 300,
          height: 300,
        }}
        imgStyle={{
          width: '100%',
          height: 'auto',
        }}
        src="https://img0.baidu.com/it/u=2332542673,2619502413&fm=253&fmt=auto&app=120&f=PNG?w=459&h=577"
      ></LazyImage>
    </div>
  );
};
```

### 案例

```tsx
import React, { useMemo } from 'react';
import { LazyImage, lazyImageControl } from 'react-xs-component';

export default () => {
  const list = useMemo(() => {
    const list = [];
    for (let i = 0; i < 100; i++) {
      list.push(
        <LazyImage
          key={i}
          style={{
            width: 300,
            height: 300,
            marginBottom: 10,
          }}
          imgStyle={{
            width: '100%',
            height: 'auto',
          }}
          src="https://img0.baidu.com/it/u=2332542673,2619502413&fm=253&fmt=auto&app=120&f=PNG?w=459&h=577"
        ></LazyImage>,
      );
    }
    return list;
  });
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      }}
    >
      {list}
    </div>
  );
};
```

## api

| option   | description  | type                | required | example | remark |
| -------- | ------------ | ------------------- | -------- | ------- | ------ |
| imgStyle | img 的 style | React.CSSProperties | false    |         |        |
