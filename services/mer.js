/**
 * Created by lihejia on 2017/7/26.
 */
import {get} from '../utils/request';

/**
 * 加载数据
 * @param Querydata  查询数据方法
 * @returns {Promise.<void>}
 */
export async function getMer(Querydata){
  return await get('/merManage/list',Querydata)
}

export default {
  getMer
}