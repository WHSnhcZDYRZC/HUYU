import { AES, enc, mode, pad } from 'crypto-js';
import { encode } from 'js-base64';

const key = enc.Utf8.parse('201991022019ndit');
const iv = enc.Utf8.parse('1234567876543210');

interface RegListItem {
  reg: RegExp;
  code: number;
}
export const toBase64 = (str: string) => {
  if (!str) return;
  return encode(str);
};

/**
 * aes加密
 * @param str
 * @returns
 */
export function encrypt(str: string) {
  const data = enc.Utf8.parse(str);
  const encrypted = AES.encrypt(data, key, {
    iv: iv,
    mode: mode.CBC,
    padding: pad.Pkcs7,
  });
  return encrypted.toString();
}
/**
 * aes 解密
 * @param str
 * @returns
 */
export function decrypt(str: string) {
  const encrypted = AES.decrypt(str, key, {
    iv: iv,
    mode: mode.CBC,
    padding: pad.Pkcs7,
  });
  const decrypted = encrypted.toString(enc.Utf8);
  return decrypted;
}

// 获取每个字符类型
const getCharType = (char: any) => {
  let type: number = 0;
  regList.some(({ reg, code }) => {
    if (reg.test(char)) {
      type = code;
    }
    return type === code;
  });
  return type;
};

// 1 10 100 1000   若四种都满足，则最后的值应该为1111
const regList: RegListItem[] = [
  {
    reg: /[0-9]/,
    code: 1,
  },
  {
    reg: /[A-Z]/,
    code: 2,
  },
  {
    reg: /[a-z]/,
    code: 4,
  },
  {
    reg: /[~!@#$%&*]/,
    code: 8,
  },
];

// 检验每一位是1还是0，从而计算类型总数 xxxx有几个1代表几种
const getTypeTotal = (num: any) => {
  let modes = 0;
  for (let i = 0; i < 4; i++) {
    if (num & 1) {
      modes++;
    }
    num >>>= 1;
  }
  return modes;
};

const getTypes = (str: any) => {
  let modes = 0;
  for (let i = 0; i < str.length; i++) {
    const c = str.charAt(i);
    modes |= getCharType(c);
  }

  return modes;
};

// 去重(重复的权重是0.5  ，一般的是1 类型是)typeWeight
const getDuplicationLength = (value: string) => {
  const s = new Set(value);
  return s.size + (value.length - s.size) / 3;
};
const getNewStr = (value: string) => {
  const s = new Set(value);
  let _str = '';
  s.forEach((i) => (_str += i));
  return _str;
};

/**
 *  检测检验强度
 * @description - 四种类型每有一种权重typeWeight： ( 10 * max / 4),一般为baseWeight： typeWeight * 0.3, 重复的为baseWeight * 0.3
 *
 * @param {*} str
 * @param {*} min
 * @param {*} max
 * @returns
 */
export const getStrong = (str: string, min: number, max: number) => {
  if (!str) return 1;
  const _str = getNewStr(str);
  let _max = Math.max(_str.length, max);
  const aver = (_max + min) / 2;
  const typeWeight = (_max * aver) / regList.length;
  const baseWeight = typeWeight / 3;
  const maxValue = regList.length * typeWeight + (_max - regList.length) * baseWeight; // 假设4种类型都在

  const modes = getTypes(_str);
  const types = getTypeTotal(modes);
  const len = getDuplicationLength(_str);
  const val = types * typeWeight + (len - types) * baseWeight;
  // console.log('vak', val, maxValue, val / maxValue);
  const rate = +Number(val / maxValue).toFixed(2);

  if (rate >= 0.75) {
    return 3;
  }
  if (rate >= 0.5) {
    return 2;
  }
  return 1;
};
