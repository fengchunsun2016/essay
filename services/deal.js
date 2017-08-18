import {get} from '../utils/request';

/*
* 加载交易流水列表
* */
export async function getDeal(data){
  return await get('/merPay/list',data)
}

/*
* 交易流水详情
* */
export async function getDealDetail(data){
  return await get('/merPay/detail',data)
}


export default {
  getDeal,
  getDealDetail
}