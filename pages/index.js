/**
 * @file channel/pages/index.js
 * @author Mantak <mantak.cn@gmail.com>
 * Date: 2017-08-02
 * Last Modified Date: 2017-08-02
 * Last Modified By: Mantak <mantak.cn@gmail.com>
 */
/**
 * Created by lihejia on 2017/7/18.
 */
import React from 'react';
import LoginHead from '../modules/heads/login-head';
import Login from '../modules/login/containers/login';

import withAuth from '../lib/withAuth';

class Index extends React.Component {


  render() {
    return (
      <div>
        <LoginHead />
        <Login {...this.props} />
      </div>
    )
  }
}

export default withAuth(Index);
