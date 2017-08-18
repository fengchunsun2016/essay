/**
 * @file channel/modules/account/containers/index.js
 * @author Mantak <mantak.cn@gmail.com>
 * Date: 2017-08-08
 * Last Modified Date: 2017-08-08
 * Last Modified By: Mantak <mantak.cn@gmail.com>
 */

import React from 'react';
import {Row, Col, Card} from 'antd';
import {connect} from 'react-redux';
import Query from '../components/query';
import List from '../components/list';
import {queryChanged, pageChanged, loadWithQuery} from '../actions';
import { getAccountFile } from '../../../services/export';
import { genFileDownLink } from '../../../utils/downLink';

const AccountContainer = (props) => {
  let {accountState, common: {amountType}, dispatch} = props;
  let { loading, search,search:{startDate,endDate}, total, rows, page, list } = accountState;
  const queryProps = {
    amountType,
    startDate,
    endDate,
    onQueryChange(queryObj){
      const newQueryObj = {...queryObj,  page:1, rows}
      dispatch(queryChanged(newQueryObj))
      dispatch(loadWithQuery(newQueryObj));
    },
    async onExport() {
      // download('test.txt', 'Hello world!');
      if (search.startDate) {
        const result = await getAccountFile({...search});
        genFileDownLink(result);
      }
    },
  }
  const listProps = {
    loading,
    total,
    rows,
    page,
    list,
    onPerPageChange(current, pageSize){
      dispatch(pageChanged({rows: pageSize, page: 1}))
      const queryObj = {...search, page: 1, rows: pageSize}
      dispatch(loadWithQuery(queryObj));
    },
    onPageChange(page, pageSize){
      dispatch(pageChanged({rows: pageSize, page: page}))
      const queryObj = {...search, page, rows: pageSize}
      dispatch(loadWithQuery(queryObj));
    }
  }
  return (
    <div>
      <Row>
        <Col span={24}>
          <Query {...queryProps} />
        </Col>
        <Col span={24} style={{marginTop: 5}}>
          <Card>
            <List {...listProps} />
          </Card>
        </Col>
      </Row>
      <style jsx global>{`
          th.column-avlBalance,td.column-avlBalance,
          th.column-amount,td.column-amount {
            text-align: right !important;
            padding-right:20px !important;
          }
          td.column-amount,td.column-avlBalance {
            padding-right:30px !important;
          }
      `}</style>
    </div>
  )
}

export default connect(({common, account}) => ({common, accountState: account}))(AccountContainer);
