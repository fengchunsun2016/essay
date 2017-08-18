import React from 'react';
import WithAuth from '../../lib/withAuth';
import LayOut from '../../modules/layout/containers';
import Detail from '../../modules/deal/container/detail';

const DealIndex = (props)=>{
  return (
    <LayOut {...props}>
      <Detail {...props} />
    </LayOut>
  )
}

DealIndex.getInitialProps = async ({isServer})=>{

  return {isServer}
}

export default WithAuth(DealIndex);
