import * as REDUCERS from 'constants/reducerNames';
import { reducer } from 'utils/reduxHelpers';

const originState = {
  kpi_achieved: {
    series_name: [],
    series_code: [],
    series_type: [],
    series_data: { abs: {} },
  },
  quarter_series: {
    series_name: [],
    series_code: [],
    series_type: [],
    series_time: [],
    series_data: {},
  },
  time_series: {
    series_name: [],
    series_code: [],
    series_type: [],
    series_time: [],
    series_data: {},
  },
  table_data: {
    series_name: [],
    series_code: [],
    series_type: [],
    series_time: [],
    series_data: {},
  },
};

export default reducer(originState, REDUCERS.JUST_DEMO);
