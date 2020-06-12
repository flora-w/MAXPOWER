import * as REDUCERS from 'constants/reducerNames';
import { reducer } from 'utils/reduxHelpers';

const originState = {
  category:typeof(sessionStorage.openlinePlanMaintainCategory)=="undefined"||sessionStorage.openlinePlanMaintainCategory===""?"line":sessionStorage.openlinePlanMaintainCategory,
  line_line:"",
  line_model:"",
  line_fromdate:"",
  line_todate:"",
  line_status:"正常",
  line_statusid:"Y",
  line_data:[
    {
      key:4,
      line:'F1-01',
      model:'LA7',
      fromdate:'2020/5/7',
      todate:'2020/8/7',
      status:'正常'
    },
    {
      key:3,
      line:'F1-02',
      model:'LA7',
      fromdate:'2020/4/7',
      todate:'2020/8/7',
      status:'切線'
    }
  ],
  stock_month:"",
  stock_fab:"",
  stock_model:"",
  stock_stock:"",
  stock_data:[
    {
      key:4,
      month:'2020-05',
      fab:'LA7',
      model:'M1',
      stock:100000,
    },
    {
      key:3,
      month:'2020-04',
      fab:'LA7',
      model:'M2',
      stock:100000,
    }
  ],
  capacity_fab:"",
  capacity_model:"",
  capacity_std:"",
  capacity_data:[
    {
      key:4,
      fab:'LA7',
      model:'M1',
      std:18000,
    },
    {
      key:3,
      fab:'LA7',
      model:'M2',
      std:21000,
    }
  ],
  fsct_data:[{
    'item': 'JDI FCST<1906R11>', 
    'fab': 'Fab1&2', 
    'model': 'F52', 
    'Apr20': 0, 
    'May20': 0, 
    'Jun20': 0, 
    'Jul20': 0, 
    'Aug20': 0, 
    'Sep20': 0
  }, {
    'item': 'JDI FCST<1906R11>', 
    'fab': 'Fab1&2', 
    'model': 'F54', 
    'May20': 0, 
    'Jun20': 0, 
    'Jul20': 0, 
    'Aug20': 0, 
    'Sep20': 0, 
    'Apr20': 232
  }, {
    'item': 'JDI FCST<1906R11>', 
    'fab': 'Fab1&2', 
    'model': 'F56', 
    'Jun20': 0, 
    'Jul20': 0, 
    'Aug20': 0, 
    'Sep20': 0, 
    'Apr20': 0, 
    'May20': 0
  }, {
    'item': 'JDI FCST<1906R11>', 
    'fab': 'Fab1&2', 
    'model': 'F57', 
    'Jul20': 0, 
    'Aug20': 0, 
    'Sep20': 0, 
    'Apr20': 0, 
    'May20': 214, 
    'Jun20': 328
  }, {
    'item': 'JDI FCST<1906R11>', 
    'fab': 'Fab1&2', 
    'model': 'F60', 
    'Aug20': 0, 
    'Sep20': 0, 
    'Apr20': 0, 
    'May20': 0, 
    'Jun20': 0, 
    'Jul20': 0
  }] 
};

export default reducer(originState, REDUCERS.OPENLINE_PLAN_MAINTAIN);
