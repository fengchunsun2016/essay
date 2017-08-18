/**
 * @file channel/modules/account/actions/index.js
 * @author Mantak <mantak.cn@gmail.com>
 * Date: 2017-08-08
 * Last Modified Date: 2017-08-08
 * Last Modified By: Mantak <mantak.cn@gmail.com>
 */

import {
  ACCOUNT_LOAD,
  ACCOUNT_LOADED,
  ACCOUNT_ROWS_CHANGE,
  ACCOUNT_QUERY_CHANGE,
} from '../../../constants/actionTypes';

// load 数据
export function loadWithQuery(obj){
  return {
    type: ACCOUNT_LOAD,
    value: obj,
  }
}

export function loadedWithQuery(data){
  return {
    type: ACCOUNT_LOADED,
    value: data,
  }
}

export function queryChanged(data){
  return {
    type: ACCOUNT_QUERY_CHANGE,
    value: data,
  }
}

export function pageChanged(data){
  return {
    type: ACCOUNT_ROWS_CHANGE,
    value: data,
  }
}
