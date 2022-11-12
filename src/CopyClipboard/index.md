## CopyClipboard

> 复制文本组件

### 基本使用

```tsx
import React from 'react';
import { CopyClipboard } from 'react-xs-component';
export default () => {
  return (
    <div>
      <CopyClipboard copyText="123">Lorem ipsum dolor sit amet.</CopyClipboard>
    </div>
  );
};
```

### api

| option | description | type | required | example | remark |
| --- | --- | --- | --- | --- | --- |
| tipDuration | 复制成功提示时长 | number | false |  |  |
| copyText | 复制的文本 | string | true |  |  |
| copyTextClassName | 复制文本的类 | string | false |  |  |
| children | 不传 children，默认用 copyText 作为展示的内容 | ReactNode | false |  |  |
| successTip | 复制成功时 tag 提示的信息 | string | false |  |  |
| antdTagProp |  | TagProps | false |  |  |
