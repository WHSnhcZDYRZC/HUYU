<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

const locale = zhCN;
</script>
<template>
  <a-config-provider
    :locale="locale"
    :theme="{
      token: {
        colorPrimary: '#cf5659',
      },
    }"
  >
    <div id="system-app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<style scoped lang="less">
@import url('ant-design-vue/dist/reset.css');

#system-app {
  padding: 20px;
  display: flex;
  justify-content: center;
  height: calc(100vh - 55px);
  overflow-y: auto;
}
</style>
