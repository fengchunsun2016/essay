import React from 'react';
import Router from 'next/router';
import {connect} from 'react-redux';
import {Card} from 'antd';
import Query from '../components/query';
import Center from '../components/center';
import List from '../components/list';
import {getDealAction, saveDealSearch,rowsAndPageChange,getDealDetailAction} from '../actions';
import { getDealFile } from '../../../services/export';
import { genFileDownLink } from '../../../utils/downLink';

const styles = {
  card:{
    marginBottom:10
  }
}

class Deal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      clientWidth:null
    }
  }
  componentDidMount(){
    if(this.props.isServer){
      var clientWidth = document.documentElement.clientWidth||document.body.clientWidth;
      this.setState({
        clientWidth
      })
    }

  }

  render(){
    const {
      common:{payStatus,payType},
      dispatch,
      deal:{list,rows,page,pending,search,total,search:{beginTime,endTime},currentData:{sumAmount,sumMerchantFee,splitFeeSum}}
    } = this.props;

    const queryProps = {
      payStatus,
      payType,
      startDate:beginTime,
      endDate:endTime,
      onQuery:(data)=>{
        //月份格式
        this.props.deal.page = 1;
        dispatch(saveDealSearch(data));
        let queryData = {...data,page:1,rows,type:1};
        dispatch(getDealAction(queryData));
      },
      onExport: async ()=>{
        const {search} = this.props.deal;
        if (search.beginTime) {
          const result = await getDealFile({...search,type:0});
          genFileDownLink(result);
        }
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
      clientWidth:this.state.clientWidth,
      //条数更改
      onShowSizeChange:(current, pageSize)=>{
        dispatch(rowsAndPageChange({rows: pageSize, page: 1}));
        let queryData = {...search, page: 1, rows: pageSize, type:0};
        dispatch(getDealAction(queryData));
      },
      //分页查询
      onPageChange:(page, pageSize)=>{
         dispatch(rowsAndPageChange({rows: pageSize, page: page}));
        let queryData = {...search, page, rows: pageSize, type:0};
        dispatch(getDealAction(queryData));
      },
      onRowClick:(orderNo)=>{
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
      `}</style>
      </div>
    )
  }
}

export default connect(({common,deal})=>({common,deal}))(Deal);

