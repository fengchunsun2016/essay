import {delay} from 'redux-saga'
import {call, put, takeLatest} from 'redux-saga/effects';
import {getHeaderNews} from '../services/headerNews';
import {HEADER_LOAD_NEWS} from '../constants/actionTypes';
import {loadNewsSuccess} from '../modules/layout/actions';


//加载未读消息
function * newLoadSaga() {
  while (true){
    try {
      // 这里是不能获取数据的，无论是哪个方法
      // let result = yield call(getHeaderNews);
      // let {data}=result;
      //  TODO 暂时关闭访问
      //  yield put(loadNewsSuccess(data))
    } catch (e) {
      console.error(e);
    }
    yield delay(10000)
  }
}

export default [
  takeLatest(HEADER_LOAD_NEWS, newLoadSaga)
]
