/// <reference types="react" />
/**
 *
 * @param max
 * @param initCounter
 * @param duration 节流的时间
 * @returns
 */
export declare const useCounterControl: (max: number, initCounter?: number, duration?: number) => {
    count: number;
    handleIncrease: () => void;
    handleDecrease: () => void;
    handleIncreaseWithDebounce: (this: unknown, ...args: any[]) => void;
    handleDecreaseWithDebounce: (this: unknown, ...args: any[]) => void;
    setCount: import("react").Dispatch<import("react").SetStateAction<number>>;
};
