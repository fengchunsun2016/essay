import {call,put,takeLatest} from 'redux-saga/effects';
import {POS_LOADED,POS_LOAD,POS_DETAIL_LOAD} from '../constants/actionTypes';
import {getPos,getPosDetail} from '../services/pos';
import {getPosSuccess,getPosDetailSuccess} from '../modules/pos/actions';

/*
* 加载POS交易查询列表
* */
export function * getPosWithSaga(action) {
  const {data} = action;

  try{
    const result = yield call(getPos,data);
    yield put(getPosSuccess(result.data))
  }catch(err){
    console.log(err)
  }
  yield put({type:POS_LOADED})
}

/*
* 加载POS交易查询详情
* */
export function * getPosDetailWithSaga(action) {
  const {data} = action;
  try{
    let result = yield call(getPosDetail,data);
    yield put(getPosDetailSuccess(result.data));
  }catch(err){
    console.log(err)
  }
}


export default [
  takeLatest(POS_LOAD,getPosWithSaga),
  takeLatest(POS_DETAIL_LOAD,getPosDetailWithSaga)
]
