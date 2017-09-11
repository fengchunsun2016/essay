/**
 * Created by lihejia on 2017/7/26.
 */
import {
  SUM_PENDING,
  SUM_LOAD_SUCCESS,
  SUM_SAVA_QUERY,
  SUM_CHANGE_ROWS,
  RESET_SUM_SEARCH
} from '../constants/actionTypes';


const sumState = {
  pending: false,
  total: 0,
  rows: 10,
  page: 1,
  //分润金额
  titleFeeSum: 0,
  //交易总笔数
  titlePayCount: 0,
  //交易总金额
  titlePaySum: 0,
  //查询内容
  search: {
    requestType:'month'
  },
  startMonth:null,
  endMonth:null,
  startDay:null,
  endDay:null,
  //当前数据
  currentData: {},
  //数据集合
  list: [],
}

export default (state = sumState, action = {}) => {
  let {type} = action;
  switch (type) {
    //requestType更改
    case 'CHANGE_TYPE':{
      const {data} = action;
      return {...state,search:{requestType:data}}
    }

    //rows更改
    case SUM_CHANGE_ROWS: {
      let {data} = action;
      return {...state, ...data}
    }
    //保存查询数据
    case SUM_SAVA_QUERY: {
      let {data} = action;
      return {...state, search: data}
    }
    //加载数据ing
    case SUM_PENDING:
      return {...state, pending: true}
    case 'SUM_FULFILLED':
      return {...state, pending: false}
    //加载数据成功
    case SUM_LOAD_SUCCESS: {
      if(action.data&&action.data.data&&(action.data.data.titleFeeSum||action.data.data.titleFeeSum==0)){
        let {list, total, titleFeeSum, titlePayCount, titlePaySum} = action.data.data;
        return {...state, list, total, titleFeeSum, titlePaySum, titlePayCount, pending: false}
      }
      let {list, total} = action.data.data;
      return {...state, list, total, pending: false}
    }
    //重置查询条件
    case RESET_SUM_SEARCH:
      return {...state,search:{requestType:'month'}, startMonth:null, endMonth:null, startDay:null, endDay:null,}

    default:
      return state;
  }
}
