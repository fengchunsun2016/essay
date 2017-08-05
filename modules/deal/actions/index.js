import {
  DEAL_LOAD,
  DEAL_LOAD_SUCCESS,
  SAVE_DEAL_SEARCH,
  DEAL_CHANGE_ROWS,
  LOAD_DEAL_DETAIL,
  LOAD_DEAL_DETAIL_SUCCESS,
} from '../../../constants/actionTypes';


/*
* 加载交易流水数据
* */
export function getDealAction(data){
  return {
    type:DEAL_LOAD,
    data
  }
}

/*
* 加载数据成功
* */
export function getDealSuccess(data){
  return {
    type:DEAL_LOAD_SUCCESS,
    data
  }
}

/*
* 保存请求参数
* */
export function saveDealSearch(data){
  return {
    type: SAVE_DEAL_SEARCH,
    data
  }
}

/*
* 页数或者条数改变时
* */
export function rowsAndPageChange(data) {
  return {
    type:DEAL_CHANGE_ROWS,
    data
  }
}


/*
* 加载详情
* */
export function getDealDetailAction(param) {
  return {
    type:LOAD_DEAL_DETAIL,
    param
  }
}

/*
* 记载详情成功
* */
export function getDealDetailSuccess(data) {
  return {
    type:LOAD_DEAL_DETAIL_SUCCESS,
    data
  }
}

