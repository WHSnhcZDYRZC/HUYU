<template>
  <a-modal class="file-modal" :footer="null" v-model:open="open" title="文件列表">
    <a-table width="100%" :columns="columns" :data-source="dataSource" :pagination="false" :loading="loading">
      <template #bodyCell="{ column, record }">
        <div v-if="column.dataIndex === 'fileUrl'">
          <a-button @click="() => download(record.fileUrl)" type="link">{{ record.fileUrl }}</a-button>
        </div>
      </template>
    </a-table>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import type { TableProps } from 'ant-design-vue';
import { getFileList } from '@/api/file';

const download = (v: string) => window.open(v);

const loading = ref(false);

const open = ref(false);

const openHandler = async () => {
  open.value = true;

  loading.value = true;
  const res = await getFileList();

  if (res.code === 200) {
    dataSource.value = res.data;
  }

  loading.value = false;
};

const dataSource = ref([]);

const columns = [
  {
    title: '文件名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '文件地址',
    dataIndex: 'fileUrl',
    key: 'fileUrl',
  },
];

defineExpose({
  openHandler,
});
</script>

<style lang="less">
.file-modal {
  width: unset !important;
  .ant-table-content {
    overflow: auto;
  }
}
</style>
