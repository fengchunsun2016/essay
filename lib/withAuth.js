/**
 * @file channel/lib/withAuth.js
 * @author lihejia
 * Date: 2017-07-17
 * Last Modified Date: 2017-08-02
 * Last Modified By: Mantak <mantak.cn@gmail.com>
 */
import React from 'react';
import {connect} from 'react-redux';
import NProgress from 'nprogress';
import Router from 'next/router';
import CommonHead from '../modules/heads/common-head';
import {withReduxSaga} from '../store/configureStore';
import {LOAD_MENUS} from '../constants/actionTypes';
import { getTokenCookieAtServer, getTokenCookieAtClient } from '../utils/cookies';

// 载入登录用的coponent并且设置head，添加antd
import LoginHead from '../modules/heads/login-head';
import Login from '../modules/login/containers/login';
import Head from 'next/head';

Router.onRouteChangeStart = () => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()


function withAuth(Child) {
  class WrappedComponent extends React.Component {
    static getInitialProps(context) {
      // 每次请求，都要设置合适的token，作为reques的header参数
      let tokenCookie;
      if (process.browser) {
        tokenCookie = getTokenCookieAtClient();
      } else {
        const headers = context.req.headers;
        tokenCookie = getTokenCookieAtServer(headers.cookie);
      }
      if (!tokenCookie) {
        return { tokenLost: true }
      }
      const { store } = context;
      const { menu: {menus} } = store.getState();
      if(menus.length==0){
        store.dispatch({type:LOAD_MENUS})
      }
      if(typeof Child.getInitialProps==='function'){
        return Child.getInitialProps(context)
      }
    }
    render() {
      const { tokenLost, auth: { token } } = this.props;
      const needLogin = !!tokenLost || !token;
      console.log(needLogin);
      return (
        needLogin ?
        <div>
          <CommonHead />
          <LoginHead />
          <Login  {...this.props} />
        </div>
        :
        <div>
          <CommonHead />
          <Child  {...this.props} />
        </div>
      )
    }
  }
  const mapStateToProps = ({auth}) => ({auth});
  return withReduxSaga(connect(mapStateToProps)(WrappedComponent));
}

export default withAuth
