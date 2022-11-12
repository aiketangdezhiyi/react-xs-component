import { throttle } from '../utils/webPerformance';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForce } from './useForce';

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

  const { refresh } = useForce();

  duration = duration !== undefined ? duration : 1000;

  useEffect(() => {
    setCount(counterRef.current);
  }, [counterRef.current]);

  const handleDecrease = useCallback(() => {
    counterRef.current = (counterRef.current - 1 + max) % max;
    refresh();
  }, [counterRef, max]);

  const handleIncrease = useCallback(() => {
    counterRef.current = (counterRef.current + 1) % max;
    refresh();
  }, [counterRef, max]);

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
