## RelaxImageCard

> 淘宝图片选项卡组件

### 简单使用

```tsx
import React from 'react';
import { RelaxImageCard } from 'react-xs-component';
import { images1 } from './test/images';
export default () => {
  return (
    <div
      style={{
        margin: 10,
      }}
    >
      <RelaxImageCard size={600} renderBar={() => <div>123</div>} images={images1} />
    </div>
  );
};
```

2023/3/1 在 imageCard 上优化

- 宽松的高度，样式更贴近于微博
- 导航栏图片左右按钮的自适应
- 受控属性，可控制一开始浏览元素，可指定元素宽度
- 提供工具栏渲染函数

### 待优化

> 图片可以选择位置效果，高清图与缩略图分开

## api

| option    | description    | type     | required | example | remark |
| --------- | -------------- | -------- | -------- | ------- | ------ |
| images    | 图片数组       | string[] | true     |         |        |
| size      | 容器宽度       | number   | false    |         |        |
| renderBar | 渲染底部工具栏 | ()=> any | false    |         |        |
| startIdx  | 开始浏览的索引 | number   | false    |         |        |
| itemWidth | 每一项的宽度   | number   | false    |         |        |
