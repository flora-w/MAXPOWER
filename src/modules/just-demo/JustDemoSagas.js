import { put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga/effects';
import * as ACTIONS from 'constants/actionTypes';
import * as REDUCERS from 'constants/reducerNames';
import JustDemoService from 'services/JustDemoService';

export function* fetchJustDemo({ type, target, ...queries }) {
  // try {
  //   yield put({ type: ACTIONS.START_LOADING });
  //   const { data } = yield JustDemoService.fetchJustDemo(queries);
  //   const { params, ...rest } = data.data;
  //   yield put({
  //     type: ACTIONS.SET_STATE,
  //     target: REDUCERS.GLOBAL_INFO,
  //     state: { ...params },
  //   });

  //   yield put({
  //     type: ACTIONS.SET_STATE,
  //     target: REDUCERS.JUST_DEMO,
  //     state: { ...rest },
  //   });
  // } catch (err) {
  //   yield put({ type: ACTIONS.RAISE_ERROR });
  // } finally {
  //   yield put({ type: ACTIONS.END_LOADING });
  // }
}

export default [
  takeLatest(ACTIONS.FETCH_JUST_DEMO, fetchJustDemo)
];
