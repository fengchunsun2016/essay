import {BASIC_LOAD,BASIC_SUCCESS,CHANGE_POST,CHANGE_SUCCESS} from '../../../constants/actionTypes';

/*
 *开始加载基本信息
 * */
export function basicLoadAction() {
  return {
    type:BASIC_LOAD
  }
}

/*
 * 基本信息加载成功
 * */
export function basicSuccess(data) {
  return{
    type:BASIC_SUCCESS,
    data
  }
}



/*
 * 发送修改密码请求
 * */
export function postChange(data) {
  return {
    type:CHANGE_POST,
    data
  }
}

/*
 * 修改密码成功
 * */
export function changeSuccess(data) {
  return {
    type:CHANGE_SUCCESS,
    data
  }
}








