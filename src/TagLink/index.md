## TagLink

> 做一个标签链接

### 基本使用

```tsx
import React from 'react';
import { TagLink } from 'react-xs-component';

export default () => {
  const reactJSX = (
    <div
      className="container"
      style={{
        display: 'flex',
        color: '#333',
        justifyContent: 'space-between',
      }}
    >
      <span>发布时间：2022-03-01</span>
      <span>截止时间：2022-03-29</span>
    </div>
  );
  const list = [];
  for (let i = 0; i < 25; i++) {
    list.push(
      <TagLink
        key={i}
        style={{
          margin: 10,
        }}
        onClick={(props) => {
          console.log(props);
        }}
        url="https://image.baidu.com/search/index?tn=baiduimage&ps=1&ct=201326592&lm=-1&cl=2&nc=1&ie=utf-8&dyTabStr=MCwzLDYsNSw0LDcsOCwxLDIsOQ%3D%3D&word=%E9%99%88%E9%92%B0%E7%90%AA"
        titleStyle={{ marginBottom: 5 }}
        title="百度陈钰琪"
        bottomNode={reactJSX}
      ></TagLink>,
    );
  }
  return <div>{list}</div>;
};
```

## api

```ts
interface IProps extends ICompProps {
  /** 跳转的url */
  url?: string;
  /** 跳转方式 默认_blank */
  target?: '_self' | '_blank';
  /** 是否延迟跳转 */
  delayTime?: number;
  width?: number;
  title: string;
  titleStyle?: React.CSSProperties;
  bottomNode?: ReactNode;
  onClick?: (props: any) => void;
  key?: any;
}
```
