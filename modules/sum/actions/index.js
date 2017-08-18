/**
 * Created by lihejia on 2017/7/25.
 */

import {
  SUM_LOAD,
  SUM_PENDING,
  SUM_LOAD_SUCCESS,
  SUM_SAVA_QUERY,
  SUM_CHANGE_ROWS
} from '../../../constants/actionTypes';

//开始加载数据
export function sumLoad(data) {
  return {
    type:SUM_LOAD,
    data
  }
}
//数据加载完成
export function sumLoadSuccess(data) {
  return {
    type:SUM_LOAD_SUCCESS,
    data
  }
}

//设置加载中
export function sumPending() {
  return {
    type:SUM_PENDING
  }
}

//加载完成
export function sumLoaded() {
  return {
    type:'SUM_FULFILLED'
  }
}
//保存查询数据
export function saveQuery(data) {
  return {
    type:SUM_SAVA_QUERY,
    data
  }
}

//rows更改
export function rowsAndPageChange(data) {
  return {
    type:SUM_CHANGE_ROWS,
    data
  }
}
