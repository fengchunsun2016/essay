import {call, put, takeLatest} from 'redux-saga/effects';
import {getDeal, getDealDetail} from '../services/deal';
import {getDealSuccess, getDealDetailSuccess} from '../modules/deal/actions';
import {DEAL_PENGDING, DEAL_FULLFILLED, DEAL_LOAD, LOAD_DEAL_DETAIL} from '../constants/actionTypes';


/*
 * 加载交易流水数据
 * */
function * dealLoadSaga(action){
  const {data} = action;
  put({type:DEAL_PENGDING});
  try {
    let result = yield call(getDeal, data);
    // console.log(result,'+++++++++++++++++++++++++++');
    let {data} = result;
    yield put(getDealSuccess(data));
  }catch (err) {
    console.log(err);
  }

  put({type:DEAL_FULLFILLED})

}

/*
* 加载交易流水详情
* */
function * dealDetailLoadSaga(action) {
  const param = action;
  try{
    let result = yield call(getDealDetail,param);
    let {data} = result;
    console.log(data,'详情详情详情详情详情')
    yield put(getDealDetailSuccess(data));
  }catch(err){
    console.log(err);
  }
}


export default [
  takeLatest(DEAL_LOAD, dealLoadSaga),
  takeLatest(LOAD_DEAL_DETAIL,dealDetailLoadSaga)
]

