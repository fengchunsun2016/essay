import {SETTLEMENT_FULLFILLED,SETTLEMENT_PENGDING,SETTLEMENT_LOAD_SUCCESS,SETTLEMENT_CHANGE_ROWS,SAVE_SETTLEMENT_SEARCH,RESET_SETTLEMENT_SEARCH} from '../constants/actionTypes';


const settlementState = {
  pending:false,
  total:0,
  page:1,
  rows:10,
  search:{},
  currentData:{},
  list:[]
}
export default (state = settlementState, action = {})=>{
  const {type} = action;
  switch(type){
    case SETTLEMENT_PENGDING:
      return {...state,pending:true};
    case SETTLEMENT_FULLFILLED:
      return {...state,pending:false};
    case SETTLEMENT_LOAD_SUCCESS:{
      if(action.data&&(action.data.amountTitle||action.data.amountTitle==0)){
        const {data} = action;
        const {list,total} = data;
        return {...state,currentData:data,list,total}
      }
      const {data} = action;
      const {list,total} = data;
      return {...state,list,total}
    }
    case SAVE_SETTLEMENT_SEARCH:{
      const {data} = action;
      return {...state,search:data}
    }
    case SETTLEMENT_CHANGE_ROWS:{
      const {page,rows} = action.data;
      return {...state,page,rows}
    }
    //
    case RESET_SETTLEMENT_SEARCH:
      return{...state,search:{}}

    default :
      return state;
  }
}




