/**
 * Created by lihejia on 2017/7/22.
 */
import {call, put, takeLatest} from 'redux-saga/effects';
import {loadmessageList, loadMessageDetail} from '../services/message'
import {MESSAGE_LOAD_DETAIL, MESSAGE_SEARCH} from '../constants/actionTypes';
import {loadMessageSuccess, messageLoclRead,loadMessageDetailSuccess,showModalAction,loading,loaded} from '../modules/message/actions';
/***
 * 加载数据
 */
export function * searchMessageSaga(action) {

  //console.log("SearchMessageSaga",action);
  let {queryData} = action;
  //设置加载状态
  yield put(loading())
  try {
    let result = yield call(loadmessageList, queryData);
     //console.log("SearchMessageSaga.result", result);
    let data = result.data;
    yield put(loadMessageSuccess(data));
  } catch (e) {
    console.error(e);
  }
  yield put(loaded())
}

//加载详情
export function * messageLoadDatailSaga(action) {

  let {data} = action;
  //1.修改本地消息状态
  yield put(messageLoclRead(data));
  //2.远程通知
  try {
    //远程加载详情
    let queryData = {
      announcementId: data.id
    }
    let result = yield call(loadMessageDetail, queryData);

    //请求详情成功
    yield put(loadMessageDetailSuccess({data:result.data.data}))

    //显示modal
    yield put(showModalAction())

  } catch (e) {
    console.error('messageLoadDatailSaga error',e);
  }


}

export default [
  //
  takeLatest(MESSAGE_LOAD_DETAIL, messageLoadDatailSaga),
  takeLatest(MESSAGE_SEARCH, searchMessageSaga)
]