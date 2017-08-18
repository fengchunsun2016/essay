import React from 'react';
import Layout from '../../modules/layout/containers';
import withAuth from '../../lib/withAuth';
import SubBasic from '../../modules/channel/containers/basic';
import {basicLoadAction} from '../../modules/channel/actions';

const Basic =(props)=>{
  return(
    <Layout {...props} >
      <SubBasic {...props} />
    </Layout>
  )
}

Basic.getInitialProps = async ({store,isServer}) => {
  //console.log('....store',store,store.getState());
  await store.dispatch(basicLoadAction())
  return {isServer}
}


export default withAuth(Basic)
