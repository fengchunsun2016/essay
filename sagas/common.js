/**
 * Created by lihejia on 2017/7/25.
 */
import {call,put,takeLatest} from 'redux-saga/effects';
import {COMMON_ITEM_LOAD} from '../constants/actionTypes'
import {commonItemLoadSuccess } from '../modules/common/actions';
import {getCommonItem} from '../services/common';

//加载payTypes数据
export function* loadCommonItemSaga() {
  try{
    // 获取需要的数据，
    // TODO 判断返回的数据，如果是登录未通过，则要做出处理，来让withauth获得
    // tokenCookie为false
    let {data} =yield call(getCommonItem);
    yield put(commonItemLoadSuccess(data));
  }catch (e){
    console.warn(e);
  }

}

export default [
  takeLatest(COMMON_ITEM_LOAD,loadCommonItemSaga)
]
