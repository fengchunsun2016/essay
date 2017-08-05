import React from 'react';
import WithAuth from '../../lib/withAuth';
import LayOut from '../../modules/layout/containers';
import Deal from '../../modules/deal/container';
import {commonItemLoad} from '../../modules/common/actions';

const DealIndex = (props)=>{
  return (
    <LayOut {...props}>
      <Deal {...props} />
    </LayOut>
  )
}
DealIndex.getInitialProps = async ({store,isServer})=>{
  const {common}=store.getState();
  if(common.payType.length==0){
    await  store.dispatch(commonItemLoad())
  }
  return {isServer}
}

export default WithAuth(DealIndex);


