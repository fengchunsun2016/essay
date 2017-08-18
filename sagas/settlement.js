import {takeLatest,call,put} from 'redux-saga/effects';
import {getSettlement} from '../services/settlement';
import {settlementSuccess} from '../modules/settlement/actions';
import {SETTLEMENT_LOAD,SETTLEMENT_PENGDING,SETTLEMENT_FULLFILLED} from '../constants/actionTypes';

/*加载交易流水数据*/
function * getSettlementSaga(action) {
  yield put({type:SETTLEMENT_PENGDING});
  const queryData = action.data;
  try{
    let result = yield call(getSettlement,queryData);
    const {data} = result;
    yield put(settlementSuccess(data));

  }catch(err){
    console.log(err);
  }
  yield put({type:SETTLEMENT_FULLFILLED});
}

export default [
  takeLatest(SETTLEMENT_LOAD,getSettlementSaga)
]

