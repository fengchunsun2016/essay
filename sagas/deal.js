import {call, put, takeLatest} from 'redux-saga/effects';
import {getDeal, getDealDetail} from '../services/deal';
import {getDealSuccess, getDealDetailSuccess} from '../modules/deal/actions';
import {DEAL_PENGDING, DEAL_FULLFILLED, DEAL_LOAD, LOAD_DEAL_DETAIL} from '../constants/actionTypes';


/*
 * 加载交易流水数据
 * */
function * dealLoadSaga(action){
  const queryData = action.data;

  yield put({type:DEAL_PENGDING});
  try {
    let result = yield call(getDeal, queryData);
    let {data} = result;
    yield put(getDealSuccess(data));
  }catch (err) {
    console.log(err);
  }

  yield put({type:DEAL_FULLFILLED})

}

/*
* 加载交易流水详情
* */
function * dealDetailLoadSaga(action) {
  const param = action.param;
  try{
    let result = yield call(getDealDetail,param);
    let {data} = result;
    yield put(getDealDetailSuccess(data));
  }catch(err){
    console.log(err);
  }
}


export default [
  takeLatest(DEAL_LOAD, dealLoadSaga),
  takeLatest(LOAD_DEAL_DETAIL,dealDetailLoadSaga)
]

