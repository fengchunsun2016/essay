/**
 * Created by lihejia on 2017/7/25.
 */
import React from 'react';
import withAuth from '../../lib/withAuth';
import Layout from '../../modules/layout/containers'
import MIndex from '../../modules/merchant/containers/index';
import {commonItemLoad} from '../../modules/common/actions';

const MerIndex=(props)=>{
  return (
    <Layout {...props}>
      <MIndex {...props} />

    </Layout>
  )
}

MerIndex.getInitialProps = async ({store,isServer}) => {
  const {common}=store.getState();
  if(common.payTypeList&&common.payTypeList.length==0){
    await  store.dispatch(commonItemLoad())
  }

  return {isServer}
}

export default withAuth(MerIndex);