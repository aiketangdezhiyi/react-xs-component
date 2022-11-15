import { useEffect } from "react";
import { useLatest } from "./useLatest";
export var useUnmount = function useUnmount(fn) {
  var onUnmountRef = useLatest(fn); // 保证函数变化时，函数始终是最新的

  useEffect(function () {
    return function () {
      onUnmountRef.current();
    };
  }, []);
};