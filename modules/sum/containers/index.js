/**
 * Created by lihejia on 2017/7/25.
 */

import React from 'react';
import {Row, Col, Card} from 'antd';
import {connect} from 'react-redux';
import Query from '../components/query';
import SumAccount from '../components/sum-account';
import List from '../components/list';
import {sumLoad, saveQuery, rowsAndPageChange} from '../actions';


//处理查询结果
function queryDataFormat(data){
  const monthFormat='YYYY-MM';
  //日格式
  const dayFormat='YYYY-MM-DD';
  let {requestType}= data;
  let startDate;
  let endDate;
  //对日期处理，如果是月，则取开始时间和结束时间
  if(requestType=='month'){
    startDate=data.startDate.format(monthFormat);
    endDate=data.endDate.format(monthFormat);
  }
  //对日期处理，如果是日，则取payDat,获取array里的时间
  else if(requestType=='day'){
    startDate=data.payDate[0].format(dayFormat)
    endDate=data.payDate[1].format(dayFormat)
    //删除payDate参数
    delete data['payDate']

  }

  return {...data,startDate,endDate}
}
const SunIndex = (props) => {

  let {sum, common: {payType}, dispatch} = props;
  //获取sum参数信息
  let {rows, search,titlePaySum,titlePayCount,titleFeeSum} = sum;

  //查询参数
  let queryProps = {
    payType,
    //导出
    onExport(data){
      let result=queryDataFormat(data);
      let queryData = {...result,page:1,rows}
    },
    //查询
    onQuery(data){
      //月份格式
        let result=queryDataFormat(data);
        let queryData = {...result,page:1,rows}
        dispatch(saveQuery(queryData))
        dispatch(sumLoad(queryData));
    }
  }

  //列表参数
  const listProps = {
    ...sum,
    payType,
    //条数更改
    onShowSizeChange(current, pageSize){
      dispatch(rowsAndPageChange({rows: pageSize, page: 1}))
      let queryData = {...search, page: 1, rows: pageSize}
      dispatch(sumLoad(queryData));
    },
    //分页查询
    onPageChange(page, pageSize){
      dispatch(rowsAndPageChange({rows: pageSize, page: page}))
      let queryData = {...search, page, rows: pageSize}
      dispatch(sumLoad(queryData));
    }
  }
  //统计金额
  const sumAccountProps={
    titlePaySum,
    titlePayCount,
    titleFeeSum
  }
  return (
    <div>
      <Row>
        <Col span={12}>
          <Query {...queryProps} />
        </Col>

        <Col span={12}>
          <SumAccount {...sumAccountProps} />
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

export default connect(({common, sum}) => ({common, sum}))(SunIndex);
