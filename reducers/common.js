/**
 * Created by lihejia on 2017/7/25.
 */
import {COMMON_ITEM_LOAD_SUCCESS} from '../constants/actionTypes';

const commonState={
  //支付类型
  payType:[]
}

export default (state=commonState,action={})=>{
    let {type}=action;
    switch (type){
      //payType加载成功
      case COMMON_ITEM_LOAD_SUCCESS:{
          let {data}=action.data;
          return {...state,...data}
      }
      default:
        return state;
    }
}