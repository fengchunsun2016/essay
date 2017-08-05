/**
 * Created by person on 2017/7/24.
 */
import {HEADER_LOAD_NEWS, HEADER_NEWS_SUCCESS} from '../../../constants/actionTypes';

//
export function loadNewsAction() {
  return {
    type: HEADER_LOAD_NEWS
  }
}
//加载数据成功
export function loadNewsSuccess(data) {
  return {
    type: HEADER_NEWS_SUCCESS,
    data
  }
}


