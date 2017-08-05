/**
 * Created by lihejia on 2017/7/26.
 */
import {get} from '../utils/request';

//加载统计数据
export async function getSum(data){
  return await get('/merPaySum/list',data)
}

export default {
  getSum
}