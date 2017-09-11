import {POS_LOAD,POS_LOAD_SUCCESS,POS_ROWS_CHANGE,SAVE_POS_SEARCH,POS_DETAIL_LOAD,POS_DETAIL_SUCCESS} from '../../../constants/actionTypes';

/*
* 加载结算流水列表
* */
export function getPosAction(data) {
  return {
    type:POS_LOAD,
    data
  }
}

/*
*结算流水列水加载成功
**/
export function getPosSuccess(data) {
  return {
    type:POS_LOAD_SUCCESS,
    data
  }
}

/*
* 保存查询参数
* */
export function savePosSearch(data) {
  return {
    type:SAVE_POS_SEARCH,
    data
  }
}

/*
* 保存页数或每页行数的改变
* */
export function posChangeRows(data) {
  return {
    type:POS_ROWS_CHANGE,
    data
  }
}

/*
 * 请求详情数据
 * */
export function getPosDetailAction(data) {
  return {
    type:POS_DETAIL_LOAD,
    data
  }
}

/*
 * 请求详情数据成功
 * */
export function getPosDetailSuccess(data) {
  return {
    type:POS_DETAIL_SUCCESS,
    data
  }
}