import React from 'react';
import Layout from '../../modules/layout/containers/index';
import withAuth from '../../lib/withAuth';
import {commonItemLoad} from '../../modules/common/actions';
import Terminal from '../../modules/terminal/containers';


const TerminalIndex = (props)=> {
  return (
    <Layout {...props}>
      <Terminal {...props} />
    </Layout>
  )
}
TerminalIndex.getInitialProps = async (props)=>{
  const {store,isServer} = props;
  const {common} = store.getState();
  if(common.payTypeList&&common.payTypeList.length==0){
    await store.dispatch(commonItemLoad())
  }
  return {isServer}
}

export default withAuth(TerminalIndex)




