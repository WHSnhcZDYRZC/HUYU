<template>
  <a-layout class="container">
    <div class="logo">
      <img src="http://192.168.200.131:9000/huyu/2024/04/29/icon.svg" alt="" srcset="" />
      <span>HuYu</span>
    </div>

    <a-layout-content :style="contentStyle">
      <a-form ref="form" class="huyu-form" :model="formState" name="basic" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
        <h1>{{ isLogin ? '登录' : '注册' }} HuYu</h1>
        <a-form-item name="phone" :rules="[{ required: true, message: '请输入手机号！' }]">
          <a-input-group size="large" compact>
            <a-select style="width: 30%" v-model:value="formState.region">
              <a-select-option value="86">+ 86</a-select-option>
            </a-select>
            <a-input placeholder="请输入手机号" v-model:value="formState.phone" style="width: 70%" />
          </a-input-group>
        </a-form-item>

        <a-form-item v-if="isNext && !isCode" name="password" :rules="[{ required: true, message: '请输入密码！' }]">
          <a-input-password placeholder="请输入密码" size="large" v-model:value="formState.password" />
        </a-form-item>

        <a-form-item v-if="isNext && isCode" name="code" :rules="[{ required: true, message: '请输入验证码！' }]">
          <a-input style="width: 78%" placeholder="请输入验证码" size="large" v-model:value="formState.code" />
          <a-button class="code-btn" size="large" @click="getCodeHandler" style="width: 20%">获取验证码</a-button>
        </a-form-item>

        <a-form-item v-if="isNext">
          <!-- <a-button class="huyu-btn" type="primary" danger html-type="submit">登录</a-button> -->
          <a-button class="huyu-btn" type="primary" danger html-type="submit">{{ isLogin ? '登录' : '注册' }}</a-button>
          <!-- <span class="code" @click="changeCodeHandler">
            您也可以 使用<span>{{ isCode ? '账号密码' : '验证码登录' }}</span></span
          > -->
          <span class="code" @click="() => (isLogin = !isLogin)"> {{ isLogin ? '没有用户名？点击注册 ' : '切换登录' }}</span>
        </a-form-item>

        <a-form-item v-else>
          <a-button type="primary" @click="next" danger class="huyu-btn">继续</a-button>
        </a-form-item>

        <a-form-item name="remember">
          <a-checkbox class="agreement" v-model:checked="formState.remember">同意 HuYu<span @click="e => agreementInfoClick(e)" class="agreement-info">《用户协议&隐私协议》</span></a-checkbox>
        </a-form-item>
      </a-form>
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import { CSSProperties, reactive, ref } from 'vue';
// import LOGO from '@/assets/icon/icon.svg';
import { message } from 'ant-design-vue';
import { loginApi, getUserInfo, register } from '@/api/user';
import HistoryStorage from '@/utils/HistoryStorage';
import { Utils, getUUID } from '@/utils';

const contentStyle: CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
};

interface FormState {
  phone: string;
  password: string;
  remember: boolean;
  region: string;
  code: string;
}

const form = ref<any>(null);
const isNext = ref(false);
const isCode = ref(false);
const isLogin = ref(true);

const formState = reactive<FormState>({
  phone: '',
  password: '',
  region: '86',
  remember: false,
  code: '',
});
const onFinish = () => {
  verifyHandler(async () => {
    if (isLogin.value) {
      const { code, data } = await loginApi(formState);
      if (code === 200) {
        HistoryStorage.setItem('token', data);
        const { data: userInfo } = await getUserInfo();
        HistoryStorage.setSessionItem('userInfo', userInfo);
        Utils.getUtils().changeRouter('/personal');
      }
    } else {
      const { code, data } = await register({
        ...formState,
        flag: 0,
        permission: null,
        status: 0,
        sex: 2,
        image: null,
        username: getUUID(5),
      });

      if (code === 200) {
        message.success('注册成功，请登录!');
        reset();
      }
    }
  });
};

const reset = () => {
  formState.phone = "";
  formState.password = "";
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const agreementInfoClick = (e: MouseEvent) => {
  e.stopPropagation();
  e.preventDefault();
};

const verifyHandler = (fn: () => void) => {
  form?.value.validate().then(() => {
    if (!formState.remember) return message.warning('请勾选《用户协议&隐私协议》');
    isNext.value = true;
    fn();
  });
};

const next = () => verifyHandler(() => (isNext.value = true));

const getCodeHandler = () => {};

const changeCodeHandler = () => {
  isCode.value = !isCode.value;
};
</script>

<style scoped lang="less">
.container {
  // box-sizing: border-box;
  padding: 20px;
  position: relative;
  height: 100vh;

  h1 {
    font-weight: 700;
    margin-bottom: 24px;
  }
  .logo {
    display: flex;
    width: 100px;
    height: 25px;

    img {
      width: 25px;
      height: 25px;
    }

    span {
      margin-left: 5px;
      line-height: 25px;
    }
  }

  .huyu-form {
    width: 33.33%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  input {
    text-align: left;
  }

  .huyu-btn {
    width: 100%;
    background-color: #cf5659;
    color: #fff;

    & + .code {
      float: right;
      color: #8e8e8e;
    }

    & + .code:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }

  .agreement {
    color: #8e8e8e;

    .agreement-info:hover {
      text-decoration: underline;
    }
  }

  .code-btn {
    margin-left: 2%;
    color: #8e8e8e;
  }
}

@media (max-width: 800px) {
  .huyu-form {
    width: 90% !important;
  }
}
</style>
