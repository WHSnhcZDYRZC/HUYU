type cb = (val: any) => any;

class EventEmitter {
  _listeners: { [key: string]: cb[] | undefined } = {};
  _maxListener = 10;

  /**
   * 发布通知
   *
   * @param {string} eventName 事件名称
   * @param  {...any} args 参数
   */
  emit(eventName: string, ...args: [any]) {
    const listeners = this._listeners[eventName];
    if (!listeners?.map) return;

    listeners.forEach((fn) => {
      if (fn) fn(...args);
    });
  }

  /**
   * 注册监听
   *
   * @param {string} eventName 事件名称
   * @param {Function} listener 事件监听器
   * @returns 返回注销监听函数
   */
  on(eventName: string, listener: cb) {
    const listeners = this._listeners[eventName] || [];

    if (listeners.length >= this._maxListener) {
      console.warn(`监听器 [${eventName}] 的最大数量是${this._maxListener}，您已超出限制。`);
    }

    listeners.push(listener);
    this._listeners[eventName] = listeners;

    return () => {
      this.off(eventName, listener);
    };
  }

  /**
   * 注册一次性监听
   *
   * @param {string} eventName 事件名称
   * @param {Function} listener 事件监听器
   */
  once(eventName: string, listener: cb) {
    const off = this.on(eventName, (...args) => {
      listener(...args);
      off();
    });
  }

  /**
   * 注销监听
   *
   * @param {string} eventName 事件名称
   * @param {Function} [listener] 事件监听器，可选参数，传了移除指定监听器，不传移除全部监听器
   */
  off(eventName: string, listener: cb | undefined) {
    if (listener) {
      const listeners = this._listeners[eventName];
      this._listeners[eventName] = listeners?.filter((_listener) => _listener !== listener);
    } else {
      this._listeners[eventName] = undefined;
      delete this._listeners[eventName];
    }
  }

  /**
   * 返回指定事件的监听器数组
   *
   * @param {string} [eventName] 事件名称，可选参数，传了返回指定事件名称监听器，不传返回所有监听器
   */
  listeners(eventName: string) {
    if (!eventName) return this._listeners;
    return this._listeners[eventName];
  }

  /**
   * 设置监听器数量
   *
   * @param {number} n 数量
   */
  setMaxListeners(n: number) {
    this._maxListener = n;
  }

  /**
   * 注销监听
   *
   * @deprecated 该函数废弃，推荐使用off
   *
   * @param {string} eventName 事件名称
   * @param {Function} [listener] 事件监听器，该参数可选，传了的话就会移除指定监听器，不传移除全部监听器
   */
  remove(eventName: string, listener: cb) {
    this.off(eventName, listener);
  }
}
const emitter = new EventEmitter();
export { EventEmitter, emitter };
