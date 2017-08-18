// import {delay} from 'redux-saga'
// import {fork, take, cancel, call, put, takeLatest} from 'redux-saga/effects';
// import {getHeaderNews} from '../services/headerNews';
// import {SIGN_OUT} from '../constants/actionTypes';
// import {loadNewsSuccess} from '../modules/layout/actions';
//
// //加载未读消息
// function * loadTaskSaga(props) {
//   while (true){
//     try {
//       const result = yield call(getHeaderNews);
//       const {data} = result;
//       if (data) {
//         yield put(loadNewsSuccess(data))
//       }
//     } catch (e) {
//       console.error(e);
//     }
//     yield delay(10000)
//   }
// }
//
// function* newLoadSaga(action) {
//   const loadTask = yield fork(loadTaskSaga)
//   if (action.type === SIGN_OUT) {
//     yield cancel(loadTask)
//   }
// }
//
// export default [
//   // takeLatest(SIGN_OUT, newLoadSaga),
//   // takeLatest(HEADER_LOAD_NEWS, newLoadSaga)
// ]
