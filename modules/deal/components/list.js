import React from 'react';
import {Table} from 'antd';



export default ({pending, onRowClick, list = [], total = 0, onPageChange, onShowSizeChange, rows = 10, page = 1}) =>{
  const columns = [{
    title:'序号',
    dataIndex:'id',

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
    title:'支付种类',
    dataIndex:'payType',
  }, {
    title:'交易金额（元）',
    dataIndex:'amount',
  }, {
    title:'商户手续费（元）',
    dataIndex:'merchantFee',
  }, {
    title:'分润（元）',
    dataIndex:'orgMerFee',
  }, {
    title:'状态',
    dataIndex:'status',
  }, {
    title:'商户订单号',
    dataIndex:'orderNo',
  }, {
    title:'平台订单号',
    dataIndex:'serialNo',
  }, {
    title:'交易时间',
    dataIndex:'createTime',
  }, {
    title:'操作',
    dataIndex:'11',
    render:(text, item ) => (
      <span style={{color:'blue'}} onClick={()=>onRowClick(item.orderNo)}>详情</span>
    )
  }];


  //分页配置参数
  const pagConfig = {
    total,
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
      rowKey="mid"
    />


  )
}