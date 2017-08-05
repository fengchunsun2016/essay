/**
 * Created by lihejia on 2017/7/26.
 */
import {call,put,takeLatest} from 'redux-saga/effects';
import {MER_LOAD} from '../constants/actionTypes';
import {merPending,merLoadSuccess,merFulfillen} from '../modules/merchant/actions';
import {getMer} from '../services/mer';

//加载数据
export function* merLoadBySearch (action) {

  let {data}=action;
    //设置加载样式
    yield put(merPending())
  try{
    let result=yield call(getMer,data);
    yield put(merLoadSuccess({data:result.data}))
  }catch (e){
    console.log('merLoadBySearch error',e)
  }
  yield put(merFulfillen());
}

export default [
  takeLatest(MER_LOAD,merLoadBySearch)
]