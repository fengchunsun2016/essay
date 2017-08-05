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

export const defaultInitialState = {
  auth: authState
}

//组装reducers
const rootRecuders = combineReducers({
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

})


export  default rootRecuders;