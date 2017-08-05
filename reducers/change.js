import {CHANGE_SUCCESS} from '../constants/actionTypes';

const changeP = {
  changeData:{},
  changeSuccess:false
}
export default (state = changeP, action = {})=>{
  const {type} = action;
  switch (type) {
    case CHANGE_SUCCESS: {
      const {data} = action;
      return {...state,changeSuccess:true,changeData:data}
    }
    default :
      return state;
  }


}

