/**

 * @description 用于本地缓存设置

 */

import dayjs from 'dayjs';

class HistoryStorage {
  /**
   *
   * @param key
   * @param value
   * @param endTime 过期默认一天后
   */
  static setItem(key: string, value: any, endTime = 1) {
    localStorage.setItem(
      key,
      JSON.stringify({ endTime: dayjs().add(endTime, 'day').toJSON(), value }),
    );
  }

  /**
   *
   * @param key
   * @param value
   */
  static setSessionItem(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify({ value }));
  }

  static getSessionItem(key: string) {
    const _res = sessionStorage.getItem(key);
    if (!_res) return _res;
    const { value } = JSON.parse(_res);
    return value;
  }

  static getItem(key: string) {
    const _res = localStorage.getItem(key);
    if (!_res) return _res;
    const { endTime, value } = JSON.parse(_res);
    if (dayjs().isBefore(endTime)) return value;
    this.delete(key);
    return null;
  }

  static delete(key: string) {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  }

  static clear() {
    localStorage?.clear();
    sessionStorage?.clear();
  }
}

export default HistoryStorage;
