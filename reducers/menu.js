/**
 * Created by lihejia on 2017/7/21.
 */

import {MENU_SUCCESS} from '../constants/actionTypes';


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
    case MENU_SUCCESS: {
      let {list}=action.result?action.result:[];
      let sortData=list.sort((a,b)=>a.sort-b.sort)
      return {...state, menus: sortData}
    }
    default:
      return state;
  }
}

