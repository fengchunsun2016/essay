import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import withRedux from './next-with-redux'
import withSaga from './next-with-saga'
import rootReducer,{defaultInitialState} from '../reducers'
import rootSaga from '../sagas'

const sagaMiddleware = createSagaMiddleware()

export function configureStore (initialState = defaultInitialState) {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  )
  store.sagaTasks = sagaMiddleware.run(rootSaga)
  return store
}

export function withReduxSaga (BaseComponent) {
  // 每个BaseComponent都是page，都可能被服务器端渲染，
  // 所以，每个页面都要withRedux(configureStore)
  // 也就是说，每个页面都有可能新建store
  // withRedux返回一个需要一个component作为参数的函数，而执行的结果，就是最终呈现的内容
  return withRedux(configureStore)(withSaga(BaseComponent))
}
