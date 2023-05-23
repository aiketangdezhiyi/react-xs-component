import { loadImage } from 'yuxuannnn_utils';

const domToEventMap = new WeakMap<HTMLImageElement, () => void>(); // dom与加载完成的事件的映射

const io = new IntersectionObserver((entries) => {
  entries.forEach((it) => {
    if (it.isIntersecting) {
      loadImage((it.target as any).dataset.src, (src) => {
        const target = it.target as HTMLImageElement;
        target.src = src as string;
        const onShow = domToEventMap.get(target);
        typeof onShow === 'function' && onShow();
        domToEventMap.delete(target);
      });
      io.unobserve(it.target); // 取消DOM监听
    }
  });
});

// 监听某个DOM
export const observerImageDOM = (dom: HTMLImageElement, onShow?: () => void) => {
  io.observe(dom);
  domToEventMap.set(dom, onShow as () => void);
};

// 取消某个DOM的监听
export const unObserverImageDOM = (dom: HTMLImageElement) => {
  io.unobserve(dom);
};

// 取消监听
export const disconnect = () => {
  io.disconnect();
};

export default {
  observerImageDOM,
  unObserverImageDOM,
  disconnect,
  getObserver() {
    return io;
  },
};
