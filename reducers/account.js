/**
 * @file channel/reducers/account.js
 * @author Mantak <mantak.cn@gmail.com>
 * Date: 2017-08-07
 * Last Modified Date: 2017-08-07
 * Last Modified By: Mantak <mantak.cn@gmail.com>
 */
import {
  ACCOUNT_LOAD,
  ACCOUNT_LOADED,
  ACCOUNT_ROWS_CHANGE,
  ACCOUNT_QUERY_CHANGE,
  ACCOUNT_FULFILLED,
  RESET_ACCOUNT_SEARCH
} from '../constants/actionTypes';


const accountState = {
  loading: false,
  total: 0,
  rows: 10,
  page: 1,
  search: {},
  list: [],
}

export default (state = accountState, action = {}) => {
  const {type} = action;
  switch (type) {
    case ACCOUNT_LOAD: {
      return {...state, loading: true}
    }
    case ACCOUNT_FULFILLED: {
      return {...state, loading: false}
    }
    case ACCOUNT_LOADED: {
      const { value: {list, total} } = action;
      return {...state, list, total}
    }
    case ACCOUNT_ROWS_CHANGE: {
      const { value } = action;
      return {...state, ...value}
    }
    case ACCOUNT_QUERY_CHANGE: {
      const { value } = action;
      return {...state, search: value}
    }
    case RESET_ACCOUNT_SEARCH:
      return {...state,search:{}}
    default:
      return state;
  }
}
