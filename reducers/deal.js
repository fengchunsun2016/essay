import {DEAL_PENGDING, DEAL_FULLFILLED, DEAL_LOAD, DEAL_LOAD_SUCCESS,SAVE_DEAL_SEARCH,DEAL_CHANGE_ROWS,LOAD_DEAL_DETAIL_SUCCESS} from '../constants/actionTypes';


const dealState = {
  pending: false,
  total: 0,
  rows: 10,
  page: 1,
  //查询内容
  search: {},
  //当前数据
  currentData: {},
  //数据集合
  list: [],
  detailData:{},
}

export default (state = dealState,action = {})=>{
  const type = action.type;
  switch(type){
    case DEAL_PENGDING:
      return {...state,pending:true};
    case DEAL_FULLFILLED:
      return {...state,pending:false};
    case SAVE_DEAL_SEARCH :{
      const data = action.data;

      return {...state,search:data}
    }
    case DEAL_CHANGE_ROWS:{
      const {page,rows} = action.data;
      console.log(action.data);
      return {...state,page,rows}
    }

    case DEAL_LOAD:
      return {...state,pending:true};
    case DEAL_LOAD_SUCCESS:{
      const currentData = action.data;
      const {list,total} = action.data;

      return {...state,pending:false,list,currentData,total};
    }

    case LOAD_DEAL_DETAIL_SUCCESS:{
      const {data} = action.data;
      return {...state,detailData:data}
    }

    default :
      return state;

  }
}

