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
