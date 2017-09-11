/**
 * Created by lihejia on 2017/7/18.
 */
import { all } from 'redux-saga/effects';
import auth from './auth';
import mainV from './main-v';
import message from './message';
// import  headerNews from './headerNews';
import basicInfo from './basic';
import sum from './sum';
import common from './common';
import workOrder from './workOrder';
import change from './change';
import mer from './mer';
import deal from './deal';
import settlement from './settlement';
import account from './account';
import terminal from './terminal';
import pos from './pos';

/**
 * saga统一导出函数
 */
export default function* rootSaga() {
  yield all([
    ...auth,
    ...mainV,
    ...message,
    // ...headerNews,
    ...basicInfo,
    ...sum,
    ...common,
    ...workOrder,
    ...change,
    ...mer,
    ...deal,
    ...settlement,
    ...account,
    ...terminal,
    ...pos,
  ])
}
