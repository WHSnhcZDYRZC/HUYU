<template>
  <div class="progress-box">
    <Progress :percent="handler.percent.value" />
    <Button @click="changeUploadStatus">
      <template #icon>
        <PauseOutlined v-if="status" />
        <CaretRightOutlined v-else />
      </template>
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Progress, Button } from 'ant-design-vue';
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
import BigDataUpdateHandler from '../FileUpdate/class/BigDataUpdateHandler';

const props = defineProps({
  handler: {
    type: BigDataUpdateHandler,
    required: true,
  },
});

const status = ref(true);

const changeUploadStatus = () => {
  status.value ? props.handler.pause() : props.handler.recover();
  status.value = !status.value;
};
</script>

<style lang="less" scoped></style>
