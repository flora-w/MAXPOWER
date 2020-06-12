import {
  generateQuarterlyBarCharyOption
} from './JustDemoHelpers';
import { getUnit } from 'appSelectors';
import { createDeepEqualSelector } from 'utils/reselectHelpers';

export const getQuarterlySeries = createDeepEqualSelector(
  state => ({ ...state.JustDemo.quarter_series }),
  getUnit,
  ({ series_name, series_time, series_data }, unit) => {
    const precision =  0 ;
    let nextPrecision = precision;
    const seriesData = Object.entries(series_data).map(([kpi, kpiValue]) => {
      const kpiValue1 = Object.entries(kpiValue).reduce(
        (prev, [kpi, [ ...value1 ]]) => {
          let displayUnit = 1;
          const displayValue = value1.map(function (item) {
            return (item / displayUnit).toFixed(nextPrecision);
          });
          return {
            ...prev,
            [kpi]:displayValue
          }
        },{});
      const option = generateQuarterlyBarCharyOption({
        kpi: kpi,
        kpiValue: kpiValue1,
        precision: nextPrecision,    
        seriesTime: series_time,
      });
      return {
        option,
        title: kpi==="Hokkaido"?"北海道":kpi==="Kyushu"?"九州":"四國",
      };
    });
    return seriesData;
  },
);