import merge from 'lodash/merge';

const bubbleColorSet = [
  '#353F45',
  '#F35E52',
  '#F35E52',
  '#F35E52',
  '#F35E52',
  '#F35E52',
  '#918AAD',
  '#8392BF',
  '#769BD0',
  '#45AEFB',
  '#45AEFB',
];

const units = {
  M: 1000000,
  K: 1000,
  '': 1,
};

function unitFormat(value) {
  for (let [unit, base] of Object.entries(units)) {
    if (Math.abs(value / base) >= 1) {
      return { unit, value: value / base };
    }
  }
  return { unit: '', value: value };
}

const baseBubblelineOption = {
  grid: {
    left: '0',
    right: '0',
  },
  xAxis: {
    splitLine: { show: false },
    axisLabel: { show: false },
    axisTick: { show: false },
    axisLine: {
      lineStyle: {
        color: '#2D3439',
        width: 2,
      },
    },
    min: 0,
    max: 150,
  },
  yAxis: {
    show: false,
  },
  series: [],
};

const seriesItem = (NPI_data, MP_data, precision) => {
  return [
    {
      name: NPI_data,
      symbolSize: function(data) {
        if (typeof data[3] !== 'number') {
          return 15;
        } else if (
          (Math.log10(data[3] / 1000000 + 1) * 13 + 15) / 8 >
          Math.floor(140 / (NPI_data.length + MP_data.length))
        )
          return Math.floor(140 / (NPI_data.length + MP_data.length)) * 8;
        else {
          return Math.log10(data[3] / 1000000 + 1) * 13 + 15;
        }
      },
      data: NPI_data,
      type: 'scatter',
      color: function(data) {
        return bubbleColorSet[0];
      },

      label: {
        emphasis: {
          show: true,
          formatter: function(param) {
            let str = `{a|}  Project Name: ${param.data[2]}`;
            return str;
          },
          lineHeight: 20,
          position: 'inside',
          backgroundColor: '#353F45',
          borderRadius: 5,
          padding: 10,
          textStyle: {
            color: '#FFFFFF',
            fontSize: 14,
          },
        },
        rich: {
          a: {
            backgroundColor: {
              image: '/icons/icon_bubbleChartArrow.png',
            },
          },
        },
      },

      itemStyle: {
        normal: {
          shadowBlur: 3,
          shadowColor: 'rgba(255, 255, 255, 0.5)',
        },
      },
    },
    {
      name: MP_data,
      symbolSize: function(data) {
        if (typeof data[3] !== 'number') {
          return 15;
        } else if (
          (Math.log10(data[3] / 1000000 + 1) * 13 + 15) / 8 >
          Math.floor(140 / (NPI_data.length + MP_data.length))
        )
          return Math.floor(140 / (NPI_data.length + MP_data.length)) * 8;
        else return Math.log10(data[3] / 1000000 + 1) * 13 + 15;
      },
      data: MP_data,
      type: 'scatter',
      color: function(data) {
        if (typeof data['data'][5] !== 'number') return bubbleColorSet[0];
        else return bubbleColorSet[Math.round(data['data'][5])];
      },
      label: {
        emphasis: {
          show: true,
          formatter: function(param) {
            let str = `{a|}  Project Name: ${param.data[2]}`;

            if (typeof param.data[3] !== 'number')
              str = str + '\n{a|}  Revenue: -';
            else
              str =
                str +
                '\n{a|}  Revenue: ' +
                unitFormat(param.data[3]).value.toFixed(precision) +
                ' ' +
                unitFormat(param.data[3]).unit;

            if (typeof param.data[4] !== 'number')
              str = str + '\n{a|}  Operating Income: -';
            else
              str =
                str +
                '\n{a|}  Operating Income: ' +
                unitFormat(param.data[4]).value.toFixed(precision) +
                ' ' +
                unitFormat(param.data[4]).unit;

            if (typeof param.data[5] !== 'number')
              str = str + '\n{a|}  Health Score: -';
            else
              str =
                str +
                '\n{a|}  Health Score: ' +
                Math.round(param.data[5] * 100) / 100;
            return str;
          },
          lineHeight: 20,
          position: 'inside',
          backgroundColor: '#353F45',
          borderRadius: 5,
          padding: 10,
          textStyle: {
            color: '#FFFFFF',
            fontSize: 14,
          },
        },
        rich: {
          a: {
            backgroundColor: {
              image: '/icons/icon_bubbleChartArrow.png',
            },
          },
        },
      },
      itemStyle: {
        normal: {
          shadowBlur: 3,
          shadowColor: 'rgba(255, 255, 255, 0.5)',
        },
      },
    },
  ];
};

export default function(NPI_status, MP_status, precision = 0) {
  let series = [];
  series = series.concat(seriesItem(NPI_status, MP_status, precision));
  const option = {
    series,
  };
  return merge(option, baseBubblelineOption);
}
