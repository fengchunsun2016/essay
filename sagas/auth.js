/**
 * Created by lihejia on 2017/7/18.
 */
import {put, call, takeLatest} from 'redux-saga/effects';
import Router from 'next/router';
import {PENDING, LOGIN, SIGN_OUT, FULFILLED, LOGIN_SUCCESS, ORIGIN_SUCCESS, LOAD_ORIGIN} from '../constants/actionTypes';
import {doLogin, doLogout, getOrigin} from '../services/auth';
import { setTokenCookie } from '../utils/cookies';

/***
 * 登录实现
 * @param action
 */
export function* login(action) {
  const {loginData} = action;
  // 钩子，如果是登录，带一个loginRequest的标签，可以免token通过request
  loginData.loginRequest = true;
  yield put({type: `${LOGIN}_${PENDING}`})
  try {
    const result = yield call(doLogin, loginData);
    result && result.data && setTokenCookie(result.data.token || '');
    yield put({type:LOGIN_SUCCESS,result})
    const url = Router.pathname === '/' ? '/main' : Router.pathname;
    Router.push(url);
  } catch (e) {
    console.error('error', e)
  }
  yield put({type: `${LOGIN}_${FULFILLED}`})
}

export function* logout() {
  yield call(doLogout);
}

export function* getOriginWithSaga() {
  try {
    let result = yield call(getOrigin);
    if ( result.data ) {
      yield put({type:ORIGIN_SUCCESS, result: result.data});
    }
  } catch (e) {
    console.log(e);
  }
}

export default [
  takeLatest(LOGIN, login),
  takeLatest(SIGN_OUT, logout),
  takeLatest(LOAD_ORIGIN, getOriginWithSaga),
]
