import merge from 'lodash/merge';

import * as COLOR from 'constants/colors';

const baseLineOption = {
  legend: {
    left: 0,
    textStyle: { color: COLOR.LABEL_TEXT },
  },
  grid: {
    right: 0,
    left: 0,
    containLabel: true,
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    interval: 0,
    type: 'category',
    boundaryGap: true,
    axisTick: {
      show: false,
    },
  },
  yAxis: {
    type: 'value',
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
    splitLine: {
      show: false,
    },
  },
  series: [],
};

const sampleInput = {
  xLabel: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
  email: [120, 132, 101, 134, 90, 230, 210],
  phones: [220, 182, 191, 234, 290, 330, 310],
  videos: [150, 232, 201, 154, 190, 330, 410],
  access: [320, 332, 301, 334, 390, 330, 320],
};

export default function(
  { xLabel = [], ...series } = sampleInput,
  formatter = v => v,
) {
  const seriesArray = Object.keys(series).map(name => {
    const data = series[name] || [];
    return {
      name,
      data: data.map(formatter),
      type: 'line',
      symbolSize: 6,
    };
  });

  const formatted = xLabel.map(value => {
    return {
      value: value,
      textStyle: { color: COLOR.LABEL_TEXT },
    };
  });

  const option = {
    xAxis: { data: formatted },
    series: seriesArray,
  };
  return merge(option, baseLineOption);
}
