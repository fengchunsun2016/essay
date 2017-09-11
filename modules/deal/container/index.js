import React from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import { Card } from 'antd';
import Query from '../components/query';
import Center from '../components/center';
import List from '../components/list';
import { getDealAction, saveDealSearch, rowsAndPageChange, getDealDetailAction } from '../actions';
import { getDealFile, getDealBillsFile } from '../../../services/export';
import { genFileDownLink } from '../../../utils/downLink';

const styles = {
  card : {
    marginBottom : 10
  }
}

class Deal extends React.Component {


  render() {
    const {
      auth:{ clientWidth },
      common:{ payStatus, payTypeList },
      dispatch,
      deal:{
        list, rows, page, pending, search, total,
        search:{ beginTime, endTime, mid, merchantName, status, payType, orderNo, minAmount, maxAmount },
        currentData:{ sumAmount, sumMerchantFee, splitFeeSum }
      }
    } = this.props;

    const queryProps = {
      mid,
      merchantName,
      status,
      payType,
      orderNo,
      minAmount,
      maxAmount,
      payStatus,
      payTypeList,
      startDate : beginTime,
      endDate : endTime,
      onQuery : (data)=> {
        //月份格式
        this.props.deal.page = 1;
        dispatch(saveDealSearch(data));
        let queryData = { ...data, page : 1, rows, type : 1 };
        dispatch(getDealAction(queryData));
      },
      onExport : async()=> {
        if (search.beginTime) {
          const result = await getDealFile({ ...search, type : 0 });
          genFileDownLink(result);
        }
      },
      resetSearch : ()=>{
        dispatch({type:'RESET_DEAL_SEARCH'})
      }
    }
    const centerProps = {
      sumAmount,
      sumMerchantFee,
      splitFeeSum,
      onExportBills: async (data)=>{
        if (data.startDate) {
          const result = await getDealBillsFile(data);
          genFileDownLink(result);
        }
      }
    }
    const listProps = {
      list,
      rows,
      page,
      total,
      pending,
      clientWidth,
      //条数更改
      onShowSizeChange : (current, pageSize)=> {
        dispatch(rowsAndPageChange({ rows : pageSize, page : 1 }));
        let queryData = { ...search, page : 1, rows : pageSize, type : 1 };
        dispatch(getDealAction(queryData));
      },
      //分页查询
      onPageChange : (page, pageSize)=> {
        dispatch(rowsAndPageChange({ rows : pageSize, page : page }));
        let queryData = { ...search, page, rows : pageSize, type : 1 };
        dispatch(getDealAction(queryData));
      },
      onRowClick : (orderNo)=> {
        Router.push('/deal/detail');
        dispatch(getDealDetailAction(orderNo));
      }
    }

    return (
      <div>
        <Card style={styles.card}>
          <Query {...queryProps} />
        </Card>
        <Card style={styles.card}>
          <Center {...centerProps} />
        </Card>
        <Card style={styles.card}>
          <List {...listProps} />
        </Card>
        <style jsx global>{`
          th.column-orgMerFee,td.column-orgMerFee,
          th.column-merchantFee,td.column-merchantFee,
          th.column-amount,td.column-amount {
            text-align: right !important;
          }
          td.column-orgMerFee,td.column-merchantFee,td.column-amount{
            padding-right:20px !important;
          }
      `}</style>
      </div>
    )
  }
}

export default connect(({ common, deal })=>({ common, deal }))(Deal);

