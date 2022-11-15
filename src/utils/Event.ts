// 吸收react合成事件的精华，解决原生事件因为闭包要不断进行事件的注册和卸载

export const onDocumentVisible = 'onDocumentVisible';
export type EventType = 'onDocumentVisible';

class DOMEventBus {
  eventMap = new Map<string, Set<Function>>();

  initEvent(dom: any = document, onEventType: string, eventType: EventType) {
    let that = this;
    dom.addEventListener(onEventType, function (e: any) {
      const eventSet = that.eventMap.get(eventType);
      if (eventSet) {
        for (const event of eventSet) {
          event.call(this, e);
        }
      }
    });
  }

  addEvent(eventType: string, handler: Function) {
    let eventSet = this.eventMap.get(eventType);
    if (eventSet) {
      eventSet.add(handler);
    } else {
      eventSet = new Set<Function>();
      eventSet.add(handler);
      this.eventMap.set(eventType, eventSet);
    }
  }

  removeEvent(eventType: string, handler: Function) {
    // 同一类型的事件只需要注册一次就可以，利用事件队列添加和移除模拟事件的注册和销毁
    const eventSet = this.eventMap.get(eventType);
    if (eventSet) {
      eventSet.delete(handler);
    }
  }
}

// 增加移除事件的方法缺点不能确定是否事件可以移除掉,可以看一下set的size是否为0，然后清除，但是需要保存注册事件的引用，但是仅注册一个类型的事件并不影响性能

export const eventBus = new DOMEventBus();

eventBus.initEvent(document, 'visibilitychange', onDocumentVisible);
