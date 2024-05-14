<template>
  <div id="PersonalContributionChart"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted } from 'vue';
import { getArticleMenu } from '@/api/active';
import HistoryStorage from '@/utils/HistoryStorage';

function getVirtualData(year: string, orgData: any) {
  console.log('orgData', orgData);

  const date = +echarts.time.parse(year + '-01-01');
  const end = +echarts.time.parse(+year + 1 + '-01-01');
  const dayTime = 3600 * 24 * 1000;
  const data: [string, number][] = [];
  for (let time = date; time < end; time += dayTime) {
    const _ = orgData.reduce((pre, v) => {
      if (time < v.updatedTime && time + dayTime > v.updatedTime) {
        pre += v.editTimes;
      }

      return pre;
    }, 0);

    console.log('_', _, time);

    data.push([echarts.time.format(time, '{yyyy}-{MM}-{dd}', false), Math.floor(_ || 0)]);
  }

  return data;
}

const getArticleMenuHandler = async () => {
  const { code, data } = await getArticleMenu({
    id: HistoryStorage.getSessionItem('userInfo')?.id,
  });

  if (code === 200) {
    init(data);
  }
};

const init = data => {
  var chartDom = document.getElementById('PersonalContributionChart')!;
  var myChart = echarts.init(chartDom);
  var option: echarts.EChartsOption;

  option = {
    // title: {
    //   top: 30,
    //   left: 'center',
    //   text: 'Daily Step Count',
    // },
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
      max: 50,
      calculable: true,
      type: 'piecewise',
      orient: 'horizontal',
      left: 'center',
      bottom: '15%',
    },
    calendar: {
      top: 120,
      left: 30,
      right: 30,
      cellSize: ['auto', 30],
      range: '2024',
      itemStyle: {
        borderWidth: 0.5,
      },
      yearLabel: { show: false },
    },
    series: {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data: getVirtualData('2024', data),
    },
  };

  option && myChart.setOption(option);
};

onMounted(() => {
  getArticleMenuHandler();
});
</script>

<style scoped lang="less">
#PersonalContributionChart {
  width: 100%;
  height: 100%;
}
</style>
