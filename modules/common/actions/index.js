/**
 * Created by lihejia on 2017/7/25.
 */
import {COMMON_ITEM_LOAD,COMMON_ITEM_LOAD_SUCCESS} from '../../../constants/actionTypes';

//加载payType
export function commonItemLoad() {
  return  {
    type:COMMON_ITEM_LOAD
  };
}

//加载payType成功
export function commonItemLoadSuccess(data) {
  return {
    type:COMMON_ITEM_LOAD_SUCCESS,
    data
  }
}