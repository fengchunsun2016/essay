
import {call,put,takeLatest} from 'redux-saga/effects';
import {getBasic} from '../services/basic';
import {BASIC_LOAD} from '../constants/actionTypes';
import {basicSuccess} from '../modules/channel/actions';


function * basicLoadSaga() {
  const result = yield call(getBasic);
  const {data} = result;
  yield put(basicSuccess(data));
}
export default [
  takeLatest(BASIC_LOAD,basicLoadSaga)
]

