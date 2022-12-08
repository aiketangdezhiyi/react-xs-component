import { debounce } from '../utils/webPerformance';
import { getViewportOffset, loadImage } from 'yuxuannnn_utils';

export interface ILazyItem {
  ele: HTMLImageElement | null;
  src: string;
  /** 在图片完全加载完成后运行回调 */
  onShow: () => void;
  loaded?: boolean;
}

type TCanShowFunc = (item: ILazyItem) => boolean;

class LazyImageControl {
  #needLazyImageList: ILazyItem[] = [];
  #isAddDocumentEvent = false;
  #eleMap = new WeakMap<HTMLImageElement, ILazyItem>();
  customCanShow: TCanShowFunc | null = null;
  constructor() {
    this.init();
  }
  add(item: ILazyItem) {
    this.#needLazyImageList.push(item);
    item.ele && this.#eleMap.set(item.ele, item);
  }
  init() {
    if (this.#isAddDocumentEvent) return;
    document.addEventListener('scroll', debounce(this.update.bind(this), 300));
    this.#isAddDocumentEvent = true;
    // 暴露其他注册事件的接口
  }

  /**
   * 用于注册其他DOM的滚动事件
   * @param dom
   */
  extends(dom: any) {
    dom?.addEventListener('scroll', debounce(this.update.bind(this), 300));
  }

  update() {
    this.#needLazyImageList.forEach((it) => {
      let canShow = this.customCanShow || this.canShow;
      canShow = canShow.bind(this);
      if (it.ele && canShow(it)) {
        // 可以更新
        loadImage(it.src).then(() => {
          typeof it.onShow === 'function' && it.onShow();
        });

        it.loaded = true;
      }
    });
    this.remove();
  }
  remove() {
    this.#needLazyImageList = this.#needLazyImageList.filter((it) => !it.loaded);
  }
  /**
   * 移除某一个图片配置对象
   * 例如组件卸载之后 防止因为调用hook带来的闭包泄露问题
   */
  removeItem(ele: HTMLImageElement | null) {
    if (!ele) {
      return;
    }
    const lazyControl = this.#eleMap.get(ele);
    if (!lazyControl) return;

    lazyControl.ele = null;
    lazyControl.loaded = true;
  }

  canShow(item: ILazyItem): boolean {
    const { ele } = item;
    if (!ele) return false;

    const domInfo = ele.getBoundingClientRect();
    const viewInfo = getViewportOffset();
    return domInfo.top - viewInfo.h < 10;
  }

  /** 用户可以自定义化展示规则 */
  setCanShow(canShow: TCanShowFunc) {
    this.customCanShow = canShow;
  }
}

export const lazyImageControl = new LazyImageControl();
