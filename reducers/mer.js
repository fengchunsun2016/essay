/**
 * Created by lihejia on 2017/7/26.
 */
import {
  MER_PENDING,
  MER_LOAD_SUCCESS,
  MER_SAVA_QUERY,
  MER_CHANGE_ROWS,
  MER_FULFILLED,
  RESET_MER_SEARCH
} from '../constants/actionTypes';


const merState = {
  pending: false,
  total: 0,
  rows: 10,
  page: 1,
  //查询内容
  search: {},
  //当前数据
  currentData: {},
  //数据集合
  list: [],
}

export default (state = merState, action = {}) => {
  let {type} = action;
  switch (type) {

    //rows更改
    case MER_CHANGE_ROWS: {
      let {data} = action;
      return {...state, ...data}
    }
    //保存查询数据
    case MER_SAVA_QUERY: {
      let {data} = action;
      return {...state, search: data}
    }
    //加载数据ing
    case MER_PENDING:
      return {...state, pending: true}
    //加载数据成功
    case MER_LOAD_SUCCESS: {

      let {list, total} = action.data.data;
      return {...state, list, total, pending: false}
    }

    case MER_FULFILLED:{
      return {...state,pending: false}
    }
    //
    case RESET_MER_SEARCH:
      return {...state,search:{}}
    default:
      return state;
  }
}
