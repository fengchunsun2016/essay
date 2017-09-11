/**
 * Created by lihejia on 2017/7/25.
 */
import React from 'react';
import withAuth from '../../lib/withAuth';
import Layout from '../../modules/layout/containers'
import SIndex from '../../modules/sum/containers/index';
import {commonItemLoad} from '../../modules/common/actions';

const SumIndex=(props)=>{
  return (
    <Layout {...props}>
      <SIndex {...props} />
    </Layout>
  )
}

SumIndex.getInitialProps = async (props) => {
  const {store,isServer} = props;
  const {common} = store.getState();
  if(common.payTypeList&&common.payTypeList.length==0){
    await store.dispatch(commonItemLoad())
  }
  return {isServer}
}

export default withAuth(SumIndex);
