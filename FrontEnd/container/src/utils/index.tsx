import HistoryStorage from './HistoryStorage';
import { message } from 'antd';

/**
 * @function formatPhoneNumber 手机号脱敏
 * @param phoneNumber
 * @returns
 */
export const formatPhoneNumber = (phoneNumber: string) => {
  if (!phoneNumber) return;

  const formattedNumber = phoneNumber?.replace(/^(\d{3})(\d+)(\d{4})$/, (_, prefix, middle, suffix) => {
    const maskedMiddle = '*'.repeat(middle.length);
    return `${prefix}${maskedMiddle}${suffix}`;
  });

  return formattedNumber;
}

/**
 * @function objectToQueryString 对象序列化成 URL
 * @param {}
 * @returns
 */
export const objectToQueryString = (obj: any) => Object.keys(obj)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
  .join('&');

/**
 * @function queryStringToObject URL序列化成 对象
 * @param ""
 * @returns
 */
export const queryStringToObject = (queryString: string) => {
  const params = new URLSearchParams(queryString);
  const obj: any = {};

  for (const [key, value] of params.entries()) {
    obj[key] = value;
  }

  return obj;
}

/**
 * @function objectToQueryString 标签转译序列化
 * @param str string
 * @returns
 */
export const escapeHtml = (str: string) => {
  const escapeMap: any = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };

  return DOMpurify?.sanitize(str)?.replace(/[&<>"']/g, (char: any) => escapeMap[char]);
}

/**
 * @function objectToQueryString 标签转译反序列化
 * @param str string
 * @returns
 */
export const unescapeHtml = (str: string) => {
  const unescapeMap: any = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'"
  };

  return str?.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, entity => unescapeMap[entity]);
}

export const getActiveEnterprise = (enterpriseId: string = HistoryStorage.getItem("enterpriseId")) => {
  const enterpriseList = HistoryStorage.getItem("enterpriseList")

  if (!enterpriseList?.length || !enterpriseId) {
    return {};
  }

  const item = enterpriseList.find((v: any) => v.id === enterpriseId)

  return {
    ...item,
    label: item.enterpriseName,
    value: item.id,
    id: item.id,
  };
}

export const convertToCurrencyFormat = (num: number): string | any => {
  return num ? `￥${num.toLocaleString()}` : num;
}

export const copyTextToClipboard = (text: string) =>
  navigator.clipboard.writeText(text).then(() => message.success("复制成功!"))
