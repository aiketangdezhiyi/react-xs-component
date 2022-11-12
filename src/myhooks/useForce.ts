import { useCallback, useState } from "react";

// 提供一个依赖和强制刷新函数
export const useForce = () => {
  const [force, setForce] = useState(Math.random());
  const refresh = useCallback(() => {
    setForce(Math.random());
  }, []);

  return {
    refresh,
  };
};
