import { put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga/effects';
import * as ACTIONS from 'constants/actionTypes';
import * as REDUCERS from 'constants/reducerNames';
import JustDemoService from 'services/JustDemoService';

export function* setOpenlinePlanMaintainCategory(payload) {
  try {
    yield put({ type: ACTIONS.START_LOADING });
    yield put({
      type: ACTIONS.SET_STATE,
      target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
      state: { 
          category:payload.data,
      }
    });
    sessionStorage.setItem('openlinePlanMaintainCategory',payload.data);
  } catch (err) {
    yield put({ type: ACTIONS.RAISE_ERROR });
  } finally {
    yield put({ type: ACTIONS.END_LOADING });
  }
}

export function* setOpenlinePlanMaintainLineLine(payload){
  try {
    yield put({ type: ACTIONS.START_LOADING });
    yield put({
      type: ACTIONS.SET_STATE,
      target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
      state: { 
          line_line:payload.data,
      }
    });
  } catch (err) {
    yield put({ type: ACTIONS.RAISE_ERROR });
  } finally {
    yield put({ type: ACTIONS.END_LOADING });
  }
}

export function* setOpenlinePlanMaintainLineModel(payload){
  try {
    yield put({ type: ACTIONS.START_LOADING });
    yield put({
      type: ACTIONS.SET_STATE,
      target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
      state: { 
          line_model:payload.data,
      }
    });
  } catch (err) {
    yield put({ type: ACTIONS.RAISE_ERROR });
  } finally {
    yield put({ type: ACTIONS.END_LOADING });
  }
}

export function* setOpenlinePlanMaintainLineFromdate(payload){
  try {
    yield put({ type: ACTIONS.START_LOADING });
    yield put({
      type: ACTIONS.SET_STATE,
      target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
      state: { 
          line_fromdate:payload.data,
      }
    });
  } catch (err) {
    yield put({ type: ACTIONS.RAISE_ERROR });
  } finally {
    yield put({ type: ACTIONS.END_LOADING });
  }
}

export function* setOpenlinePlanMaintainLineTodate(payload){
  try {
    yield put({ type: ACTIONS.START_LOADING });
    yield put({
      type: ACTIONS.SET_STATE,
      target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
      state: { 
          line_todate:payload.data,
      }
    });
  } catch (err) {
    yield put({ type: ACTIONS.RAISE_ERROR });
  } finally {
    yield put({ type: ACTIONS.END_LOADING });
  }
}

export function* setOpenlinePlanMaintainLineStatus(payload){
  try {
    console.log(payload)
    yield put({ type: ACTIONS.START_LOADING });
    yield put({
      type: ACTIONS.SET_STATE,
      target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
      state: { 
          line_status:payload.data.linestatus,
          line_statusid:payload.data.key,
      }
    });
  } catch (err) {
    yield put({ type: ACTIONS.RAISE_ERROR });
  } finally {
    yield put({ type: ACTIONS.END_LOADING });
  }
}

export function* uploadOpenlinePlanMaintainLine(payload){
  console.log(payload.data)
  //data: {line_line: "F02", line_model: "L45", line_fromdate: "2020-05-12", line_todate: "2020-05-27", line_status: "正常"}

  // try {
  //   console.log(payload)
  //   yield put({ type: ACTIONS.START_LOADING });
  //   yield put({
  //     type: ACTIONS.SET_STATE,
  //     target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
  //     state: { 
  //         line_status:payload.data.linestatus,
  //         line_statusid:payload.data.key,
  //     }
  //   });
  // } catch (err) {
  //   yield put({ type: ACTIONS.RAISE_ERROR });
  // } finally {
  //   yield put({ type: ACTIONS.END_LOADING });
  // }
}

export function* saveOpenlinePlanMaintainLine(payload){
  console.log(payload)
  console.log(payload.row.fromdate.format("YYYY/MM/DD"))
}

export function* deleteOpenlinePlanMaintainLine(payload){
  console.log(payload)
}

export function* setOpenlinePlanMaintainStockMonth(payload){
  try {
    yield put({ type: ACTIONS.START_LOADING });
    yield put({
      type: ACTIONS.SET_STATE,
      target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
      state: { 
          stock_month:payload.data,
      }
    });
  } catch (err) {
    yield put({ type: ACTIONS.RAISE_ERROR });
  } finally {
    yield put({ type: ACTIONS.END_LOADING });
  }
}

export function* setOpenlinePlanMaintainStockFab(payload){
  try {
    yield put({ type: ACTIONS.START_LOADING });
    yield put({
      type: ACTIONS.SET_STATE,
      target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
      state: { 
          stock_fab:payload.data,
      }
    });
  } catch (err) {
    yield put({ type: ACTIONS.RAISE_ERROR });
  } finally {
    yield put({ type: ACTIONS.END_LOADING });
  }
}

export function* setOpenlinePlanMaintainStockModel(payload){
  try {
    yield put({ type: ACTIONS.START_LOADING });
    yield put({
      type: ACTIONS.SET_STATE,
      target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
      state: { 
          stock_model:payload.data,
      }
    });
  } catch (err) {
    yield put({ type: ACTIONS.RAISE_ERROR });
  } finally {
    yield put({ type: ACTIONS.END_LOADING });
  }
}

export function* setOpenlinePlanMaintainStockStock(payload){
  try {
    yield put({ type: ACTIONS.START_LOADING });
    yield put({
      type: ACTIONS.SET_STATE,
      target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
      state: { 
          stock_stock:payload.data,
      }
    });
  } catch (err) {
    yield put({ type: ACTIONS.RAISE_ERROR });
  } finally {
    yield put({ type: ACTIONS.END_LOADING });
  }
}

export function* uploadOpenlinePlanMaintainStock(payload){
  console.log(payload.data)
  //data: {stock_month: "2020-07", stock_fab: "fab2", stock_model: "md", stock_stock: 13}

  // try {
  //   console.log(payload)
  //   yield put({ type: ACTIONS.START_LOADING });
  //   yield put({
  //     type: ACTIONS.SET_STATE,
  //     target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
  //     state: { 
  //         line_status:payload.data.linestatus,
  //         line_statusid:payload.data.key,
  //     }
  //   });
  // } catch (err) {
  //   yield put({ type: ACTIONS.RAISE_ERROR });
  // } finally {
  //   yield put({ type: ACTIONS.END_LOADING });
  // }
}

export function* saveOpenlinePlanMaintainStock(payload){
  console.log(payload)
  // console.log(payload.row.fromdate.format("YYYY/MM/DD"))
}

export function* deleteOpenlinePlanMaintainStock(payload){
  console.log(payload)
}

export function* setOpenlinePlanMaintainCapacityFab(payload){
  try {
    yield put({ type: ACTIONS.START_LOADING });
    yield put({
      type: ACTIONS.SET_STATE,
      target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
      state: { 
          capacity_fab:payload.data,
      }
    });
  } catch (err) {
    yield put({ type: ACTIONS.RAISE_ERROR });
  } finally {
    yield put({ type: ACTIONS.END_LOADING });
  }
}

export function* setOpenlinePlanMaintainCapacityModel(payload){
  try {
    yield put({ type: ACTIONS.START_LOADING });
    yield put({
      type: ACTIONS.SET_STATE,
      target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
      state: { 
          capacity_model:payload.data,
      }
    });
  } catch (err) {
    yield put({ type: ACTIONS.RAISE_ERROR });
  } finally {
    yield put({ type: ACTIONS.END_LOADING });
  }
}

export function* setOpenlinePlanMaintainCapacitySTD(payload){
  try {
    yield put({ type: ACTIONS.START_LOADING });
    yield put({
      type: ACTIONS.SET_STATE,
      target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
      state: { 
          capacity_std:payload.data,
      }
    });
  } catch (err) {
    yield put({ type: ACTIONS.RAISE_ERROR });
  } finally {
    yield put({ type: ACTIONS.END_LOADING });
  }
}

export function* uploadOpenlinePlanMaintainCapacity(payload){
  console.log(payload.data)
  //data: {stock_month: "2020-07", stock_fab: "fab2", stock_model: "md", stock_stock: 13}

  // try {
  //   console.log(payload)
  //   yield put({ type: ACTIONS.START_LOADING });
  //   yield put({
  //     type: ACTIONS.SET_STATE,
  //     target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
  //     state: { 
  //         line_status:payload.data.linestatus,
  //         line_statusid:payload.data.key,
  //     }
  //   });
  // } catch (err) {
  //   yield put({ type: ACTIONS.RAISE_ERROR });
  // } finally {
  //   yield put({ type: ACTIONS.END_LOADING });
  // }
}

export function* saveOpenlinePlanMaintainCapacity(payload){
  console.log(payload)
  // console.log(payload.row.fromdate.format("YYYY/MM/DD"))
}

export function* deleteOpenlinePlanMaintainCapacity(payload){
  console.log(payload)
}

export function* uploadOpenlinePlanMaintainFcst(payload){
  console.log(payload.data.file)
  const { name } = payload.data.file;
  console.log(name)
  // try {
  //   yield put({ type: ACTION.START_LOADING });
  //   const {data} = yield OpenlineBasicUploadService.uploadFile(file);
  //   yield put({
  //     type: ACTIONS.ON_SUCCESS,
  //     payload: `${name} uploaded successfully.`,
  //   });
  // } catch (err) {
  //   console.log(err)
  //   yield put({ type: ACTION.RAISE_ERROR});
  // } finally {
  //   yield put({ type: ACTION.END_LOADING });
  // }
}

export default [
  takeLatest(ACTIONS.SET_OPENLINE_PLAN_MAINTAIN_CATEGORY, setOpenlinePlanMaintainCategory),
  takeLatest(ACTIONS.SET_OPENLINE_PLAN_MAINTAIN_LINE_LINE, setOpenlinePlanMaintainLineLine),
  takeLatest(ACTIONS.SET_OPENLINE_PLAN_MAINTAIN_LINE_MODEL, setOpenlinePlanMaintainLineModel),
  takeLatest(ACTIONS.SET_OPENLINE_PLAN_MAINTAIN_LINE_FROMDATE, setOpenlinePlanMaintainLineFromdate),
  takeLatest(ACTIONS.SET_OPENLINE_PLAN_MAINTAIN_LINE_TODATE, setOpenlinePlanMaintainLineTodate),
  takeLatest(ACTIONS.SET_OPENLINE_PLAN_MAINTAIN_LINE_STATUS, setOpenlinePlanMaintainLineStatus),
  takeLatest(ACTIONS.UPLOAD_OPENLINE_PLAN_MAINTAIN_LINE, uploadOpenlinePlanMaintainLine),
  takeLatest(ACTIONS.SAVE_OPENLINE_PLAN_MAINTAIN_LINE, saveOpenlinePlanMaintainLine),
  takeLatest(ACTIONS.DELETE_OPENLINE_PLAN_MAINTAIN_LINE, deleteOpenlinePlanMaintainLine),
  takeLatest(ACTIONS.SET_OPENLINE_PLAN_MAINTAIN_STOCK_MONTH, setOpenlinePlanMaintainStockMonth),
  takeLatest(ACTIONS.SET_OPENLINE_PLAN_MAINTAIN_STOCK_FAB, setOpenlinePlanMaintainStockFab),
  takeLatest(ACTIONS.SET_OPENLINE_PLAN_MAINTAIN_STOCK_MODEL, setOpenlinePlanMaintainStockModel),
  takeLatest(ACTIONS.SET_OPENLINE_PLAN_MAINTAIN_STOCK_STOCK, setOpenlinePlanMaintainStockStock),
  takeLatest(ACTIONS.UPLOAD_OPENLINE_PLAN_MAINTAIN_STOCK, uploadOpenlinePlanMaintainStock),
  takeLatest(ACTIONS.SAVE_OPENLINE_PLAN_MAINTAIN_STOCK, saveOpenlinePlanMaintainStock),
  takeLatest(ACTIONS.DELETE_OPENLINE_PLAN_MAINTAIN_STOCK, deleteOpenlinePlanMaintainStock),
  takeLatest(ACTIONS.SET_OPENLINE_PLAN_MAINTAIN_CAPACITY_FAB, setOpenlinePlanMaintainCapacityFab),
  takeLatest(ACTIONS.SET_OPENLINE_PLAN_MAINTAIN_CAPACITY_MODEL, setOpenlinePlanMaintainCapacityModel),
  takeLatest(ACTIONS.SET_OPENLINE_PLAN_MAINTAIN_CAPACITY_STD, setOpenlinePlanMaintainCapacitySTD),
  takeLatest(ACTIONS.UPLOAD_OPENLINE_PLAN_MAINTAIN_CAPACITY, uploadOpenlinePlanMaintainCapacity),
  takeLatest(ACTIONS.SAVE_OPENLINE_PLAN_MAINTAIN_CAPACITY, saveOpenlinePlanMaintainCapacity),
  takeLatest(ACTIONS.DELETE_OPENLINE_PLAN_MAINTAIN_CAPACITY, deleteOpenlinePlanMaintainCapacity),
  takeLatest(ACTIONS.UPLOAD_OPENLINE_PLAN_MAINTAIN_FCST, uploadOpenlinePlanMaintainFcst),
];
