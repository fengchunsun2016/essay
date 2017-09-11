import React from 'react';
import Layout from '../../modules/layout/containers'
import withAuth from '../../lib/withAuth';
import Detail from '../../modules/pos/containers/detail'


const DetailIndex = (props)=>{
  return (
    <Layout {...props}>
      <Detail {...props} />
    </Layout>
  )
}
DetailIndex.getInitialProps = ({isServer})=>{

  return {isServer}
}

export default withAuth(DetailIndex);



