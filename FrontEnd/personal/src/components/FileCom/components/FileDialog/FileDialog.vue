<template>
  <a-modal destroyOnClose width="50%" class="file-modal" :footer="null" v-model:open="open" title="文件列表">
    <div class="form-box">
      <a-form ref="formRef" :model="formState" layout="inline">
        <a-form-item label="文件名称" name="fileName">
          <a-input v-model:value="formState.fileName" />
        </a-form-item>

        <a-form-item label="创建时间" name="createdTime">
          <a-range-picker v-model:value="formState.timer" />
        </a-form-item>
      </a-form>

      <div class="basalFormButtonContainer">
        <a-space>
          <a-button @click="openHandler" type="primary">查询</a-button>
          <a-button @click="reset">重置</a-button>
        </a-space>
      </div>
    </div>

    <div class="table-box">
      <a-table size="small" :scroll="{ y: 500 }" :columns="columns" :data-source="dataSource" :pagination="false" :loading="loading">
        <template #bodyCell="{ column, record }">
          <div v-if="column.dataIndex === 'name'">
            <a-button @click="() => download(record.fileUrl)" type="link">{{ record.name }}</a-button>
          </div>
        </template>
      </a-table>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import type { TableProps } from 'ant-design-vue';
import { getFileList } from '@/api/file';
import dayjs from 'dayjs';

const download = (v: string) => window.open(v);
const formRef = ref();
const formState = reactive({
  fileName: '',
  timer: [],
});

const reset = () => {
  formState.fileName = '';
  formState.timer = [];
  openHandler();
};

const loading = ref(false);

const open = ref(false);

const openHandler = async () => {
  open.value = true;

  loading.value = true;

  const res = await getFileList({
    fileName: formState.fileName,
    createdTime: formState.timer[0] ? dayjs(formState.timer[0]).format('YYYY-MM-DD HH:mm:ss') : '',
    endTime: formState.timer[1] ? dayjs(formState.timer[1]).format('YYYY-MM-DD HH:mm:ss') : '',
  });

  if (res.code === 200) {
    dataSource.value = res.data.map(v => ({ ...v, createdTime: dayjs(v.createdTime).format('YYYY-MM-DD HH:mm:ss') }));
  }

  loading.value = false;
};

const dataSource = ref([]);

const columns = [
  {
    title: '文件名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
  // {
  //   title: '文件地址',
  //   dataIndex: 'fileUrl',
  //   key: 'fileUrl',
  //   align: "center"
  // },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    key: 'createdTime',
    align: 'center',
  },
];

defineExpose({
  openHandler,
});
</script>

<style scoped lang="less">
.basalFormButtonContainer {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
}

.table-box {
  margin-top: 10px;
}
</style>
