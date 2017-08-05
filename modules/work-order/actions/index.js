import {WORK_ORDER_LOAD, WORK_ORDER_SUCCESS,LOAD_MORE_SUCCESS,POST_HAVE_READ,POST_HAVE_READ_SUCCESS,POST_WORK_ORDER,POST_WORK_ORDER_SUCCESS} from '../../../constants/actionTypes';

/*
 * 加载工单列表
 * @data 参数（已解决、未解决，，）
 * */
export function loadWorkOrderAction(param) {
  return {
    type: WORK_ORDER_LOAD,
    param
  }
}

/*
 * 加载成功
 * */
export function loadWorkOrderSuccess(data) {
  return {
    type: WORK_ORDER_SUCCESS,
    data
  }
}

/*
* 加载更多成功
* */
export function loadMoreSuccess(data) {
  return {
    type:LOAD_MORE_SUCCESS,
    data
  }
}

/*
* 未读消息=》已读
* */
export function postHaveReadAction(param){
  return {
    type:POST_HAVE_READ,
    param
  }
}

/*
* 未读消息=》已读发送成功
* */
export function postHaveReadSuccess(data){
  return {
    type:POST_HAVE_READ_SUCCESS,
    data
  }
}

/*
* 提交工单
* */
export function postWorkOrderAction(data){
  return {
    type:POST_WORK_ORDER,
    data
  }
}

/*
*提交工单成功
* */
export function postWorkOrderSuccess(data){
  return {
    type:POST_WORK_ORDER_SUCCESS,
    data
  }
}

