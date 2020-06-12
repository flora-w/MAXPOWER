import { all, put, takeLatest, select } from 'redux-saga/effects';
import merge from 'lodash/merge';
import * as KEY from './constants/elementKeys';
import * as ACTIONS from './constants/actionTypes';
import authSagas from './modules/auth/authSagas';
import justDemoSagas from './modules/just-demo/JustDemoSagas';
import openlinePlanMaintainSagas from './modules/openline-plan-maintain/OpenlinePlanMaintainSagas';
import * as REDUCERS from 'constants/reducerNames';

function* fetchData({ targetPage = '', params = {} } = {}) {
  const {
    typedate,
  } = yield select(state => state.globalInfo);

  let type;
  switch (targetPage) {
    case KEY.JUST_DEMO: 
      type = ACTIONS.FETCH_JUST_DEMO;
      break;

    default:
      type = ACTIONS.EMPTY_ACTION;
      break;
  }

  let query = merge({ typedate }, params);

  yield put({ type, ...query });
}

const globalSaga = [
  takeLatest(ACTIONS.FETCH_DATA, fetchData),
];

function* rootSaga() {
  yield all([
    ...globalSaga,
    ...authSagas,
    ...justDemoSagas,
    ...openlinePlanMaintainSagas,
  ]);
}

export default rootSaga;
