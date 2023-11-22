<template>
  <div id="PersonalFileCom">
    <a-button type="primary" @click="openDialogHandler">
      <template #icon>
        <UnorderedListOutlined />
      </template>
      文件上传列表
    </a-button>

    <FileUpdate />
    <FileDialog ref="FileDialogRef" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { UnorderedListOutlined } from '@ant-design/icons-vue';
import FileUpdate from './components/FileUpdate/FileUpdate.vue';
import FileDialog from './components/FileDialog/FileDialog.vue';

const FileDialogRef = ref(null);
const openDialogHandler = () => {
  FileDialogRef.value.openHandler();
};
</script>
<style scoped lang="less">
#PersonalFileCom {
  width: 100%;
  height: 100%;

  :deep(#PersonalFileUpdate) {
    margin-top: 20px;
  }
}
</style>
