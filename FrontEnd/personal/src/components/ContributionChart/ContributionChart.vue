<template>
  <div id="PersonalContributionChart"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted } from 'vue';

function getVirtualData(year: string) {
  const date = +echarts.time.parse(year + '-01-01');
  const end = +echarts.time.parse(+year + 1 + '-01-01');
  const dayTime = 3600 * 24 * 1000;
  const data: [string, number][] = [];
  for (let time = date; time < end; time += dayTime) {
    data.push([echarts.time.format(time, '{yyyy}-{MM}-{dd}', false), Math.floor(Math.random() * 10000)]);
  }
  return data;
}

onMounted(() => {
  var chartDom = document.getElementById('PersonalContributionChart')!;
  var myChart = echarts.init(chartDom);
  var option: echarts.EChartsOption;

  option = {
    title: {
      top: 30,
      left: 'center',
      text: 'Daily Step Count',
    },
    tooltip: {
      position: 'top',
    },
    // visualMap: {
    //   min: 0,
    //   max: 10000,
    //   calculable: true,
    //   type: 'piecewise',
    //   orient: 'horizontal',
    //   left: 'center',
    //   top: 65,
    // },
    visualMap: {
      min: 0,
      max: 10000,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '15%',
    },
    calendar: {
      top: 120,
      left: 30,
      right: 30,
      cellSize: ['auto', 13],
      range: '2016',
      itemStyle: {
        borderWidth: 0.5,
      },
      yearLabel: { show: false },
    },
    series: {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data: getVirtualData('2016'),
    },
  };

  option && myChart.setOption(option);
});
</script>

<style scoped lang="less">
#PersonalContributionChart {
  width: 100%;
  height: 100%;
}
</style>
