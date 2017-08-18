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
import { getSumFile } from '../../../services/export';
import { genFileDownLink } from '../../../utils/downLink';

//处理查询结果
function queryDataFormat(data) {
  const monthFormat = 'YYYY-MM';
  //日格式
  const dayFormat = 'YYYY-MM-DD';
  let {requestType}= data;
  let startDate;
  let endDate;
  //对日期处理，如果是月，则取开始时间和结束时间
  if (requestType == 'month') {
    startDate = data.startDate.format(monthFormat);
    endDate = data.endDate.format(monthFormat);
  }
  //对日期处理，如果是日，则取payDat,获取array里的时间
  else if (requestType == 'day') {
    startDate = data.payDate[0].format(dayFormat);
    endDate = data.payDate[1].format(dayFormat);
    //删除payDate参数
    delete data['payDate']
  }

  return {...data, startDate, endDate}
}
class SunIndex extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      requestType : 'month'
    }
  }
  render(){
    let {sum, common: {payType}, dispatch} = this.props;
    //获取sum参数信息
    let {rows, search, titlePaySum, titlePayCount, titleFeeSum} = sum;
    //查询参数
    let queryProps = {
      payType,
      //导出
      onExport: async ()=>{
        
        const {search} = this.props.sum;
        if (search.startDate) {
          const result = await getSumFile({...search,type:0});
          genFileDownLink(result);
        }
      },
      //查询
      onQuery(data){
        if(this.state.requestType=='month'){
          this.props.sum.startMonth = values.startDate;
          this.props.sum.endMonth = values.endDate;
        }else {
          this.props.sum.startDay = values.startDate;
          this.props.sum.endDay = values.endDate;
        }
        //月份格式
        let result = queryDataFormat(data);

        let queryData = {...result, page: 1, rows, type: 1, status: ''}
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
        let queryData = {...search, page: 1, rows: pageSize, type: 0}
        dispatch(sumLoad(queryData));
      },
      //分页查询
      onPageChange(page, pageSize){
        dispatch(rowsAndPageChange({rows: pageSize, page: page}))
        let queryData = {...search, page, rows: pageSize, type: 0}
        dispatch(sumLoad(queryData));
      }
    }
    //统计金额
    const sumAccountProps = {
      titlePaySum,
      titlePayCount,
      titleFeeSum,
      isServer:this.props.isServer
    }
    return (
      <div>
        <Row>
          <Col span={14}>
            <Query {...queryProps} />
          </Col>

          <Col span={10}>
            <SumAccount {...sumAccountProps} />
          </Col>
          <Col span={24} style={{marginTop: 5}}>

              <List {...listProps} />

          </Col>
        </Row>
        <style jsx global>{`
          th.column-feeSum,td.column-feeSum,
          th.column-payCount,td.column-payCount,
          th.column-paySum,td.column-paySum {
            text-align: right !important;
          }
      `}</style>
      </div>
    )
  }

}

export default connect(({common, sum}) => ({common, sum}))(SunIndex);
