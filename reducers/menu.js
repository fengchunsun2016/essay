/**
 * Created by lihejia on 2017/7/21.
 */

import {ORIGIN_SUCCESS} from '../constants/actionTypes';


const menuState = {
  menus: []
}

/***
 * Menu state
 * @param state
 * @param action
 * @returns {{menus: Array}}
 */
export  default  (state = menuState, action = {}) => {
  const type = action.type;

  switch (type) {
    case ORIGIN_SUCCESS: {
      const { menuList } = action.result;
      let sortData;
      if(menuList){
        sortData = menuList.sort((a,b) => a.sort - b.sort);
      }
      return {...state, menus: sortData}
    }
    default:
      return state;
  }
}

