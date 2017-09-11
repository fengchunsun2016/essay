import {
  TERMINAL_LOAD,
  TERMINAL_LOADED,
  TERMINAL_ROWS_CHANGE,
  SAVE_TERMINAL_SEARCH,
  TERMINAL_LOAD_SUCCESS,
  TERMINAL_DETAIL_SUCCESS,
  RESET_TERMINAL_SEARCH
} from '../constants/actionTypes';

const terminalState = {
  page:1,
  rows:10,
  pending:false,
  list:[],
  total:0,
  search:{},
  detailData:{}
}

export default (state = terminalState,action = {})=> {
  const {type} = action;
  switch(type){
    case TERMINAL_LOAD:
      return {...state,pending:true};
    case TERMINAL_LOADED:
      return {...state,pending:false};

    case TERMINAL_LOAD_SUCCESS:{
      const {list,total} = action.data;
      return {...state,list,total,pending:false}
    }
    case SAVE_TERMINAL_SEARCH:{
      const {data} = action;
      return {...state,search:data}
    }
    case TERMINAL_ROWS_CHANGE:{
      const {page,rows} = action.data;
      return {...state,page,rows}
    }

    case TERMINAL_DETAIL_SUCCESS:{
      const {data} = action.data;
      return {...state,detailData:data}
    }
    //
    case RESET_TERMINAL_SEARCH:
      return {...state,search:{}}
    default:
      return state;
  }
}

