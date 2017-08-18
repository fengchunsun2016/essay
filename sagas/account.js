/**
 * @file channel/sagas/account.js
 * @author Mantak <mantak.cn@gmail.com>
 * Date: 2017-08-08
 * Last Modified Date: 2017-08-08
 * Last Modified By: Mantak <mantak.cn@gmail.com>
 */
import { call, put, takeLatest } from 'redux-saga/effects';
import { ACCOUNT_LOAD,ACCOUNT_FULFILLED } from '../constants/actionTypes';
import { loadedWithQuery } from '../modules/account/actions';
import { getAccountData } from '../services/account';

export function* accountLoadBySearch (action) {
  const { value } = action;
  try {
    const result = yield call(getAccountData, value);
    yield put(loadedWithQuery(result.data));
  } catch (e) {
    console.log('accountPage load error', e);
  }
  yield put({type:ACCOUNT_FULFILLED})
}

export default [
  takeLatest(ACCOUNT_LOAD, accountLoadBySearch)
]
