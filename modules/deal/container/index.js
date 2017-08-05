import React from 'react';
import Router from 'next/router';
import {connect} from 'react-redux';
import {Card} from 'antd';
import Query from '../components/query';
import Center from '../components/center';
import List from '../components/list';
import {getDealAction, saveDealSearch,rowsAndPageChange,getDealDetailAction} from '../actions';


const styles = {
  card:{
    marginBottom:10
  }
}

class Deal extends React.Component {

  render(){
    const {
      common:{payStatus,payType},
      dispatch,
      deal:{list,rows,page,pending,search,total,currentData:{sumAmount,sumMerchantFee,splitFeeSum}}
    } = this.props;

    const queryProps = {
      payStatus,
      payType,
      onQuery:(data)=>{
        //月份格式
        this.props.deal.page = 1;
        dispatch(saveDealSearch(data));
        let queryData = {...data,page:1,rows};
        dispatch(getDealAction(queryData));
      }
    }
    const centerProps = {
      sumAmount,
      sumMerchantFee,
      splitFeeSum
    }
    const listProps = {
      list,
      rows,
      page,
      total,
      pending,
      //条数更改
      onShowSizeChange:(current, pageSize)=>{
        dispatch(rowsAndPageChange({rows: pageSize, page: 1}))
        // this.props.deal.rows = pageSize;
        // this.props.deal.page = 1;
        let queryData = {...search, page: 1, rows: pageSize};
        dispatch(getDealAction(queryData));
      },
      //分页查询
      onPageChange:(page, pageSize)=>{
         dispatch(rowsAndPageChange({rows: pageSize, page: page}))
        // this.props.deal.rows = pageSize;
        // this.props.deal.page = page;
        let queryData = {...search, page, rows: pageSize};
        dispatch(getDealAction(queryData));
      },
      onRowClick:(orderNo)=>{
        /*console.log('详情详情详情详情详情详情详情')
        console.log(orderNo,'xxxxxxxxxxxxx')*/
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
      </div>
    )
  }
}

export default connect(({common,deal})=>({common,deal}))(Deal);

