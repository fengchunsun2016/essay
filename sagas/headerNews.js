import {delay} from 'redux-saga'
import {call, put, takeLatest} from 'redux-saga/effects';
import {getHeaderNews} from '../services/headerNews';
import {HEADER_LOAD_NEWS} from '../constants/actionTypes';
import {loadNewsSuccess} from '../modules/layout/actions';


//加载未读消息
function * newLoadSaga() {

  while (true){
    try {
      let result = yield call(getHeaderNews);
      let {data}=result;
      yield put(loadNewsSuccess(data))
    } catch (e) {
      console.error(e);
    }
    yield delay(10000)
  }
}

export default [
  takeLatest(HEADER_LOAD_NEWS, newLoadSaga)
]
