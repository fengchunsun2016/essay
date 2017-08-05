/**
 * Created by lihejia on 2017/7/25.
 */

import {
  MER_LOAD,
  MER_PENDING,
  MER_LOAD_SUCCESS,
  MER_SAVA_QUERY,
  MER_CHANGE_ROWS,
  MER_FULFILLED
} from '../../../constants/actionTypes';

//开始加载数据
export function merLoad(data){
  return {
    type: MER_LOAD,
    data
  }
}
//数据加载完成
export function merLoadSuccess(data){
  return {
    type: MER_LOAD_SUCCESS,
    data
  }
}

//设置加载中
export function merPending(){
  return {
    type: MER_PENDING
  }
}
//加载数据完成
export function merFulfillen(){
    return {
      type:MER_FULFILLED
    }
}
//保存查询数据
export function saveQuery(data){
  return {
    type: MER_SAVA_QUERY,
    data
  }
}

//rows更改
export function rowsAndPageChange(data){
  return {
    type: MER_CHANGE_ROWS,
    data
  }
}
