/**
 * @file channel/pages/account/index.js
 * @author Mantak <mantak.cn@gmail.com>
 * Date: 2017-08-06
 * Last Modified Date: 2017-08-08
 * Last Modified By: Mantak <mantak.cn@gmail.com>
 */
import React from 'react';
import withAuth from '../../lib/withAuth';
import Layout from '../../modules/layout/containers'
import AccountContainer from '../../modules/account/containers/index';
import {commonItemLoad} from '../../modules/common/actions';

const AccountIndex=(props)=>{
  return (
    <Layout {...props}>
      <AccountContainer {...props} />
    </Layout>
  )
}

AccountIndex.getInitialProps = async ({store,isServer}) => {
  const {common}=store.getState();
  if(common.payTypeList&&common.payTypeList.length==0){
    await store.dispatch(commonItemLoad())
  }
  return {isServer}
}

export default withAuth(AccountIndex);
