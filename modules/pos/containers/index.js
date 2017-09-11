import React from 'react';
import {connect} from 'react-redux';
import {Card} from 'antd';
import router from 'next/router';
import Query from '../components/query';
import Center from '../components/center';
import List from '../components/list';
import {getPosAction,savePosSearch,posChangeRows,getPosDetailAction} from '../actions';
import { getPosFile } from '../../../services/export';
import { genFileDownLink } from '../../../utils/downLink';



const styles = {
  card:{
    marginBottom:10
  }
}
class Pos extends  React.Component{


  render(){
    const {
      dispatch,
      common:{posStatus,posPayType},
      auth:{clientWidth},
      pos:{list,page,rows,total,pending,merFeeCount,amountCount,search}
    } = this.props;
    const queryProps = {
      search,
      posStatus,
      posPayType,
      onQuery:(data)=>{
        this.props.pos.page = 1;
        dispatch(savePosSearch(data));

        dispatch(getPosAction({...data,rows,page,type:1}));
      },
      onExport:async ()=>{
        if(search.startDate){
          let result = await getPosFile({...search,page,rows,type:0});
          genFileDownLink(result);
        }
      },
      resetSearch : ()=>{
        dispatch({type:'RESET_POS_SEARCH'})
      }
    }
    const centerProps = {
      amountCount,
      merFeeCount
    }
    const listProps = {
      clientWidth,
      list,
      page,
      rows,
      total,
      pending,
      onPageChange:(page,pageSize)=>{
        dispatch(posChangeRows({page,rows:pageSize}));
        dispatch(getPosAction({...search,rows:pageSize,page,type:1}));
      },
      onShowSizeChange:(current,size)=>{
        dispatch(posChangeRows({page:1,rows:size}));
        dispatch(getPosAction({...search,rows:size,page,type:1}));
      },
      detailClick:(id)=>{
        dispatch(getPosDetailAction({id}));
        router.push('/pos/detail');
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
          th.column-merFee,td.column-merFee,
          th.column-amount,td.column-amount {
            text-align: right !important;
          }
          td.column-merFee,td.column-amount {
            padding-right:20px !important;
          }
      `}</style>
      </div>
    )
  }
}

export default connect(({pos,common})=>({pos,common}))(Pos)

