/**
 * Created by lihejia on 2017/7/17.
 */
import { LOGIN_SUCCESS, TOKEN_AUTH, LOGIN, PENDING, FULFILLED} from '../constants/actionTypes';
import config from '../config/config.json';

/**
 * 系统权限
 * @type {{token: null}}
 */
export const authState = {
  token: null,  //用户登陆token
  user: null,    //当前登陆用户信息
  pending: false,   //是否加载
}


// REDUCERS
const authReducer = (state = authState, action) => {
  switch (action.type) {
    //开始登录
    case `${LOGIN}_${PENDING}`: {
      return {...state, pending: true}
    }
    //请求结束(失败或者成功)
    case `${LOGIN}_${FULFILLED}`:
      return {...state, pending: false}
    case LOGIN_SUCCESS: {
      let {data} = action.result;
      return {
        ...state,
        token: data.token,
        pending: false,
        user: {username: data.userName}
      }
    }
    case TOKEN_AUTH: {
      return {
        ...state,
        token: action.result,
      }
    }
    default:
      return state
  }
}
export  default  authReducer;
