import React from 'react';
import { Provider, connect } from 'react-redux';

const DEFAULT_DEBUG = false;
const DEFAULT_KEY = '__NEXT_REDUX_STORE__';
const isBrowser = typeof window !== 'undefined';
const skipMerge = ['initialState', 'initialProps', 'isServer', 'store'];

function initStore(makeStore, initialState, context, config) {
  const { req, query } = context;
  const { storeKey } = config;
  const isServer = !!req && !isBrowser;
  var options = Object.assign({}, config, { isServer, req, query, });
  // Always make a new store if server
  // TODO makeStore只有一个参数啊
  if (isServer) {
    if (!req._store) {
      req._store = makeStore(initialState, options);
    }
    return req._store;
  }
  if (!isBrowser) return null;
  // Memoize store if client
  if (!window[storeKey]) {
    window[storeKey] = makeStore(initialState, options);
  }
  return window[storeKey];
}


// 调用的时候，是下面的形式
// withRedux(configureStore)(withSaga(BaseComponent))
// 接受configureStore作为参数，返回一个函数 function(Cmp);
// 而这个返回的函数接受第二行的withSaga(BaseComponent)作为参数
// 执行结果为一个具有getInitialProps的组件WrappedCmp(props)
// 在调用该函数(第二行)的时候，返回的就是一个具有getInitialProps的react compont
export default function(createStore) {
  var config = {storeKey: DEFAULT_KEY, debug: DEFAULT_DEBUG};
  return function(Cmp) {
    // Since provide should always be after connect we connect here
    // apply 第二个参数，是一个为数组的参数集合，空数组，即没有传参数，
    // 这行代码只是更改了connet的this对象在clint为window，server为global对象
    // 这样，connect就可以从window或者global中取store了
    var ConnectedCmp = (connect.apply(null, []))(Cmp);
    // 这里的props，就是一个普通的react组件应该获得的props，下面的WrappedCmp就是
    // 最终展示的内容
    function WrappedCmp(props) {
      props = props || {};
      var initialState = props.initialState || {};
      var initialProps = props.initialProps || {};
      var hasStore = props.store && props.store.dispatch && props.store.getState;
      // store 有就用已有的，如果没有，就新建一个
      var store = hasStore
        ? props.store
        : initStore(createStore, initialState, {}, config); // client case, no store but has initialState
      // 如果新建也没有，要反省了
      if (!store) {
        console.error('什么时候才会出这个错误呢？ 应该是你使用withredux包裹了非page吧');
        return React.createElement(ConnectedCmp, props);
      }
      // Fix for _document
      // 下面的不懂，还没遇到_document是怎么个事情
      var mergedProps = {};
      Object.keys(props).forEach(function(p) { if (!~skipMerge.indexOf(p)) mergedProps[p] = props[p]; });
      Object.keys(initialProps || {}).forEach(function(p) { mergedProps[p] = initialProps[p]; });
      // crateElement 三个参数，第一组件，第二props，第三chlidren
      return React.createElement( //FIXME This will create double Provider for _document case
        Provider,
        {store: store},
        React.createElement(ConnectedCmp, mergedProps)
      );
    }

    WrappedCmp.getInitialProps = function(ctx) {
      return new Promise(function(res) {
        ctx = ctx || {};
        if (config.debug) console.log('1. 最终渲染的组件.getInitialProps', (ctx.req && ctx.req._store ? '使用req中的store' : '新建store'), '作为参数');
        ctx.isServer = !!ctx.req;
        // 这里的initialState是undefined，则会使用默认的initialProps
        ctx.store = initStore(createStore, undefined /** initialState **/, {req: ctx.req, query: ctx.query}, config);
        res(Promise.all([
          ctx.isServer,
          ctx.store,
          ctx.req,
          Cmp.getInitialProps ? Cmp.getInitialProps.call(Cmp, ctx) : {}
        ]));
      }).then(function(arr) {
        if (config.debug) console.log('2. 最终渲染的组件.getInitialProps 的store为', arr[1]);
        if (config.debug) console.log('3. 最终渲染的组件.getInitialProps 的initialState为', arr[1].getState());
        if (config.debug) console.log('4. 最终渲染的组件.getInitialProps 的initialProps为', arr[3]);
        return {
          isServer: arr[0],
          store: arr[1],
          initialState: arr[1].getState(),
          initialProps: arr[3]
        };
      });
    };
    return WrappedCmp;
  };
};
