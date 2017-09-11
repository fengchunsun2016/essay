/**
 * Created by lihejia on 2017/7/22.
 */
import React from 'react';
import { connect } from 'react-redux';
import SubSearch from '../components/search';
import List from '../components/list';
import MessageModal from '../components/message-modal';

import {
  doSearch,
  loadMessageDetail,
  hideModalAction,
  changePage,
  saveSearch
} from '../actions'

/***
 * 系统公告主页
 */
class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  //加载完成时间
  componentDidMount() {
    let { message: { rows, page, search:{ title } } } = this.props;
    let queryData = {
      rows,
      page
    }
    if (title) {
      queryData = {
        rows,
        page,
        title
      }
    }
    //如果当前数据不存在，则加载数据(防止服务端和客户端重复加载)
    this.queryData(queryData);


  }

  //查询数据方法
  queryData(queryData) {
    let { dispatch } = this.props;
    dispatch(doSearch(queryData))
  }

  render() {

    let { message, dispatch } = this.props;
    let { modalVisible, currentData, rows, search, search:{ title } } = message;
    let that = this;
    //列表配置参数
    const listProps = {
      ...message,
      //页数更改
      onPageChange(page, pageSize){
        //更改页数
        dispatch(changePage({ page, rows : pageSize }))
        //更改请求
        let queryData = { ...search, page, rows : pageSize }
        that.queryData(queryData);
      },
      //行数点击
      onRowClick(data){
        dispatch(loadMessageDetail(data));
      }
    }

    //搜索
    const searchProps = {
      title,
      onSearch(value){
        dispatch(saveSearch({ title : value }));
        let queryData = {
          title : value,
          rows,
          page : 1
        }

        that.queryData(queryData);
      }
    }

    //modal参数
    const modalProps = {
      data : currentData,
      visible : modalVisible,

      //取消
      onCancel(){
        dispatch(hideModalAction())
      },
    }

    return (
      <div>
        <SubSearch {...searchProps} />
        <br />
        <List {...listProps} />

        {modalVisible ? <MessageModal {...modalProps} /> : ''}
      </div>
    )
  }
}

export  default connect(({ message }) => ({ message }))(Message);