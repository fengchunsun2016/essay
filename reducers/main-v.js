/**
 * Created by lihejia on 2017/7/21.
 */

import {LOAD_MAINV_SUCCESS} from '../constants/actionTypes';

const vState={
  //交易统计信息
  merPayLineChartTitle:{},
  //交易信息列表
  merPayLineChartList:[],
  search:{
    startDate:null,
    endDate:null
  }
}

/**
 * 可视化参数数据
 * @param state
 * @param action
 * @returns {{}}
 */
export default (state=vState,action={})=>{
    const type=action.type;
    switch (type){
      case LOAD_MAINV_SUCCESS:{
          if(!action.data){
            return state;
          }
          let {merPayLineChartTitle,merPayLineChartList}=action.data.data;
         return {...state,merPayLineChartTitle,merPayLineChartList}
      }
      default:
        return state;
    }
}