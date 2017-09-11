import {HEADER_NEWS_SUCCESS} from '../constants/actionTypes';

const newsState = {
  orderNews:false,
  messageNews:false
}
export default  (state = newsState,action = {}) => {

  const type = action.type;

  switch(type){
    case HEADER_NEWS_SUCCESS:{
      const { orderNews, messageNews } = action.data;
      return {...state, orderNews, messageNews};
    }
    default:
      return state;
  }
}



