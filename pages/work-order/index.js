import React from 'react';
import Layout from '../../modules/layout/containers';
import withAuth from '../../lib/withAuth';
import WorkOrder from '../../modules/work-order/container';
import {loadWorkOrderAction} from '../../modules/work-order/actions';

const WorkOrderIndex = (props)=> {

  return (
    <Layout {...props} >
      <WorkOrder {...props} />
    </Layout>
  )
}


WorkOrderIndex.getInitialProps = async({store, isServer}) => {
  const {workOrder:{search}} = store.getState();

  store.dispatch(loadWorkOrderAction(search));

  return {isServer}
}


export default withAuth(WorkOrderIndex)