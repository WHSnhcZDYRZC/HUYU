<template>
  <div id="PersonalRelationalChart"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
// import graph from './data';
import { getArticleMenu } from '@/api/active';
import HistoryStorage from '@/utils/HistoryStorage';

function transformData(inputArr) {
  const nodes = inputArr.map(item => ({
    id: item.id,
    name: item.title,
    value: item.editTimes,
  }));

  const links = [];
  const routerPathMap = {};

  // 构建routerPath到id的映射
  inputArr.forEach(item => {
    const pathParts = item.routerPath.split('/');
    let currentPath = '';
    pathParts.forEach((part, index) => {
      if (index > 1) {
        // 忽略前两部分，因为它们不是页面ID
        currentPath += '/' + part;
        if (!routerPathMap[currentPath]) {
          routerPathMap[currentPath] = item.id;
        }
      }
    });
  });

  // 根据routerPath生成links
  Object.keys(routerPathMap).forEach(path => {
    const parentId = getParentId(path, routerPathMap);
    if (parentId) {
      links.push({
        source: parentId,
        target: routerPathMap[path],
      });
    }
  });

  function getParentId(path, map) {
    const pathParts = path.split('/');
    pathParts.pop(); // 移除当前部分
    const parentPath = pathParts.join('/');
    return map[parentPath] || null;
  }

  return {
    nodes,
    links,
  };
}

const graph = ref({
  nodes: [],
  links: [],
});

const getArticleMenuHandler = async () => {
  const { code, data } = await getArticleMenu({
    id: HistoryStorage.getSessionItem('userInfo')?.id,
  });

  if (code === 200) {
    graph.value = transformData(data);
    init();
  }
};

const init = () => {
  var chartDom = document.getElementById('PersonalRelationalChart');
  var myChart = echarts.init(chartDom);
  var option;

  myChart.showLoading();
  // $.get(ROOT_PATH + '/data/asset/data/les-miserables.json', function (graph) {

  myChart.hideLoading();
  graph.value.nodes.forEach(function (node) {
    node.symbolSize = 20;
  });
  option = {
    title: {
      text: 'HuYu',
      subtext: 'Default layout',
      top: 'bottom',
      left: 'right',
    },
    tooltip: {},
    // legend: [
    //   {
    //     // selectedMode: 'single',
    //     data: graph.categories.map(function (a) {
    //       return a.name;
    //     }),
    //   },
    // ],
    series: [
      {
        name: 'HuYu',
        type: 'graph',
        layout: 'force',
        data: graph.value.nodes,
        links: graph.value.links,
        // categories: [],
        roam: true,
        label: {
          show: true,
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
};

onMounted(() => {
  getArticleMenuHandler();
});
</script>

<style scoped lang="less">
#PersonalRelationalChart {
  width: 100%;
  height: 100%;
}
</style>
