/**
 * @file channel/lib/withAuth.js
 * @author lihejia
 * Date: 2017-07-17
 * Last Modified Date: 2017-08-02
 * Last Modified By: Mantak <mantak.cn@gmail.com>
 */
import React from 'react';
import { connect } from 'react-redux';
import NProgress from 'nprogress';
import Router from 'next/router';
import moment from 'moment';
import 'moment/locale/zh-cn';

import CommonHead from '../modules/heads/common-head';
import { withReduxSaga } from '../store/configureStore';
import { LOAD_ORIGIN } from '../constants/actionTypes';
import { getTokenCookieAtServer, getTokenCookieAtClient } from '../utils/cookies';

import LoginHead from '../modules/heads/login-head';
import Login from '../modules/login/containers/login';

moment.locale('zh-cn');
Router.onRouteChangeStart = () => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()


function withAuth(Child) {
  class WrappedComponent extends React.Component {
    static getInitialProps(context) {
      let tokenCookie;
      if (process.browser) {
        tokenCookie = getTokenCookieAtClient();
      } else {
        const headers = context.req.headers;
        tokenCookie = getTokenCookieAtServer(headers.cookie);
      }
      if (!tokenCookie) {
        return { tokenLost : true }
      }
      const { store } = context;
      const { auth: { token }} = store.getState();
      if (!token) {
        store.dispatch({ type : LOAD_ORIGIN });
      }
      if (typeof Child.getInitialProps === 'function') {
        return Child.getInitialProps(context)
      }
    }

    componentDidMount() {
      if (!this.props.isServer) {
        let clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
        this.props.auth.clientWidth = clientWidth;
      }
    }

    render() {
      const { tokenLost, auth: { token } } = this.props;
      const needLogin = !!tokenLost || !token;
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
  const mapStateToProps = ({ auth }) => ({ auth });
  return withReduxSaga(connect(mapStateToProps)(WrappedComponent));
}
export default withAuth
