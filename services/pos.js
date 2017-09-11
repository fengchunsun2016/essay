import {get} from '../utils/request';


/*
* 加载pos信息
* */
export async function getPos(data) {
  return  await get('/pos/list',data)
}


/*
* 加载pos详情
* */
export async function getPosDetail(data) {
  return await get('/pos/detail',data)
}

export default {
  getPos,
  getPosDetail
}
