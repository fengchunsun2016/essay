/**
 * Created by lihejia on 2017/7/22.
 */
import {
  MESSAGE_READ,
  MESSAGE_LOAD_DETAIL,
  MESSAGE_LOAD_DETAIL_SUCCESS,
  MESSAGE_CHANGE_PAGE,
  MESSAGE_SAVE_SEARCH
} from '../../../constants/actionTypes';


/***
 * 搜索数据
 * @param data
 * @returns {{type: string, data: *}}
 */
export function doSearch(queryData) {

  return {
    type: 'MESSAGE_SEARCH',
    queryData
  }
}

export function loading() {
  return {
    type: 'MESSAGE_PENDING'
  }
}

export function loaded() {
  return {
    type: 'MESSAGE_FULFILLED'
  }
}

/**
 * 显示modal
 */
export function showModalAction() {
  return {
    type: 'MESSAGE_SHOW_MODAL'
  }
}


/**
 * 显示modal
 */
export function hideModalAction(data) {
  return {
    type: 'MESSAGE_HIDE_MODAL',
    data
  }
}


/**
 * 搜索数据完成
 */
export function loadMessageSuccess(data) {

  return {
    type: 'MESSAGE_SUCCESS',
    data
  }
}

/***
 * 已读消息(本地状态更改)
 */
export function messageLoclRead(data) {
  return {
    type: MESSAGE_READ,
    data
  }
}

/**
 * 异步处理消息
 */
export function loadMessageDetail(data) {
  return {
    type: MESSAGE_LOAD_DETAIL,
    data
  }
}


/**
 * 异步处理消息
 */
export function loadMessageDetailSuccess(data) {
  return {
    type: MESSAGE_LOAD_DETAIL_SUCCESS,
    payload: data
  }
}
/***
 * 页数发生更改
 * @param data {page,rows}
 * @returns {{type, data: *}}
 */
export function changePage(data) {
  return {
    type: MESSAGE_CHANGE_PAGE,
    data
  }
}
/**
 * 保存搜索内容
 * @param data
 * @returns {{type, data: *}}
 */
export function saveSearch(data) {
  return {
    type:MESSAGE_SAVE_SEARCH,
    data
  }
}
