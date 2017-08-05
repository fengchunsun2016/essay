import {get} from '../utils/request';

/*
* 加载交易流水列表
* */
export function getDeal(data){
  return get('/merPay/list',data)
}

/*
* 交易流水详情
* */
export function getDealDetail(data){
  return get('/merPay/Detail',data)
}


export default {
  getDeal,
  getDealDetail
}