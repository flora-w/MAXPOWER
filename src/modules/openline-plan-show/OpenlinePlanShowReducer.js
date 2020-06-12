import * as REDUCERS from 'constants/reducerNames';
import { reducer } from 'utils/reduxHelpers';

const originState = {
  line:""
};

export default reducer(originState, REDUCERS.OPENLINE_PLAN_SHOW);
