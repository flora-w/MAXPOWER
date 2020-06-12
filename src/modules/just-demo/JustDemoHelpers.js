import merge from 'lodash/merge';
import * as COLORS from 'constants/colors';
import getBarOption from 'metadata/chart-options/bar';
import { toDisplayValue } from 'utils/numbersHelpers';


export function generateQuarterlyBarCharyOption({
  seriesTime,
  kpiValue,
  precision,
}) {
  const baseOption = getBarOption({
    xLabel: seriesTime,
    test1:[kpiValue.test1],
    test2:kpiValue.test2,
    
  });
  const customOption = {
    legend: { 
      data:['test1','test2']
     },
     yAxis: {
      type: 'value',
      show:true,
      axisLine: {show:true},
      axisTick: {show:true},

    },
    xAxis: {
      type: 'category',
     },
     toolbox: {
      feature: {
          saveAsImage: {show:true}
      }
    },
    color: [COLORS.RED,COLORS.BLUE],
    series: baseOption.series.map(({ data }) => ({
      data: data,
      type: 'line',
        symbol: 'triangle',
        symbolSize: 10,
      label: {
        normal: {
          show: true,
          position: 'top',
          fontSize: 14,
          formatter: ({ value }) =>
            toDisplayValue({ value, precision, unit: 1 }),
        },
      },
    }
  )),
    tooltip: {
      trigger: 'axis',
    },
  };
  return merge(baseOption, customOption);
}