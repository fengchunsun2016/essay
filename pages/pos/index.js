import React from 'react';
import withAuth from '../../lib/withAuth';
import Layout from '../../modules/layout/containers';
import {commonItemLoad} from '../../modules/common/actions';
import Pos from '../../modules/pos/containers'

const PosIndex = (props)=>{

  return (
    <Layout {...props}>
      <Pos {...props} />
    </Layout>
  )

}

PosIndex.getInitialProps = ({store,isServer})=>{
  const {common} = store.getState();
  if(common.payTypeList&&common.payTypeList.length==0){
    store.dispatch(commonItemLoad());
  }
  return {isServer}
}
export default withAuth(PosIndex);