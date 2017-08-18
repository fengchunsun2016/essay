import {get, post} from '../utils/request';

/**
 * 加载工单列表数据
 * @param param  参数
 * @returns {Promise.<*>}
 */
export async function getWorkOrder(param) {
  return await get('/feedback/list',param)
}

/*
* 进入详情（未读消息变已读）
* */
export async function postHaveRead(data){
  return await get('/feedback/readFeedback',data)

}



/**
 * 提交新工单
 * @param data  参数
 * @returns {Promise.<*>}
 */
export async function submitWorkOrder(data) {
  return await post('/feedback/commit',data)
}

export default {
  getWorkOrder,
  postHaveRead,
  submitWorkOrder
}


