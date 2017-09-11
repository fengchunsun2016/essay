import {DEAL_PENGDING, DEAL_FULLFILLED, DEAL_LOAD_SUCCESS,SAVE_DEAL_SEARCH,DEAL_CHANGE_ROWS,LOAD_DEAL_DETAIL_SUCCESS,RESET_DEAL_SEARCH} from '../constants/actionTypes';


const dealState = {
  pending: false,
  total: 0,
  rows: 10,
  page: 1,
  //查询内容
  search: {
    startDate:null,
    endDate:null
  },
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
      return {...state,page,rows}
    }
    case RESET_DEAL_SEARCH:
      return {...state,search:{}}

    case DEAL_LOAD_SUCCESS:{
      if(action.data&&(action.data.splitFeeSum||action.data.splitFeeSum==0)){
        let currentData = action.data;
        let {list,total} = action.data;
        return {...state,pending:false,list,currentData,total};
      }

      let {list,total} = action.data;
      return {...state,pending:false,list,total};
    }

    case LOAD_DEAL_DETAIL_SUCCESS:{
      const {data} = action.data;
      return {...state,detailData:data}
    }

    default :
      return state;

  }
}

