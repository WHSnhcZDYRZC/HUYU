<template>
  <a-spin :spinning="spinning">
    <div id="PersonalFileUpdate" @dragover="e => e.preventDefault()" @drop="fileDrop" @click="() => iptDom?.click()">
      <div class="icon">
        <CloudUploadOutlined />
      </div>
      <p>拖拽文件至此，或点击上传</p>
      <input ref="iptDom" type="file" @change="inputChange" />
    </div>
  </a-spin>
</template>
<script setup lang="ts">
import { CloudUploadOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { beforeUpdateFile, mediumUpdateFile } from '@/api/file';
import { ref } from 'vue';
import { MINI_FILE_SIZE, MAX_FILE_SIZE, getFileSimple, ResFile, getBigFileSimple } from './utils/FileUtils';
import BigDataUpdateMessage from './class/BigDataUpdateMessage';

const iptDom = ref(null);
const spinning = ref<boolean>(false);

const fileDrop = async (e: any) => {
  e.preventDefault();

  const {
    dataTransfer: { files },
  } = e;

  const file = files[0];
  updateHandler(file);
};

const inputChange = e => {
  if (e.target.files.length) {
    updateHandler(e.target.files[0]);
  }
};

const bigFileUpload = async (file: File) => {
  const res = await getBigFileSimple(file);

  if (res === ResFile.SUCCESS) {
    BigDataUpdateMessage.success('上传成功！');
  }
};

const generalFileUpload = async (file: File) => {
  const result = await getFileSimple(file);
  if (result.state === ResFile.SUCCESS) {
    return message.success('文件上传成功');
  }

  const fm = new FormData();
  fm.append('file', file);
  fm.append('fileHash', result.hash);
  const { code, message: msg }: any = await mediumUpdateFile(fm);

  if (code === 200) {
    message.success(msg);
  } else {
    message.error(msg);
  }
};

const updateHandler = async (file: File) => {
  if (file.size > MAX_FILE_SIZE) {
    return message.warning('文件过大，最大不能超过 10G');
  }

  try {
    spinning.value = true;
    if (file.size < MINI_FILE_SIZE) {
      await generalFileUpload(file);
    } else {
      await bigFileUpload(file);
    }
  } finally {
    spinning.value = false;
  }
};
</script>
<style scoped lang="less">
.ant-spin-nested-loading {
  width: 100%;
  height: 50%;
  :deep(.ant-spin-container) {
    width: 100%;
    height: 100%;
  }
}
#PersonalFileUpdate {
  display: flex;
  width: 100%;
  height: 100%;
  border: 1px dashed #4c4d4f;
  cursor: pointer;
  // justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;

  .icon {
    height: 25%;
    // margin-left: 50%;
    // margin-top: 50%;
    // transform: translateY(-100%);
    :deep(span) {
      width: 100%;
      height: 100%;

      svg {
        width: 100%;
        height: 100%;
        color: #8d9095;
      }
    }
  }

  p {
    text-align: center;
    color: #8d9095;
  }

  input {
    display: none;
  }
}

#PersonalFileUpdate:hover {
  border: 1px dashed #c84c4f;
  .icon {
    :deep(span) {
      svg {
        color: #c84c4f;
      }
    }
  }

  p {
    color: #c84c4f;
  }
}
</style>
