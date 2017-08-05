import {get, post} from '../utils/request';

/**
 * 加载工单列表数据
 * @param param  参数
 * @returns {Promise.<*>}
 */
export function getWorkOrder(param) {
  return get('/worksheet/list',param)
}

/*
* 进入详情（未读消息变已读）
* */
export function postHaveRead(data){
  return post('/haveReadWorkOrder',data)

}



/**
 * 提交新工单
 * @param data  参数
 * @returns {Promise.<*>}
 */
export function submitWorkOrder(data) {
  return post('/worksheet/submit',data)
}

export default {
  getWorkOrder,
  postHaveRead,
  submitWorkOrder
}


