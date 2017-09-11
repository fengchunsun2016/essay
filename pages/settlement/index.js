import React from 'react';
import withAuth from '../../lib/withAuth';
import Layout from '../../modules/layout/containers';
import Settlement from '../../modules/settlement/container';
import {commonItemLoad} from '../../modules/common/actions';

const SettlementIndex = (props)=> {
  return (
    <Layout {...props}>
      <Settlement {...props} />
    </Layout>
  )
}
SettlementIndex.getInitialProps = async({store, isServer})=> {
  const {common}=store.getState();
  if(common.payTypeList&&common.payTypeList.length==0){
    await  store.dispatch(commonItemLoad())
  }
  return {isServer}
}
export default withAuth(SettlementIndex);



