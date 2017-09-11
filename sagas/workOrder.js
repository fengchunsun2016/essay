import {call, put, takeLatest} from 'redux-saga/effects';
import {getWorkOrder,postHaveRead,submitWorkOrder} from '../services/workOrder';
import {WORK_ORDER_LOAD,POST_HAVE_READ,POST_WORK_ORDER,WORK_ORDER_FULFILLED} from '../constants/actionTypes';
import {loadWorkOrderSuccess,loadMoreSuccess,postHaveReadSuccess,postWorkOrderSuccess} from '../modules/work-order/actions';


//加载工单列表
function * workOrderLoadSaga(action) {
  const {param} = action;


  try {
    if(param.page==1){
      let result = yield call(getWorkOrder, param);
      let {data}=result;
      yield put(loadWorkOrderSuccess(data))
    }else {
      let result = yield call(getWorkOrder, param);
      let {data}=result;
      yield put(loadMoreSuccess(data))
    }

  } catch (e) {
    console.error(e);
  }
  yield put({type:WORK_ORDER_FULFILLED})
}

//未读消息=》已读
function * postHaveReadSaga(action){
  const {param} = action;
  try{
    let result = yield call(postHaveRead,param);
    let {data} = result;
    yield put(postHaveReadSuccess(data))
  }catch(err){
    console.log(err)
  }

}


//提交工单
function  * postWordOrderSaga(action){
  const postData = action.data;
  try{
    let result = yield call(submitWorkOrder,postData);
    let {data} = result;
    yield put(postWorkOrderSuccess(data));
  }catch(err){
    console.log(err);
  }
}


export default [
  takeLatest(WORK_ORDER_LOAD, workOrderLoadSaga),
  takeLatest(POST_HAVE_READ,postHaveReadSaga),
  takeLatest(POST_WORK_ORDER,postWordOrderSaga)


]
