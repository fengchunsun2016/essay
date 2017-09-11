import React from 'react';
import {Table} from 'antd';



export default ({pending, list = [], total = 0, onPageChange, onShowSizeChange, detailClick, rows = 10, page = 1}) =>{
  const columns = [{
    title:'序号',
    render:(text, item, index) => (
      index + 1
    )
  }, {
    title:'商户号',
    dataIndex:'mid',
  }, {
    title:'商户名称',
    dataIndex:'merName',
  }, {
    title:'终端编号',
    dataIndex:'termCode',
  }, {
    title:'SN号',
    dataIndex:'physicalId',
  }, {
    title:'状态',
    dataIndex:'status',
  }, {
    title:'绑定日期',
    dataIndex:'bindDate',
  }, {
    title:'操作',
    dataIndex:'remark',
    render:(text,item)=>(
      <span style={{color:'#118eea',cursor:'pointer'}} onClick={()=>detailClick(item.id)}>详情</span>
    )

  }];


  //分页配置参数
  const pagConfig = {
    total,
    showTotal:total => `共 ${total} 条`,
    current:page,
    pageSize:rows,
    showSizeChanger:true,
    pageSizeOptions:['10', '20', '50'],
    onShowSizeChange(current, pageSize){
      onShowSizeChange(current, pageSize)
    },
    onChange(page, pageSize){
      onPageChange(page, pageSize)
    }
  }

  return (

    <Table
      size="middle"
      loading={pending}
      columns={columns}
      dataSource={list}
      pagination={pagConfig}
      rowKey="id"
    />

  )
}