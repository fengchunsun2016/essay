/**
 * Created by lihejia on 2017/7/25.
 */

import {get } from '../utils/request';



//获取支付种类列表

export async function getCommonItem() {
  return await get('/common/items')
}


export default {
  getCommonItem
}
