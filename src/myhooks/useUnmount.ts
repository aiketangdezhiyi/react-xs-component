import { useEffect } from "react";
import { useLatest } from "./useLatest";

export const useUnmount = (fn: () => void) => {
  const onUnmountRef = useLatest(fn); // 保证函数变化时，函数始终是最新的

  useEffect(() => {
    return () => {
      onUnmountRef.current();
    };
  }, []);
};
