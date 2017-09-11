/**
 * Created by lihejia on 2017/7/17.
 */

import {combineReducers} from 'redux';
import auth, {authState} from './auth';
import menu from './menu';
import mainV from './main-v';
import message from './message';
import headerNews from './headerNews';
import basic from './basic';
import sum from './sum';
import common from './common';
import workOrder from './workOrder';

import changeP from './change';

import mer from './mer';

import deal from './deal';

import settlement from './settlement';

import account from './account';

import terminal from './terminal';

import pos from './pos';

export const defaultInitialState = {
  auth: authState
}

//组装reducers
const rootReducers = combineReducers({
  auth,
  menu,
  mainV,
  message,
  headerNews,
  basic,
  common,
  sum,
  workOrder,
  changeP,
  mer,
  deal,
  settlement,
  account,
  terminal,
  pos,
})


export  default rootReducers;
