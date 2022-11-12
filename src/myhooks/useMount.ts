import { useEffect } from "react";

export const useMount = (func) => {
  // 相比较ahooks优势
  // 对于每个useMount的副作用 都可以返回一个函数在组件卸载的时候进行处理
  useEffect(() => {
    const clearFunc = func();
    return clearFunc;
  }, []);
};
