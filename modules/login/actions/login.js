/**
 * Created by lihejia on 2017/7/17.
 */

import {LOGIN} from '../../../constants/actionTypes';


/**
 * 登录action
 * @param data
 */
export const doLogin = (loginData) => {
  return {
    type: LOGIN,
    loginData
  }
}

export default {doLogin}

