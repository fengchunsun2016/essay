/**
 * Created by lihejia on 2017/7/22.
 * 系统公告
 */
import React from 'react';
import Layout from '../../modules/layout/containers';
import withAuth from '../../lib/withAuth';
import {doSearch} from '../../modules/message/actions';
import Message from '../../modules/message/containers';

const MessageIndex = (props) => {
  return (
    <Layout {...props} >
      <Message />
    </Layout>
  )
}


MessageIndex.getInitialProps = async ({store, isServer}) => {

  const {message} = store.getState();
  let { page, rows} = message;
  store.dispatch(doSearch({page, rows}))
  return {isServer}
}


export default withAuth(MessageIndex)