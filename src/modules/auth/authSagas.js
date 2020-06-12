import { put, takeLatest } from 'redux-saga/effects/';

import * as ACTION from 'constants/actionTypes';
import * as REDUCER from 'constants/reducerNames';
import authService from 'services/authService';

function* login({ payload }) {
  try {
    const { data } = yield authService.login(payload);
    if(data.result.code==="0000"){
      yield put({
        type: ACTION.SET_STATE,
        target: REDUCER.AUTH,
        state: {
          username: data.data.name.substring(0,data.data.name.indexOf('@')).replace('_',' '),
          token: data.data.token,
          entry: '/openline-plan-show',
          tabs: ['.+'],
          views: ['.+'],
          menus: ['.+'],
          exp: Date.now(),
          authenticating: false,
          authenticated: true,
        },
      });
      const newdata = {
        username: data.data.name.substring(0,data.data.name.indexOf('@')).replace('_',' '),
        token: data.data.token,
        entry: '/openline-plan-show',
        tabs: ['.+'],
        views: ['.+'],
        menus: ['.+'],
        exp: Date.now(),
      }
      authService.updateSessionCredentials(newdata);
    }
    else{
      yield put({
        type: ACTION.SET_STATE,
        target: REDUCER.AUTH,
        state: {
          authenticating: false,
          authenticated: false,
        },
      });
    }
  } catch (error) {
    yield put({
      type: ACTION.SET_STATE,
      target: REDUCER.AUTH,
      state: {
        authenticating: false,
        authenticated: false,
      },
    });
  }
}

function* loginCategoryChange({payload}){
  console.log(payload)
  yield put({
    type: ACTION.SET_STATE,
    target: REDUCER.AUTH,
    state: {
      category:payload
    },
  });
}

export default [
  takeLatest(ACTION.LOGIN, login),
  takeLatest(ACTION.LOGIN_CATEGORY_CHANGE,loginCategoryChange)
];
