import {POS_LOAD,POS_LOAD_SUCCESS,POS_ROWS_CHANGE,SAVE_POS_SEARCH,POS_LOADED,POS_DETAIL_SUCCESS,RESET_POS_SEARCH} from '../constants/actionTypes';


let posState = {
  page:1,
  rows:10,
  total:0,
  pending:false,
  list:[],
  search:{},
  amountCount:null,
  merFeeCount:null,
  detailData:{}
}

export default (state=posState, action={})=>{
  const{type} = action;
  switch(type){
    case POS_LOAD:
      return {...state,pending:true}
    case POS_LOADED:
      return {...state,pending:false}
    case POS_LOAD_SUCCESS:{
      if(action.data&&(action.data.merFeeCount||action.data.merFeeCount==0)){
        const {merFeeCount,amountCount,list,total} = action.data;
        return {...state,list,merFeeCount,amountCount,total}
      }
      const {list,total} = action.data;
      return {...state,list,total}
    }
    case POS_ROWS_CHANGE:{
      const {page,rows} = action.data;
      return {...state,page,rows}
    }
    case SAVE_POS_SEARCH:{
      const data = action.data;
      return {...state,search:data}
    }

    case POS_DETAIL_SUCCESS:{
      const {data} = action.data;
      return {...state ,detailData:data}
    }
    case RESET_POS_SEARCH:
      return {...state,search:{}}
    default:
      return state
  }
}

