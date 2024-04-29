<script setup lang="ts">
import Main from '@components/Main/Main.vue';
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
    <div id="app">
      <Main />
    </div>
  </a-config-provider>
</template>

<style scoped lang="less">
@import url('ant-design-vue/dist/reset.css');

#app {
  padding: 20px;
}
</style>
