/**
 * Created by person on 2017/7/24.
 */
import {HEADER_NEWS_SUCCESS, SIGN_OUT} from '../../../constants/actionTypes';

//
//加载数据成功
export function loadNewsSuccess(data) {
  return {
    type: HEADER_NEWS_SUCCESS,
    data
  }
}

//退出登录
export function signOut() {
  return { type: SIGN_OUT }
}
