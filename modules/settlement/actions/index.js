import {SETTLEMENT_LOAD, SETTLEMENT_LOAD_SUCCESS, SAVE_SETTLEMENT_SEARCH, SETTLEMENT_CHANGE_ROWS} from '../../../constants/actionTypes';

/*
* 加载结算流水列表
* */
export function getSettlementAction(data) {
  return {
    type:SETTLEMENT_LOAD,
    data
  }
}

/*
*结算流水列水加载成功
**/
export function settlementSuccess(data) {
  return {
    type:SETTLEMENT_LOAD_SUCCESS,
    data
  }
}

/*
* 保存查询参数
* */
export function saveSettlementSearch(data) {
  return {
    type:SAVE_SETTLEMENT_SEARCH,
    data
  }
}

/*
* 保存页数或每页行数的改变
* */
export function settlementChangeRows(data) {
  return {
    type:SETTLEMENT_CHANGE_ROWS,
    data
  }
}
