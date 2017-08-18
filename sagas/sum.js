/**
 * Created by lihejia on 2017/7/26.
 */
import {call,put,takeLatest} from 'redux-saga/effects';
import {SUM_LOAD} from '../constants/actionTypes';
import {sumPending,sumLoadSuccess,sumLoaded} from '../modules/sum/actions';
import {getSum} from '../services/sum';

//加载数据
export function* sumLoadBySearch (action) {

  let {data}=action;
    //设置加载样式
    yield put(sumPending())
  try{
    let result=yield call(getSum,data);
    yield put(sumLoadSuccess({data:result.data}))
  }catch (e){
    console.log('sumLoadBySearch error',e)
  }
  yield put(sumLoaded())
}

export default [
  takeLatest(SUM_LOAD,sumLoadBySearch)
]
