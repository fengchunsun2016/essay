/**
 * Created by lihejia on 2017/7/22.
 * 系统公告
 */
import React from 'react';
import Layout from '../../modules/layout/containers';
import withAuth from '../../lib/withAuth';

import Message from '../../modules/message/containers';

const MessageIndex = (props) => {
  return (
    <Layout {...props}>
      <Message {...props} />
    </Layout>
  )
}


MessageIndex.getInitialProps = async ({ isServer}) => {


  return {isServer}
}


export default withAuth(MessageIndex)