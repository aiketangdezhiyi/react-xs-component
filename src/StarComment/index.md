## StarComment

> 星星评论组件

### 基本使用

```tsx
import React from 'react';
import { StarComment } from 'react-xs-component';
export default () => {
  return (
    <StarComment
      stars={5}
      light={3}
      dynamic={true}
      comments={['一帆风顺', '二龙腾飞', '三羊开泰', '四世同堂', '五福临门']}
    />
  );
};
```

### 待优化

> 图片和尺寸可以自定义

## api

```ts
interface IProps {
  /** 总共多少颗星星 */
  stars: number;
  /** 亮多少颗星星 */
  light: number;
  /** 有传就有评价 */
  comments?: string[];
  /** 是否动态可控 可以评价 */
  dynamic?: boolean;
  starStyle?: React.CSSProperties;
  starActiveStyle?: React.CSSProperties;
  commentStyle?: React.CSSProperties;
  className?: string;
}
```
