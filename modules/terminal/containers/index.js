import React from 'react';
import {connect} from 'react-redux';
import {Card} from 'antd';
import router from 'next/router';
import Query from '../components/query';
import List from '../components/list';
import {terminalLoadAction,saveTerminalSearch,terminalChangeRows,terminalDetailLoadAction} from '../actions';


const styles = {
  card:{
    marginBottom:10
  }
}
class Terminal extends React.Component{

  render(){
    const {
      common:{terminalType},
      dispatch,
      terminal:{list,rows,page,pending,search,search:{mid,merName,termCode,physicalId,status},total,}
    } = this.props;

    const queryProps = {
      mid,
      merName,
      termCode,
      physicalId,
      status,
      terminalType,
      onQuery:(data)=>{
        //月份格式

        dispatch(saveTerminalSearch(data));
        this.props.terminal.page = 1;
        let queryData = {...data,page:1,rows};
        dispatch(terminalLoadAction(queryData));
      },
      resetSearch : ()=>{
        dispatch({type:'RESET_TERMINAL_SEARCH'})
      }
    }
    const listProps = {
      list,
      rows,
      page,
      total,
      pending,
      //条数更改
      onShowSizeChange:(current, pageSize)=>{
        dispatch(terminalChangeRows({rows: pageSize, page: 1}));

        let queryData = {...search, page: 1, rows: pageSize , type:1};
        dispatch(terminalLoadAction(queryData));
      },
      //分页查询
      onPageChange:(page, pageSize)=>{
        dispatch(terminalChangeRows({rows: pageSize, page: page}));

        let queryData = {...search, page, rows: pageSize, type:1};
        dispatch(terminalLoadAction(queryData));
      },
      detailClick:(id)=>{
        dispatch(terminalDetailLoadAction({id}));
        router.push('/terminal/detail');
      }
    }

    return (
      <div>
        <Card style={styles.card}>
          <Query {...queryProps} />
        </Card>
        <Card style={styles.card}>
          <List {...listProps} />
        </Card>

      </div>
    )
  }
}

export default connect(({common,terminal})=>({common,terminal}))(Terminal);



