
import {call,put,takeLatest} from 'redux-saga/effects';
import {getBasic} from '../services/basic';
import {BASIC_LOAD} from '../constants/actionTypes';
import {basicSuccess} from '../modules/channel/actions';


function * basicLoadSaga() {
  try{
    const result = yield call(getBasic);
    const {data} = result;
    yield put(basicSuccess(data));
  }catch(err){
    console.log(err)
  }

}
export default [
  takeLatest(BASIC_LOAD,basicLoadSaga)
]

