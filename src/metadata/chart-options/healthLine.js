import merge from 'lodash/merge';
import * as COLOR from 'constants/colors';

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

const baseLineOption = {
  grid: {
    left: '30',
    right: '30',
  },
  legend: {
    right: '30',
    textStyle: { color: COLOR.LABEL_TEXT },
  },
  color: ['#1BB9B9', '#879CAB', COLOR.ORANGE, COLOR.RED],
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisTick: {
      show: false,
    },
    axisLine: {
      lineStyle: {
        color: '#414C53',
      },
    },
    axisLabel: {
      color: '#839CAB',
    },
  },
  yAxis: {
    type: 'value',
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
    splitLine: {
      show: false,
    },
    axisLine: {
      lineStyle: {
        color: '#414C53',
      },
    },
    nameTextStyle: {
      color: '#839CAB',
    },
    min: function(value) {
      if (value.min > 0) return value.min * 0.98;
    },
  },
  series: [],
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

export default function(
  unit,
  barType,
  selectedProject,
  deep_dive_bar_sorted,
  deep_dive,
) {
  let project_list = [];

  project_list = mapArrayToBarData(
    deep_dive_bar_sorted.find(item => item.name === barType).result,
  )['project'];

  let project_code = 0;
  if (selectedProject !== '') {
    let target =
      project_list.find(item => item['model_name'] === selectedProject) || null;
    if (target) project_code = target['model_code'];
    else return {};
  }

  const dataSet = deep_dive[barType]['hist_series'][project_code];
  const valueNameSet = {
    ship: 'Invoice',
    prod: 'Production',
    moh: 'Unit MOH',
    cost_var: 'Material cost variance % of sales',
    yield: 'Yield rate',
    ads: 'ADS',
  };
  const arpNameSet = {
    ship: 'APR',
    prod: 'APR',
    moh: 'Quote',
    cost_var: 'Target',
    yield: 'Target',
    ads: 'ADS target',
  };
  let xLabel = [];
  const seriesArray = Object.keys(dataSet).map(name => {
    const data = dataSet[name];
    if (name === 'time') {
      data.forEach(function(data, i, array) {
        let monthArr = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ];
        if (data.split('/')[1])
          array[i] =
            monthArr[data.split('/')[1] - 1] + "'" + data.split('/')[0];
      });
      xLabel = data;
    } else if (name === 'value') {
      if (barType === 'moh') {
        return {
          name: valueNameSet[barType],
          data: data[unit],
          type: 'line',
          symbolSize: 8,
          symbol: 'circle',
        };
      } else {
        return {
          name: valueNameSet[barType],
          data,
          type: 'line',
          symbolSize: 8,
          symbol: 'circle',
        };
      }
    } else {
      if (barType === 'cost_var') {
      } else if (barType === 'moh') {
        return {
          name: arpNameSet[barType],
          data: data[unit],
          type: 'line',
          symbolSize: 8,
          symbol: 'circle',
        };
      } else {
        return {
          name: arpNameSet[barType],
          data,
          type: 'line',
          symbolSize: 8,
          symbol: 'circle',
        };
      }
    }

    return undefined;
  });

  const formatted = xLabel.map(value => ({
    value,
  }));

  const option = {
    xAxis: { data: formatted },
    series: seriesArray,
    tooltip: {
      formatter: function(params) {
        let str = params[0].axisValue + '<br/>';
        for (let i = 0; i < params.length; i++) {
          if (typeof params[i].data === 'number') {
            if (barType === 'yield' || barType === 'cost_var')
              str =
                str +
                params[i].marker +
                params[i].seriesName +
                ': ' +
                Math.round(params[i].data * 10000) / 100 +
                '%<br/> ';
            else
              str =
                str +
                params[i].marker +
                params[i].seriesName +
                ': ' +
                Math.round(unitFormat(params[i].data).value) +
                ' ' +
                unitFormat(params[i].data).unit +
                '<br/> ';
          } else
            str = str + params[i].marker + params[i].seriesName + ': -<br/> ';
        }
        return str;
      },
      trigger: 'axis',
    },
  };

  const yAxisNameSet = {
    ship: 'volume',
    prod: 'volume',
    moh: '$',
    cost_var: 'percent',
    yield: 'percent',
    ads: 'days',
  };
  const yAxisName = {
    yAxis: {
      name: yAxisNameSet[barType],
    },
  };

  return merge(option, baseLineOption, yAxisName);
}
