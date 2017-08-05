import {takeLatest, call, put} from 'redux-saga/effects'
import {CHANGE_POST} from '../constants/actionTypes';
import {changeSuccess} from '../modules/channel/actions'
import {postChangePassword} from '../services/change';

/*
* 修改密码
* */

function * changePasswordSaga(action){
  const {data} = action;
  try{
    let result = yield call(postChangePassword,data);
    let {data} = result;
    yield put(changeSuccess(data))
  }catch(err){
    console.log(err);
  }
}
export default [
  takeLatest(CHANGE_POST,changePasswordSaga)
]