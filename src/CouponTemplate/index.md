## CouponTemplate

> 优惠券组件模板

### 基本使用

```tsx
import React from 'react';
import { CouponTemplate } from 'react-xs-component';
import { Button, Space } from 'antd';
export default () => {
  return (
    <Space
      direction="vertical"
      style={{
        width: 300,
      }}
    >
      <CouponTemplate
        topContent={<div>优惠券头部</div>}
        bottomContent={<div>优惠券底部</div>}
        type="dashed"
      />

      <CouponTemplate
        topContent={
          <div
            style={{
              color: '#333',
            }}
          >
            美团优选
          </div>
        }
        bottomContent={
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button type="primary">详情</Button>
          </div>
        }
      />
    </Space>
  );
};
```

## api

| option        | description | type      | required | example | remark |
| ------------- | ----------- | --------- | -------- | ------- | ------ |
| topContent    |             | ReactNode | true     |         |        |
| bottomContent |             | ReactNode | true     |         |        |
| type          |             | string    | false    |         |        |
| borderColor   |             | string    | false    |         |        |
