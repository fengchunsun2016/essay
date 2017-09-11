/**
 * Created by lihejia on 2017/7/17.
 */
import { LOGIN_SUCCESS, LOGIN, FULFILLED, ORIGIN_SUCCESS, RESET_TOKEN, SIGN_OUT} from '../constants/actionTypes';
import { removeTokenCookie } from '../utils/cookies';

/**
 * 系统权限
 * @type {{token: null}}
 */
export const authState = {
  token: null,  //用户登陆token
  user: {},    //当前登陆用户信息
  pending: false,   //是否加载
  loginFailed:false,
  loginSuccess:false,
}


// REDUCERS
const authReducer = (state = authState, action) => {
  switch (action.type) {
      //开始登录
    case LOGIN: {
      return {...state, pending: true}
    }
      //请求结束(失败或者成功)
    case `${LOGIN}_${FULFILLED}`:
      return {...state, pending: false}
    case LOGIN_SUCCESS: {
      let {data} = action.result;

      if(data.code!=200){
        return {...state,loginFailed:true,pending:false}
      }
      return {
        ...state,
        // token: data.token,
        pending: false,
        // user: {username: data.userName}
        loginSuccess:true
      }
    }
    case 'CHANGE_LOGIN_STATUS':
      return {...state,loginSuccess:false}
    case ORIGIN_SUCCESS: {
      const data = action.result;
      return {
        ...state,
        token: data.token,
        user: data.user,
      }
    }
    case RESET_TOKEN:{
      const token = action.data;
      return {...state, token}
    }
    case SIGN_OUT:{
      // 清除token
      removeTokenCookie();
      // 更新state
      return {...state, token: null, user: {}}
    }
    default:
      return state
  }
}
export  default  authReducer;
