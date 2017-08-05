import {get} from '../utils/request';

/*
* 加载结算流水列表
* */
export function getSettlement(data) {
  return get('/settlement/list',data)
}


export default {
  getSettlement
}
