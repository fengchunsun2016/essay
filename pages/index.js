import React from 'react';
import LoginHead from '../modules/heads/login-head';
import Login from '../modules/login/containers/login';

import withAuth from '../lib/withAuth';

const Index = (props)=> {

  return (
    <div>
      <LoginHead />
      <Login {...props} />
    </div>
  )

}
Index.getInitialProps = ({isServer})=>{
  return {isServer};
}

export default withAuth(Index);
