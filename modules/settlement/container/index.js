import React from 'react';
import Router from 'next/router';
import {connect} from 'react-redux';
import {Card} from 'antd';
import Query from '../components/query';
import Center from '../components/center';
import List from '../components/list';
import {getSettlementAction,saveSettlementSearch,settlementChangeRows} from '../actions';


const styles = {
  card:{
    marginBottom:10
  }
}

class Settlement extends React.Component {

  render(){
    const {
      common:{amountStatus},
      dispatch,
      settlement:{list,rows,page,pending,search,total,currentData:{amountTitle,arrivalAmountTitle,merFeeTitle}}
    } = this.props;

    const queryProps = {
      amountStatus,
      onQuery:(data)=>{
        //月份格式
        dispatch(saveSettlementSearch(data));
        this.props.settlement.page = 1;
        let queryData = {...data,page:1,rows};
        dispatch(getSettlementAction(queryData));
      }
    }
    const centerProps = {
      amountTitle,
      arrivalAmountTitle,
      merFeeTitle
    }
    const listProps = {
      list,
      rows,
      page,
      total,
      pending,
      //条数更改
      onShowSizeChange:(current, pageSize)=>{
        dispatch(settlementChangeRows({rows: pageSize, page: 1}));

        let queryData = {...search, page: 1, rows: pageSize , type:0};
        dispatch(getSettlementAction(queryData));
      },
      //分页查询
      onPageChange:(page, pageSize)=>{
        dispatch(settlementChangeRows({rows: pageSize, page: page}));

        let queryData = {...search, page, rows: pageSize, type:0};
        dispatch(getSettlementAction(queryData));
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

export default connect(({common,settlement})=>({common,settlement}))(Settlement);


