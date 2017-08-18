/**
 * Created by lihejia on 2017/7/22.
 */

import {get, getFile} from '../utils/request';

/**
 * 加载系统公告
 * @param queryData  参数
 * @returns {Promise.<*>}
 */
export async function loadmessageList(queryData) {
  return await get('/announcement/list', queryData);
}

/***
 * 加载详情
 * @param data
 * @returns {Promise.<Object>}
 */
export async function loadMessageDetail(data){
  return await get('/announcement/detail',data)
}

export async function getMessageFile(filePath){
  return await getFile(filePath)
}
