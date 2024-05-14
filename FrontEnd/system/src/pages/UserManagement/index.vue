<template>
  <div class="user-management-container">
    <div class="form-box">
      <a-form ref="formRef" :model="formState" layout="inline">
        <a-form-item label="用户名称" name="username">
          <a-input v-model:value="formState.username" />
        </a-form-item>
        <a-form-item label="用户手机号" name="phone">
          <a-input v-model:value="formState.phone" />
        </a-form-item>
        <a-form-item label="用户状态" name="status">
          <a-select :style="{ width: '200px' }" v-model:value="formState.status">
            <a-select-option :value="0">正常</a-select-option>
            <a-select-option :value="1">锁定</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>

      <div class="basalFormButtonContainer">
        <a-space>
          <a-button @click="search" type="primary">查询</a-button>
          <a-button @click="reset">重置</a-button>
        </a-space>
      </div>
    </div>

    <div class="table-box">
      <a-spin :spinning="loading">
        <el-table-v2 v-loading="loading" :columns="columns" :data="dataSource" :width="1600" :height="700" fixed />
      </a-spin>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { ref, computed, reactive, createVNode } from 'vue';
import 'element-plus/dist/index.css';
import { getUserList } from '@/api/user';
import { ElTableV2 } from 'element-plus';
import dayjs from 'dayjs';
import { Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';

let dataSource = ref([]);

const optionHandler = (content: string) => {
  Modal.confirm({
    title: '操作提示',
    icon: createVNode(ExclamationCircleOutlined),
    content: createVNode('div', {}, content),
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
    class: 'test',
  });
};

const columns = [
  {
    title: '用户名',
    dataKey: 'username',
    key: 'username',
    width: 200,
    align: 'center',
  },
  {
    title: '手机号',
    dataKey: 'phone',
    key: 'phone',
    width: 200,
    align: 'center',
  },
  {
    title: '性别',
    dataKey: 'sex',
    key: 'sex',
    width: 200,
    align: 'center',
  },
  {
    title: '状态',
    dataKey: 'status',
    key: 'status',
    width: 200,
    align: 'center',
  },
  {
    title: '注册时间',
    dataKey: 'createdTime',
    key: 'status',
    width: 200,
    align: 'center',
  },
  {
    title: '更新时间',
    dataKey: 'updatedTime',
    key: 'updatedTime',
    width: 200,
    align: 'center',
  },
  {
    width: 200,
    title: '操作',
    cellRenderer: data => {
      // console.log('data', data);

      return (
        <>
          <div>
            <a-button
              onClick={() => {
                optionHandler('确定禁用 {} 用户？');
              }}
              type='link'
              size='small'
            >
              禁用
            </a-button>

            <a-button
              onClick={() => {
                optionHandler('确定删除 {} 用户？');
              }}
              type='link'
              size='small'
              danger
            >
              删除
            </a-button>
          </div>
        </>
      );
    },
    align: 'center',
  },
];

columns.unshift({
  key: 'column-n-1',
  width: 50,
  title: '序号',
  cellRenderer: ({ rowIndex }: any) => `${rowIndex + 1}`,
  align: 'center',
});

const formState = ref({
  status: null,
  phone: null,
  username: null,
});

const reset = () => {
  formState.value = {
    status: null,
    phone: null,
    username: null,
  };
  search();
};

const loading = ref(false);

const search = async () => {
  loading.value = true;

  const res = await getUserList({
    ...formState.value,
    flag: null,
    sex: null,
    page: 1,
    pageSize: 9999999,
  });

  console.log('res', res);

  dataSource.value = res.items.map(v => {
    return {
      ...v,
      sex: v.sex === 0 ? '男' : '女',
      status: v.status ? '锁定' : '正常',
      createdTime: dayjs(v.createdTime).format('YYYY-MM-DD HH:mm:ss'),
      updatedTime: dayjs(v.updatedTime).format('YYYY-MM-DD HH:mm:ss'),
    };
  });
  loading.value = false;
};

search();
</script>

<style scoped lang="less">
.user-management-container {
  width: 100%;
  .basalFormButtonContainer {
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-right: 20px;
  }

  .table-box {
    margin-top: 10px;
  }
}
</style>
