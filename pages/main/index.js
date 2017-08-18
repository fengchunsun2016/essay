/**
 * Created by lihejia on 2017/7/19.
 */
import React from 'react';
import dynamic from 'next/dynamic'
import {Spin} from 'antd';
import Layout from '../../modules/layout/containers';
import withAuth from '../../lib/withAuth';

const DynamicMainTV = dynamic(import('../../modules/main-tv/containers/index'),{
  ssr: false,
  loading: () => (
    <Spin size="large" />
  )
})
// import DynamicMainTV from '../../modules/main-tv/containers/index'

const MainIndex =(props)=>{
  return(
    <Layout {...props}>
      <DynamicMainTV  />
    </Layout>
  )
}

MainIndex.getInitialProps = async ({isServer}) => {
  return {isServer}
}

export default withAuth(MainIndex)
