import merge from 'lodash/merge';
import * as COLOR from 'constants/colors';

const baseBarOption = {
  animation: true,
  legend: {
    textStyle: { color: COLOR.LABEL_TEXT },
    right: '10%',
  },
  grid: {
    right: 0,
    left: 0,
  },
  tooltip: {
    trigger: 'item',
    axisPointer: {
      type: 'shadow',
    },
  },
  xAxis: {
    type: 'category',
    axisTick: { show: false },
    axisLabel: {
      interval: 0,
      color: COLOR.LABEL_TEXT,
    },
    data: [],
  },
  yAxis: {
    type: 'value',
    axisLine: { show: false },
    axisTick: { show: false },
    splitLine: { show: false },
    axisLabel: { show: false },
  },
  series: [],
};

const seriesItem = ({ name, data }, valueFormatter) => ({
  type: 'bar',
  itemStyle: { barBorderRadius: 5 },
  name,
  data: valueFormatter(data),
});

const sampleInput = {
  xLabel: ['Prj1', 'Prj2', 'Prj3', 'Prj4', 'Prj5'],
  Actual: [-5, -1, 1, 2, 4],
  'LTM Norm Band': [8, 6, 6, 7, 7],
  R3M: [13, 9, 7, 9, 10],
  Quote: [1, 1, 3, 4, 6],
};

export default function(
  { xLabel, ...pairs } = sampleInput,
  valueFormatter = v => v,
) {
  const series = Object.keys(pairs).map(name => {
    const data = pairs[name];
    return seriesItem({ name, data }, valueFormatter);
  });

  const option = {
    xAxis: { data: xLabel },
    series,
  };

  return merge(option, baseBarOption);
}

export const getAllocationBarChart = data => ({
  color: [COLOR.GREEN],
  grid: {
    top: 0,
    right: '15%',
    bottom: 0,
    left: 0,
  },
  xAxis: {
    type: 'value',
    axisTick: { show: false },
    axisLine: { show: false },
    splitLine: { show: false },
    axisLabel: { show: false },
  },
  yAxis: {
    type: 'category',
    axisLine: {
      lineStyle: { color: COLOR.GREY_DARK },
    },
    axisTick: { show: false },
    splitLine: { show: false },
    axisLabel: { show: false },
  },
  series: [
    {
      type: 'bar',
      barWidth: 25,
      itemStyle: { barBorderRadius: 3 },
      data,
    },
  ],
});
