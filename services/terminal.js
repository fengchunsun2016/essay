import {get} from '../utils/request';

/*
* 加载终端信息
* */
export async function getTerminal(data) {
  return await get('/terminal/list',data)
}

/*
 * 加载终端详情信息
 * */
export async function getTerminalDetail(data) {
  return await get('/terminal/detail',data)
}

export default {
  getTerminal,
  getTerminalDetail
}