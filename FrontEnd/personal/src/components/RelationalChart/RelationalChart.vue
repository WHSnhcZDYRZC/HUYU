<template>
  <div id="PersonalRelationalChart"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted } from 'vue';
import graph from './data';
import { getArticleMenu } from '@/api/active';
import HistoryStorage from '@/utils/HistoryStorage';

const getArticleMenuHandler = async () => {
  const { code, data } = await getArticleMenu({
    id: HistoryStorage.getSessionItem('userInfo')?.id,
  });

  console.log('data', data);
};

getArticleMenuHandler();

onMounted(() => {
  var chartDom = document.getElementById('PersonalRelationalChart');
  var myChart = echarts.init(chartDom);
  var option;

  myChart.showLoading();
  // $.get(ROOT_PATH + '/data/asset/data/les-miserables.json', function (graph) {

  myChart.hideLoading();
  graph.nodes.forEach(function (node) {
    node.symbolSize = 5;
  });
  option = {
    title: {
      text: 'HuYu',
      subtext: 'Default layout',
      top: 'bottom',
      left: 'right',
    },
    tooltip: {},
    legend: [
      {
        // selectedMode: 'single',
        data: graph.categories.map(function (a) {
          return a.name;
        }),
      },
    ],
    series: [
      {
        name: 'HuYu',
        type: 'graph',
        layout: 'force',
        data: graph.nodes,
        links: graph.links,
        categories: graph.categories,
        roam: true,
        label: {
          position: 'right',
        },
        force: {
          repulsion: 100,
        },
      },
    ],
  };
  myChart.setOption(option);
  // });

  option && myChart.setOption(option);
});
</script>

<style scoped lang="less">
#PersonalRelationalChart {
  width: 100%;
  height: 100%;
}
</style>
