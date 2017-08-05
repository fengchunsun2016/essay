/**
 * Created by lihejia on 2017/7/21.
 */
import {LOAD_MAINV,LOAD_MAINV_SUCCESS } from '../../../constants/actionTypes';

//加载首页可视化数据
export function loadMainV(data) {
    return {
      type:LOAD_MAINV,
      data
    }
}

//加载成功
export function loadMainVSuccess(data) {
  return {
    type:LOAD_MAINV_SUCCESS,
    data
  }
}