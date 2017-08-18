import {notification} from 'antd';
import {CHANGE_POST, CHANGE_SUCCESS} from '../constants/actionTypes';


const openNotificationWithIcon = (type) =>{
  notification[type]({
    message:'恭喜!!!',
    description:'您的密码已修改成功！',
  });
};


const changeP = {
  changing: false,
  changeData:{},
  changeSuccess:false
}
export default (state = changeP, action = {})=>{
  const {type} = action;
  switch (type) {
    case CHANGE_POST: {
      return {...state, changing:true}
    }
    case CHANGE_SUCCESS: {
      if(action.data.code==200){
        openNotificationWithIcon('success');
      }

      const {data} = action;
      return {...state,changeSuccess:true, changing:false, changeData:data}
    }
    default :
      return state;
  }
}
