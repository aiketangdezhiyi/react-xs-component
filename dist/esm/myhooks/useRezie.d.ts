/**
 * 这个hook会自动在组件开始时绑定窗口变化事件，并且在组件卸载的时候销毁事件
 * @param func 执行函数
 * @param debounceTime 防抖时间
 */
export declare const useResize: (func: Function, debounceTime?: number) => void;
