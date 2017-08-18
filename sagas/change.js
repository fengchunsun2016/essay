import {takeLatest, call, put} from 'redux-saga/effects'
import {CHANGE_POST} from '../constants/actionTypes';
import {changeSuccess} from '../modules/channel/actions'
import {postChangePassword} from '../services/change';
import {setTokenCookie} from '../utils/cookies';

/*
* 修改密码
* */

function * changePasswordSaga(action){
  try {
    const value = action.data;
    const result = yield call(postChangePassword, value);
    const backData = result.data;
    if ( backData.code === 200 ) {
      yield put(changeSuccess(backData))
      yield put({ type: 'RESET_TOKEN', data: backData.token});
      yield setTokenCookie(backData.token);
      window.history.back()
    }
  }catch(err){
    console.log(err);
  }
}
export default [
  takeLatest(CHANGE_POST,changePasswordSaga)
]
