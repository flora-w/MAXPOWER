import merge from 'lodash/merge';
import * as COLOR from 'constants/colors';

const baseBarOption = {
  grid: {
    left: '0',
    right: '0',
  },
  color: ['#1BB9B9', '#879CAB', COLOR.ORANGE, COLOR.RED],
  xAxis: {
    type: 'category',
    axisTick: { show: false },
    data: [],
    axisLabel: {
      width: 40,
      height: 40,
      color: COLOR.LABEL_TEXT,
    },
    triggerEvent: true,
    axisLine: {
      lineStyle: {
        color: '#414C53',
      },
    },
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

const seriesItem = ({ y_data, selectedProject, barType }) => {
  if (barType === 'ads') {
    return [
      {
        type: 'bar',

        barGap: '-50%',
        itemStyle: {
          barBorderRadius: [5, 5, 0, 0],
          color: '#1BB9B9',
        },
        label: {
          show: true,
          position: 'top',
          color: '#FFFFFF',
          formatter: function(data) {
            let str = Math.round(data.data);
            return str;
          },
        },
        data: y_data,
      },
    ];
  } else
    return [
      {
        type: 'bar',
        barGap: '-50%',
        itemStyle: {
          barBorderRadius: [5, 5, 0, 0],
          color: '#1BB9B9',
        },
        label: {
          show: true,
          position: 'top',
          color: '#FFFFFF',
          formatter: function(data) {
            let str = ((data.data * 10000) / 100).toFixed(1);
            return str + '%';
          },
        },
        data: y_data,
      },
    ];
};

function mapArrayToBarData(arr) {
  let result = {};
  arr.forEach(prj => {
    Object.keys(prj).forEach(key => {
      const value = prj[key];
      result[key] = result[key] || [];
      result[key].push(value);
    });
  });

  return result;
}

export default function(unit, barType, selectedProject, deep_dive_bar_sorted) {
  let data = {};

  data = mapArrayToBarData(
    deep_dive_bar_sorted.find(item => item.name === barType).result,
  );

  const y_data = data['ratio'];

  const project_list = data['project'];

  const x_data = mapArrayToBarData(project_list);

  let series = [];
  series = series.concat(seriesItem({ y_data, selectedProject, barType }));

  const lineData = data['apr'];

  if (barType === 'yield' || barType === 'ads') {
    series = series.concat({
      name: 'line',
      type: 'scatter',
      showAllSymbol: true,
      symbol: 'dot',
      symbolSize: [(document.body.clientWidth * 0.55) / lineData.length, 1],
      itemStyle: {
        color: '#FFFFFF',
      },
      data: lineData,
    });
  }
  const option = {
    xAxis: {
      data: x_data['model_name'],
      axisLabel: {
        formatter: data => {
          let str = data.split(' ').join('\n');
          if (data === selectedProject) str = str + '\n{a|}';
          return str;
        },
        fontSize: function(xLabel) {
          if (xLabel.length < 9) return 10;
          else if (xLabel.length < 12) return 8;
          else return 4;
        },
        rich: {},
      },
    },
    series,
  };

  return merge(option, baseBarOption);
}
