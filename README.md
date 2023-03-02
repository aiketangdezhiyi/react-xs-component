## 介绍

xs 开发的 react 组件库，基于 ant design。

## 安装

> `npm install react-xs-component` 或 `yarn add react-xs-component`

## 文档

[doc](https://aiketangdezhiyi.github.io/react-xs-component/)

## github

[github](https://github.com/aiketangdezhiyi/react-xs-component)

## 感谢

- 感谢 Ant Design 组件库
- 感谢 dumi 组件开发而生的文档工具

## update

### 2023/3/1

更新`RelaxImageCard`组件 2023/3/1 在 imageCard 上优化

- 宽松的高度，样式更贴近于微博
- 导航栏图片左右按钮的自适应
- 受控属性，可控制一开始浏览元素，可指定元素宽度
- 提供工具栏渲染函数

在实际项目的应用效果

![image-20230302110800768](READMEimage/image-20230302110800768.png)

更新`FullWrapperCard`组件

- 底部浏览区域实时更新位置

- 父组件可以指定开始浏览的元素

- 提供事件父组件可以记录浏览的元素索引

在实际项目的应用效果

![image-20230302110947094](READMEimage/image-20230302110947094.png)

### 2023/3/2

> 实际项目应用`RelaxImageCard`发现问题 z-index 太低 hover 在出现 bar 底部元素最好还是固定 12px 还是要提供一个事情 让外部可以监听浏览到第几张图片元素较少时元素靠右

更新`RelaxImageCard`组件

- 调整层叠值
- 渲染的工具栏 hover 后再出现
- 工具栏从百分比变成固定底部高度 12px
- 提供类似 `FullWrapperCard` 的受控属性，让外界可以监听浏览元素的变化情况

## 备注

> 这个组件库是自己为毕设做的，如果确实有什么功能需要补充的，可以联系我
>
> 博客：https://blog.csdn.net/weixin_45696837?type=blog
>
> github : https://github.com/aiketangdezhiyi
