/**
 * Created by lihejia on 2017/7/21.
 * 首页可视化窗口
 */
import {get} from '../utils/request';

/**
 * 获取首页可视化数据
 */
export async function getMainV(data) {
  return  await  get('/merchant/home', data)
}

export default {
  getMainV
}