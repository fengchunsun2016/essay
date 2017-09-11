import {TERMINAL_LOAD,TERMINAL_LOAD_SUCCESS,SAVE_TERMINAL_SEARCH,TERMINAL_ROWS_CHANGE,TERMINAL_DETAIL_LOAD,TERMINAL_DETAIL_SUCCESS} from '../../../constants/actionTypes';

/*
* 终端管理信息下载
* */
export function terminalLoadAction(data) {
  return {
    type:TERMINAL_LOAD,
    data
  }
}

/*
* 终端管理信心下载成功
* */
export function terminalLoadSuccess(data) {
  return {
    type:TERMINAL_LOAD_SUCCESS,
    data
  }
}


/*
* 保存查询参数
* */
export function saveTerminalSearch(data) {
  return {
    type:SAVE_TERMINAL_SEARCH,
    data
  }
}

/*
 *页数或者条数改变时
 * */
export function terminalChangeRows(data) {
  return {
    type:TERMINAL_ROWS_CHANGE,
    data
  }
}


/*
*请求详情数据
* */
export function terminalDetailLoadAction(data) {
  return {
    type:TERMINAL_DETAIL_LOAD,
    data
  }
}

/*
 *请求详情数据成功
 * */
export function terminalDetailLoadSuccess(data) {
  return {
    type:TERMINAL_DETAIL_SUCCESS,
    data
  }
}