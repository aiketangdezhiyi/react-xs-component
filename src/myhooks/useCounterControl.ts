import { throttle } from 'yuxuannnn_utils';
import { useCallback, useEffect, useRef, useState } from 'react';
/**
 *
 * @param max
 * @param initCounter
 * @param duration 节流的时间
 * @returns
 */
export const useCounterControl = (max: number, initCounter?: number, duration?: number) => {
  const [count, setCount] = useState(initCounter === undefined ? 0 : initCounter);
  const counterRef = useRef<number>(initCounter === undefined ? 0 : initCounter);

  duration = duration !== undefined ? duration : 1000;

  useEffect(() => {
    counterRef.current = count; // 双向绑定 保证更新不出错
  }, [count]);

  const handleDecrease = useCallback(() => {
    counterRef.current = (counterRef.current - 1 + max) % max;
    setCount(counterRef.current);
  }, [max]);

  const handleIncrease = useCallback(() => {
    counterRef.current = (counterRef.current + 1) % max;
    setCount(counterRef.current);
  }, [max]);

  const handleIncreaseWithDebounce = useCallback(throttle(handleIncrease, duration), [
    handleIncrease,
    duration,
  ]);

  const handleDecreaseWithDebounce = useCallback(throttle(handleDecrease, duration), [
    handleDecrease,
    duration,
  ]);

  return {
    count,
    handleIncrease,
    handleDecrease,
    handleIncreaseWithDebounce,
    handleDecreaseWithDebounce,
    setCount,
  };
};
