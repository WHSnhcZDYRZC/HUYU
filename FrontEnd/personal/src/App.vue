<script setup lang="ts">
import Main from '@components/Main/Main.vue';
</script>

<template>
  <a-config-provider
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
