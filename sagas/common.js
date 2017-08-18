/**
 * Created by lihejia on 2017/7/25.
 */
import {call,put,takeLatest} from 'redux-saga/effects';
import {COMMON_ITEM_LOAD} from '../constants/actionTypes'
import {commonItemLoadSuccess } from '../modules/common/actions';
import {getCommonItem} from '../services/common';

//加载payTypes数据
export function* loadCommonItemSaga() {
  try {
    let {data} =yield call(getCommonItem);
    if (data) {
      yield put(commonItemLoadSuccess(data));
    }
  } catch (e) {
    console.warn(e);
  }
}

export default [
  takeLatest(COMMON_ITEM_LOAD,loadCommonItemSaga)
]
