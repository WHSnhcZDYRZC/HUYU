<template>
  <div class="system-management-container">
    <div class="upload-box">
      <a-upload name="avatar" list-type="picture-card" class="avatar-uploader" :show-upload-list="false" :before-upload="beforeUpload" :customRequest="customRequest">
        <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
        <div v-else>
          <loading-outlined v-if="loading"></loading-outlined>
          <plus-outlined v-else></plus-outlined>
          <div class="ant-upload-text">点击上传</div>
        </div>
      </a-upload>
    </div>

    <a-divider orientation="left">用户设置</a-divider>

    <a-form ref="formRef" layout="vertical" :model="userForm">
      <a-form-item label="用户名称" name="username">
        <a-input v-model:value="userForm.username" />
      </a-form-item>

      <a-form-item label="手机号码" name="phone">
        <a-input v-model:value="userForm.phone" />
      </a-form-item>

      <a-form-item label="请输入旧密码" name="oldPassword">
        <a-input-password v-model:value="userForm.oldPassword" />
      </a-form-item>

      <a-form-item label="请输入新密码" name="password">
        <a-input-password v-model:value="userForm.password" />
      </a-form-item>

      <a-form-item label="再次输入新密码" name="_password">
        <a-input-password v-model:value="userForm._password" />
      </a-form-item>

      <a-form-item label="用户性别" name="sex">
        <a-select v-model:value="userForm.sex">
          <a-select-option :value="0">男</a-select-option>
          <a-select-option :value="1">女</a-select-option>
          <a-select-option :value="2">未知</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>

    <a-divider orientation="left">笔记设置</a-divider>

    <a-row>
      <a-col :span="11" :style="{ 'margin-right': '4%' }">
        <a-form-item label="标题大小" name="fontSize">
          <a-input-number
            :style="{
              width: '100%',
            }"
            v-model:value="layoutForm.fontSize"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="标题颜色">
          <el-color-picker v-model="layoutForm.color"></el-color-picker>
        </a-form-item>
      </a-col>
    </a-row>

    <div class="btn-box">
      <a-button @click="submit" type="primary">提交</a-button>
      <a-button @click="logout">退出登录</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { mediumUpdateFile } from '@/api/file';
import { setUserInfo } from '@/api/user';
import HistoryStorage from '@/utils/HistoryStorage';
import { Modal } from 'ant-design-vue';
import { ElColorPicker } from 'element-plus';

const setForm = () => {
  const userInfo = HistoryStorage.getSessionItem('userInfo');

  userForm.value = userInfo;
  imageUrl.value = userInfo.image;
};

const userForm = ref({
  password: '',
  oldPassword: '',
  _password: '',
});

const layout = HistoryStorage.getItem('layout');

console.log("formlayout", layout);

const layoutForm = ref(
  layout
    ? layout
    : {
        fontSize: 24,
        color: '#000000',
      }
);

const imageUrl = ref('');

setForm();

const logout = () => {
  const layoutItem = HistoryStorage.getItem('layout');
  HistoryStorage.clear();

  if (layoutItem) {
    HistoryStorage.setItem('layout', layoutItem);
  }
  location.reload();
};

const submit = async () => {
  if (userForm.value.oldPassword) {
    if (!userForm.value.password) {
      return message.warning('请输入要更改的密码!');
    }

    if (userForm.value.password !== userForm.value._password) {
      return message.warning('两次密码不一致!');
    }
  }

  try {
    const res = await setUserInfo({
      ...userForm.value,
      image: imageUrl.value,
    });

    if (res.code === 200) {
      HistoryStorage.setItem('layout', layoutForm.value);

      Modal.success({
        title: '退出登录',
        content: `修改 用户信息 成功请重新登录`,
        onOk: () => logout(),
      });
    }
    console.log('res', res);
  } catch (error) {
    message.error(error);
  }
};

const beforeUpload = file => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只能上传图片文件格式!');
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('头像大小限制为 2M!');
    return false;
  }

  return isJpgOrPng && isLt2M;
};

const customRequest = async e => {
  const fm = new FormData();
  fm.append('file', e.file);
  fm.append('fileHash', '');
  const { code, message: msg, data }: any = await mediumUpdateFile(fm);

  if (code === 200) {
    // message.success(msg);
    imageUrl.value = data.fileUrl;
  } else {
    message.error(msg);
  }
};
</script>

<style scoped lang="less">
.system-management-container {
  width: 80%;

  .upload-box {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;

    img {
      width: 100px;
    }

    .ant-upload-wrapper {
      width: unset;
    }
  }

  .btn-box {
    display: flex;
    justify-content: space-between;
    & > button {
      width: 49%;
    }
  }
}
</style>

<style lang="less">
.el-color-picker {
  width: 100%;
  .el-color-picker__trigger {
    width: 100%;
  }
}
</style>
