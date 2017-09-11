import { BASIC_SUCCESS } from '../constants/actionTypes';

const basicState = {
  balance: '',
  basicData: {},
  settleData: {},
  rateData: {}

}
export default (state = basicState,action = {})=>{
  const { type } = action;

  switch(type){
    case BASIC_SUCCESS: {
      const {balance, childMerCount} = action.data;
      const {basicInfo, settleInfo, rateInfo} = action.data.data;
      return {...state,balance, basicData:basicInfo, settleData:settleInfo, rateData:rateInfo, childMerCount}
    }
    default :
      return state;
  }
}
