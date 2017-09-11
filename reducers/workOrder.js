import {notification} from 'antd';
import {WORK_ORDER_LOAD, WORK_ORDER_SUCCESS,LOAD_MORE_SUCCESS,POST_HAVE_READ_SUCCESS,POST_WORK_ORDER_SUCCESS,WORK_ORDER_FULFILLED,WORK_ORDER_PENDING} from '../constants/actionTypes';

const openNotificationWithIcon = (type) =>{
  notification[type]({
    message:'恭喜!!!',
    description:'您的工单已提交成功！',
  });
};

const workOrderState = {
  //是否加载中
  pending: false,
  //数据集合
  list: [],

  //消息总条数
  total:0,
  //查询参数
  search: {
    //1：已解决，2：未解决，3:=1+2=0
    status: 3,
    //第几页数据
    page: 1,
    //每页显示的条数
    rows:10
  },

  //是否显示弹出框
  modalVisible: false,
  //发送已读消息id是否成功
  postHaveRead:0,
  //提交工单是否成功
  submitWorkOrder:false

}
export default (state = workOrderState, action = {})=> {
  const {type} = action;
  switch (type) {
    case WORK_ORDER_PENDING:
      return {...state,pending:true};
    case WORK_ORDER_FULFILLED:
      return {...state,pending:false};

    case WORK_ORDER_LOAD:
      return {...state, pending: true};
    case WORK_ORDER_SUCCESS: {
      const data = action.data;
      const { total, list} = data;
      return {...state, total, list, pending: false}
    }
    case LOAD_MORE_SUCCESS:{
      const data = action.data;
      const { list} = data;
      let newList=[];
      if(state.list.length>0){
        newList=[...state.list,...list];
      }else{
        newList=list;
      }
      return {...state, list:newList, pending: false}
    }
    case POST_HAVE_READ_SUCCESS:{
      const data = action.data;
      return {...state,postHaveRead:data}
    }
    case POST_WORK_ORDER_SUCCESS:{
      if(action.data.code==200){
        openNotificationWithIcon('success');
      }

      const {data} = action;
      return {...state,submitWorkOrder:data}
    }

    default :
      return state;
  }

}


