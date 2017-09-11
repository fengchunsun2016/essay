/**
 * Created by lihejia on 2017/7/22.
 */
import {
  MESSAGE_READ,
  MESSAGE_LOAD_DETAIL_SUCCESS,
  MESSAGE_CHANGE_PAGE,
  MESSAGE_SAVE_SEARCH
} from '../constants/actionTypes';

const messageState = {
  //是否加载中
  pending: false,
  //数据集合
  list: [],
  //当前
  currentData: {},
  //统计条数
  total: 0,
  //todo 暂时没有用到 搜索内容
  search: {
    title: ''
  },
  page: 1,
  rows: 10,
  //是否显示弹出框
  modalVisible: false,
}

export default (state = messageState, action = {}) => {

  const type = action.type;
  switch (type) {
    case MESSAGE_SAVE_SEARCH:{
      let {data}=action;
      return {...state,search:data}
    }
    case 'MESSAGE_PENDING':
      return {...state, pending: true}
    case 'MESSAGE_FULFILLED':
      return {...state, pending: false}
    //加载list成功
    case 'MESSAGE_SUCCESS': {
      let {list, total} = action.data;
      return {...state, total, list, pending: false}
    }
    //加载详情成功
    case MESSAGE_LOAD_DETAIL_SUCCESS: {
      let {data} = action.payload;
      return {...state, currentData: data}
    }
    //显示modal
    case 'MESSAGE_SHOW_MODAL': {

      let {data} = action;
      return {...state, modalVisible: true, data}
    }
    //显示modal
    case 'MESSAGE_HIDE_MODAL': {
      return {...state, modalVisible: false}
    }
    //消息已读状态设置
    case MESSAGE_READ: {

      let {data} = action;

      let list = messageRead(state.list, data);

      return {...state, list}
    }
    //页数更改
    case MESSAGE_CHANGE_PAGE: {
      let {page, rows} = action.data;
      return {...state, page, rows}
    }
    default:
      return state;
  }
}

//消息处理
function messageRead(list, data) {

  return list.map((item) => {
    if (item.id === data.id) {
      item.haveRead = 1;
    }
    return item;
  })
}