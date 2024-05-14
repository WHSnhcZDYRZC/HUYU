type TaskKeyType = string;
type KeyValueType = (e: Event | null) => void;

export interface TaskMap {
  [key: TaskKeyType]: KeyValueType;
}

/**
 * @class GlobeHandler 全局函数统一处理器
 */
export default class GlobeHandler {
  // 其他事件容器
  // ...
  // static #globeClickTaskMap: TaskMap = {};
  static #globeResizeTaskMap: TaskMap = {};

  static start() {
    window.addEventListener('resize', (e: Event) => {
      Object.keys(this.#globeResizeTaskMap).forEach((v: TaskKeyType) => {
        this.#globeResizeTaskMap[v](e);
      });
    });

    // 其他事件
    // ...
  }

  static setGlobeResizeTaskMap(handlerName: TaskKeyType, handler: KeyValueType) {
    this.#globeResizeTaskMap[handlerName] = handler;
    handler(null);
  }

  static removeGlobeResizeTaskMap(handlerName: TaskKeyType) {
    if (this.#globeResizeTaskMap[handlerName]) {
      delete this.#globeResizeTaskMap[handlerName];
    }
  }
}

GlobeHandler.start();
