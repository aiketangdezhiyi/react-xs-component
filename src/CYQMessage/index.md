## CYQMessage

> 做一个类似哔哩哔哩的声音调大的透明提示信息

**使用时相对最近有定位的祖先元素居中**

父组件传递的属性

```ts
setShowCYQMessage(true);
requestAnimationFrame(() => {
  setShowCYQMessage(false);
});
```

```ts
<CYQMessage show={showCYQMessage} showTime={2000} duration={600}>
  <>
    <IconExpand
      style={{
        fontSize: 25,
        marginRight: 5,
      }}
    />
    {Math.floor(magnification * 100)}%
  </>
</CYQMessage>
```

### 基本使用

```tsx
import { CYQMessage } from 'react-xs-component';
import React, { useState } from 'react';
import { Button } from 'antd';

export default () => {
  const [showCYQMessage, setShowCYQMessage] = useState(false);
  const onShow = () => {
    setShowCYQMessage(true);
    requestAnimationFrame(() => {
      setShowCYQMessage(false);
    });
  };
  return (
    <div
      style={{
        width: '100%',
        height: 200,
        position: 'relative',
      }}
    >
      <CYQMessage
        style={{
          background: 'rgba(0,0,0,.1)',
          color: '#fff',
          padding: '0 30 ',
        }}
        show={showCYQMessage}
        showTime={2000}
        duration={600}
      >
        100%
      </CYQMessage>
      <Button onClick={onShow}>show</Button>
    </div>
  );
};
```

## api

| option   | description                             | type    | required | example | remark |
| -------- | --------------------------------------- | ------- | -------- | ------- | ------ |
| show     |                                         | boolean | true     |         |        |
| children |                                         | any     | true     |         |        |
| showTime | 显示多长时间后进入动画 默认 5000        | number  | false    |         |        |
| duration | 动画持续事件 默认 1000 默认不开启动画 0 | number  | false    |         |        |
