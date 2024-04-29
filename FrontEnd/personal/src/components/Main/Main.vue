<template>
  <a-segmented :block="true" v-model:value="activeLabel" :options="options" />

  <div class="more">
    <component :is="COM_MAP[activeLabel]"></component>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import RelationalChart from '@components/RelationalChart/RelationalChart.vue';
import ContributionChart from '@components/ContributionChart/ContributionChart.vue';
import FileCom from '@components/FileCom/FileCom.vue';

const COM_MAP = {
  关系图: RelationalChart,
  贡献图: ContributionChart,
  文件: FileCom,
};

const options = computed(() => data.map(({ label }) => label));

const data = reactive([
  {
    label: '关系图',
    value: 'RelationalChart',
  },
  {
    label: '贡献图',
    value: 'ContributionChart',
  },
  {
    label: '文件',
    value: 'FileCom',
  },
]);

const activeLabel = ref(data[0].label);
</script>

<style scoped lang="less">
.more {
  box-sizing: border-box;
  width: 100%;
  height: calc(100vh - 91px);
  padding: 20px 0;
}
</style>

