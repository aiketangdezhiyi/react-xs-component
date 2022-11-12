## Comment

> 评论组件包括浅色和深色主题

### 基本使用

```tsx
import React from 'react';
import { Comment } from 'react-xs-component';
import { Button, Tooltip, message } from 'antd';

export default () => {
  const user = {
    nickname: '陈钰琪',
    avatar:
      'https://img2.baidu.com/it/u=738212566,2405020611&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  };
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <div
        className="light"
        style={{
          width: 600,
        }}
      >
        <Comment
          borderStyle="dashed"
          onSubmit={(value) => {
            console.log(value);
            message.info('Upload ' + value);
          }}
          {...user}
          btnTitle="提交评论"
        />
      </div>
      <div
        className="dark"
        style={{
          width: 600,
          backgroundColor: 'rgba(0,0,0,1)',
        }}
      >
        <Comment
          theme="dark"
          borderStyle="dashed"
          onSubmit={(value) => {
            console.log(value);
            message.info('Upload ' + value);
          }}
          {...user}
          btnTitle="上传描述信息"
        />
      </div>
    </div>
  );
};
```

## api

| option | description | type | required | example | remark |
| --- | --- | --- | --- | --- | --- |
| btnTitle | 按钮标题 | string | true |  |  |
| maxCommentNum | 文本框最多可以写多少个字 默认 300 | number | false |  |  |
| textareaHeight | 文本框高度 | number | false |  |  |
| avatar | 头像 | string | false |  |  |
| avatarSize |  | number | false |  |  |
| avatarStyle |  | React.CSSProperties | false |  |  |
| onAvatarClick | 点击头像的回调 | (e: any) => void | false |  |  |
| placeholder |  | string | false |  |  |
| borderStyle |  |  | false |  |  |
| onSubmit |  | (value: string) => void | false |  |  |
| nickname |  | string | false |  |  |
| theme |  |  | false |  |  |
