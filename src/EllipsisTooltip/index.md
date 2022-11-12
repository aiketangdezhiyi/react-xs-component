## EllipsisTooltip

使用场景:当内部文本有溢出打点时开启气泡

可以搭配复制文本组件使用

```tsx
import React from 'react';
import { EllipsisTooltip, CopyClipboard } from 'react-xs-component';
import './index.less';
import { Space } from 'antd';

export default function index() {
  return (
    <Space direction="vertical">
      <EllipsisTooltip title="提示信息">
        <span
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            display: 'inline-block',
            wordBreak: 'break-all',
            width: 100,
          }}
        >
          abcaaaaaaaaaaaaaaaaaaa
        </span>
      </EllipsisTooltip>
      <EllipsisTooltip title="提示信息">
        <span
          style={{
            textOverflow: 'ellipsis',
            display: 'inline-block',
            wordBreak: 'break-all',
            width: 100,
          }}
        >
          abcaaaaaaaaaaaaaaaaaaa
        </span>
      </EllipsisTooltip>
      <EllipsisTooltip title="提示信息">
        <CopyClipboard copyText="abc">abcaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</CopyClipboard>
      </EllipsisTooltip>

      <EllipsisTooltip title="提示信息">
        <CopyClipboard copyText="abc" copyTextClassName="copy-text-class-name">
          abcaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </CopyClipboard>
      </EllipsisTooltip>
    </Space>
  );
}
```

https://ant.design/components/tooltip-cn/

## api

| option | description | type | required | example | remark |
| --- | --- | --- | --- | --- | --- |
| children |  | any | true |  |  |
| ...TooltipProps |  | https://ant.design/components/tooltip-cn/#API | false |  |  |
