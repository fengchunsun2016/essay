import React from 'react';
import withAuth from '../../lib/withAuth';
import Layout from '../../modules/layout/containers';
import Detail from '../../modules/terminal/containers/detail';


const DetailIndex = (props)=>{
  return(
    <Layout {...props}>
      <Detail {...props} />
    </Layout>
  )
}

DetailIndex.getInitialProps = ({isServer})=>{

  return {isServer}
}

export default withAuth(DetailIndex);

