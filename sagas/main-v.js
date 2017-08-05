/**
 * Created by lihejia on 2017/7/21.
 */
import {call,put,takeLatest} from 'redux-saga/effects';
import {getMainV} from '../services/main-v';
import {loadMainVSuccess} from '../modules/main-tv/actions';
import {LOAD_MAINV} from '../constants/actionTypes';
/***
 * 获取可视化数据
 */
function * loadMainVSaga(action) {
   try{

      let queryData=action.data;
      let result=yield call(getMainV,queryData);
      yield put(loadMainVSuccess(result.data));
   }catch(e){
     console.error(e);
   }
}


export default [
  takeLatest(LOAD_MAINV,loadMainVSaga),
]