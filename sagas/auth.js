/**
 * Created by lihejia on 2017/7/18.
 */
import {put, call,takeLatest} from 'redux-saga/effects';
import {PENDING, LOGIN, FULFILLED, TOKEN_AUTH, LOGIN_SUCCESS,MENU_SUCCESS,LOAD_MENUS} from '../constants/actionTypes';
import {doLogin,getMenus} from '../services/auth';

import Router from 'next/router';
import { setTokenCookie, getToken } from '../utils/cookies';

/***
 * 登录实现
 * @param action
 */
export function* login(action) {
  let {loginData} = action;
  yield put({type: `${LOGIN}_${PENDING}`})
  try {
    let result = yield call(doLogin, loginData);
    setTokenCookie(result.data.token);
    yield put({type:LOGIN_SUCCESS,result})
    const url = Router.pathname === '/' ? '/main' : Router.pathname;
    Router.push(url);
  } catch (e) {
    console.error('error', e)
  }
  yield put({type: `${LOGIN}_${FULFILLED}`})
}

export function* getMenusWithSaga() {
  // 这里是可以获取数据的
  let result = yield call(getMenus);
  if (result.data.tokenValid) {
    // 如果登录验证合格，更新state里的token
    // 因为服务器端未返回token，所以这里的合格的token，就是发起请求时带的token，即getToken()
    yield put({type:TOKEN_AUTH, result: getToken()})
  } else {
    // 如果登录过期，更新state里的token为null
    yield put({type:TOKEN_AUTH, result: null})
  }
  yield put({type:MENU_SUCCESS,result:result.data})
}

export default [
  takeLatest(LOGIN,login),
  takeLatest(LOAD_MENUS,getMenusWithSaga)
]
