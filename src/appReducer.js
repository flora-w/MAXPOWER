import message from 'antd/es/message';
import { combineReducers } from 'redux';

import * as ACTION from './constants/actionTypes';
import * as REDUCER from './constants/reducerNames';

import auth from './modules/auth/authReducer';
import JustDemo from './modules/just-demo/JustDemoReducer';
import OpenlinePlanShow from './modules/openline-plan-show/OpenlinePlanShowReducer';
import OpenlinePlanMaintain from './modules/openline-plan-maintain/OpenlinePlanMaintainReducer';
import { setState } from './utils/reduxHelpers';

const origin = {
  width:'',
  bg: 'sdbg',
  unit: 'NTD',
  site: 'ALL',
  target_project: 'ALL',
  site_list: [],
  project_list: [],
  lv2_code: '',
  rule_base: null,
  period_type: 'MON',
  period_start: '',
  benchmark: 'Budget',
  loading: false,
  period_end: '',
  latest_date: '',
  hist_period_start: '',
  hist_period_end: '',
  allocationMonth: '',
  version:'',
  typedate:'',
  from_date_time:'',
  to_date_time:''
};

const globalInfo = (state = origin, action) => {
  const { type, target, payload } = action;

  switch (type) {
    case ACTION.RAISE_ERROR:
      message.error(
        payload || 'Unknown error occurred. Please try again later.',
      );
      return state;

    case ACTION.RAISE_WARNING:
      message.warning(payload || 'Warning');
      return state;

    case ACTION.ON_SUCCESS:
      message.success(payload || 'Success');
      return state;

    case ACTION.SET_STATE:
      if (target === REDUCER.GLOBAL_INFO) {
        return setState(state, action.state);
      }
      return state;

    case ACTION.START_LOADING:
      return {
        ...state,
        loading: true,
      };

    case ACTION.END_LOADING:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

const reducers = combineReducers({
  globalInfo,
  auth,
  JustDemo,
  OpenlinePlanShow,
  OpenlinePlanMaintain
});

export default reducers;
