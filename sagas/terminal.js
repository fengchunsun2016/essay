import {call,put,takeLatest} from 'redux-saga/effects';
import {terminalLoadSuccess,terminalDetailLoadSuccess} from '../modules/terminal/actions';
import {TERMINAL_LOADED,TERMINAL_LOAD,TERMINAL_DETAIL_LOAD} from '../constants/actionTypes';
import {getTerminal,getTerminalDetail} from '../services/terminal';

/*
* 获取终端管理信息
* */
function * terminalWithSaga(action) {
  const queryData = action.data;
  try{
    let result = yield call(getTerminal,queryData);
    yield put(terminalLoadSuccess(result.data))
  }catch(err){
    console.log(err)
  }
  yield put({type:TERMINAL_LOADED})
}

/*
* 获取终端详情信息
* */
function * terminalDetailWithSaga(action) {
  const queryId =action.data;
  try{
    let result = yield call(getTerminalDetail,queryId);
    yield put(terminalDetailLoadSuccess(result.data))
  }catch(err){
    console.log(err);
  }
}

export default [
  takeLatest(TERMINAL_LOAD, terminalWithSaga),
  takeLatest(TERMINAL_DETAIL_LOAD,terminalDetailWithSaga)
]