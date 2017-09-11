/**
 * Created by lihejia on 2017/7/25.
 */

import React from 'react';
import {Row, Col, Card} from 'antd';
import {connect} from 'react-redux';
import Query from '../components/query';
import List from '../components/list';
import {merLoad, saveQuery, rowsAndPageChange} from '../actions';

const MerIndex = (props) => {

  let {mer, common: {merchantStatus}, dispatch} = props;
  //获取sum参数信息
  let {rows, search, search:{beginTime,endTime,mid,merchantName,status},titlePaySum,titlePayCount,titleFeeSum} = mer;
  //查询参数
  let queryProps = {
    merchantStatus,
    mid,
    merchantName,
    status,
    startDate:beginTime,
    endDate:endTime,
    //查询
    onQuery(data){
      //月份格式
      let queryData = {...data,page:1,rows}
      dispatch(saveQuery(queryData))
      dispatch(merLoad(queryData));
    },
    resetSearch : ()=>{
      dispatch({type:'RESET_MER_SEARCH'})
    }
  }

  //列表参数
  const listProps = {
    ...mer,
    merchantStatus,

    //条数更改
    onShowSizeChange(current, pageSize){
      dispatch(rowsAndPageChange({rows: pageSize, page: 1}))
      let queryData = {...search, page: 1, rows: pageSize}
      dispatch(merLoad(queryData));
    },
    //分页查询
    onPageChange(page, pageSize){
      dispatch(rowsAndPageChange({rows: pageSize, page: page}))
      let queryData = {...search, page, rows: pageSize}
      dispatch(merLoad(queryData));
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
    </div>
  )
}

export default connect(({common, mer}) => ({common, mer}))(MerIndex);
