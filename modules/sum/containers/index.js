/**
 * Created by lihejia on 2017/7/25.
 */

import React from 'react';
import {Row, Col} from 'antd';
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
    this.changeType = this.changeType.bind(this);
    this.state = {
      requestType : 'month'
    }
  }
  //保存requestType
  changeType(value){
    let {dispatch} = this.props;
    dispatch({
      type:'CHANGE_TYPE',
      data:value
    })
  }
  render(){
    let {sum, common: {payTypeList}, dispatch} = this.props;
    //获取sum参数信息
    let {rows, search, search:{requestType,merName,payType,mid}, titlePaySum, titlePayCount, titleFeeSum, startMonth, endMonth, startDay, endDay} = sum;

    //查询参数
    let queryProps = {
      merName,
      payTypeList,
      mid,
      payType,
      startMonth,
      endMonth,
      startDay,
      endDay,
      requestType,
      changeType:this.changeType,
      //导出
      onExport: async ()=>{
        
        const {search} = this.props.sum;
        if (search.startDate) {
          const result = await getSumFile({...search,type:0});
          genFileDownLink(result);
        }
      },
      //查询
      onQuery:(values)=>{

        //月份格式
        let result = queryDataFormat(values);
        if(requestType=='month'){
          this.props.sum.startMonth = result.startDate;
          this.props.sum.endMonth = result.endDate;
        }else if(requestType=='day'){
          this.props.sum.startDay = result.startDate;
          this.props.sum.endDay = result.endDate;
        }

        let queryData = {...result, page: 1, rows, status: ''}
        dispatch(saveQuery(queryData))
        dispatch(sumLoad({...queryData, type: 1}));
      },
      resetSearch : ()=>{
        dispatch({type:'RESET_SUM_SEARCH'})
      }
    }

    //列表参数
    const listProps = {
      ...sum,
      //条数更改
      onShowSizeChange(current, pageSize){
        dispatch(rowsAndPageChange({rows: pageSize, page: 1}))
        let queryData = {...search, page: 1, rows: pageSize, type: 1}
        dispatch(sumLoad(queryData));
      },
      //分页查询
      onPageChange(page, pageSize){
        dispatch(rowsAndPageChange({rows: pageSize, page: page}))
        let queryData = {...search, page, rows: pageSize, type: 1}
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
          td.column-feeSum,td.column-payCount,td.column-paySum {
            padding-right:20px !important;
          }
      `}</style>
      </div>
    )
  }

}

export default connect(({common, sum}) => ({common, sum}))(SunIndex);
