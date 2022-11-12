## HighlightText

> 高亮文本组件

### 基本使用

```tsx
import React from 'react';
import { HighlightText } from 'react-xs-component';

export default function test() {
  const text = '王晓烁？？';
  return (
    <>
      <HighlightText type="background" keywords={['晓烁？']} text={text} />
      <span styleName="abc">abc</span>
      <HighlightText type="text" keywords={['煜煊？']} text="王煜煊？？" />
    </>
  );
}
```

## api

| option         | description | type     | required | example | remark |
| -------------- | ----------- | -------- | -------- | ------- | ------ |
| keywords       | 匹配的词组  | string[] | true     |         |        |
| text           |             | string   | false    |         |        |
| type           |             |          | false    |         |        |
| highlightColor |             | string   | false    |         |        |
