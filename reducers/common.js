/**
 * Created by lihejia on 2017/7/25.
 */
import { COMMON_ITEM_LOAD_SUCCESS } from '../constants/actionTypes';

const commonState = {
  //支付类型
  payTypeList : [],
  amountTypeList : []
}

export default (state = commonState, action = {})=> {
  let { type }=action;
  switch (type) {
    //payType加载成功
    case COMMON_ITEM_LOAD_SUCCESS: {
      let { data }=action.data;
      return {
        ...state, ...data,
        payTypeList : data.payType,
        amountTypeListShow : data.amountType
      }
    }
    case 'TRANS_CHANGE': {
      let param = action.data;
      switch (param) {
        case 'all': {
          let amountTypeListShow = state.amountType;
          return { ...state, amountTypeListShow };
        }
        case '01':{
          let amountTypeListShow = state.amountType.filter(function (item) {
           return item.id == '01' || item.id == '10'
           });
           return { ...state, amountTypeListShow };
        }
        case '02': {
          let amountTypeListShow = state.amountType.filter(function (item) {
            return item.id == '02' || item.id == '11' || item.id == '06' || item.id == '15'
          });
          return { ...state, amountTypeListShow };
        }
        case '03': {
          let amountTypeListShow = state.amountType.filter(function (item) {
            return item.id == '03' || item.id == '12'
          });
          return { ...state, amountTypeListShow };
        }
        case '04': {
          let amountTypeListShow = state.amountType.filter(function (item) {
            return item.id == '04' || item.id == '13'
          });
          return { ...state, amountTypeListShow};
        }
        case '05': {
          let amountTypeListShow = state.amountType.filter(function (item) {
            return item.id == '05' || item.id == '14'
          });
          return { ...state, amountTypeListShow};
        }
        case '06': {
          let amountTypeListShow = state.amountType.filter(function (item) {
            return item.id == '07' || item.id == '16'
          });
          return { ...state, amountTypeListShow};
        }
        default:
          return state;
      }
    }
    default:
      return state;
  }
}
