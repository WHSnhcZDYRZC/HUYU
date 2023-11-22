<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#cf5659',
      },
    }"
  >
    <router-view />
  </a-config-provider>
</template>

<script lang="ts" setup>
import { theme } from 'ant-design-vue';
</script>

<style scoped lang="less">
@import url('ant-design-vue/dist/reset.css');
</style>
