import React from 'react';
import Layout from '../../modules/layout/containers';
import SubChange from '../../modules/channel/containers/change';
import withAuth from '../../lib/withAuth';

const Change =(props)=>{
  return(
    <Layout {...props} >
      <SubChange  />
    </Layout>
  )
}


Change.getInitialProps = async ({isServer}) => {
  return {isServer}
}


export default withAuth(Change)


