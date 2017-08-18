import React from 'react';
import {Table} from 'antd';



export default ({pending, list = [], total = 0, onPageChange, onShowSizeChange, rows = 10, page = 1}) =>{
  const columns = [{
    title:'序号',
    dataIndex:'id',

    render:(text, item, index) => (
      index + 1
    )
  }, {
    title:'结算订单号',
    dataIndex:'serialNo',
  }, {
    title:'结算金额（元）',
    className:'column-amount',
    dataIndex:'amount',
    render: (text) => {
      return (
        <p>
          {text.toFixed(2)}
        </p>
      )
    }
  }, {
    title:'到账金额（元）',
    className:'column-arrivalAmount',
    dataIndex:'arrivalAmount',
    render: (text) => {
      return (
        <p>
          {text.toFixed(2)}
        </p>
      )
    }
  }, {
    title:'手续费（元）',
    className:'column-merFee',
    dataIndex:'merFee',
    render: (text) => {
      return (
        <p>
          {text.toFixed(2)}
        </p>
      )
    }
  }, {
    title:'结算申请时间',
    dataIndex:'applyTime',
  }, {
    title:'结算时间',
    dataIndex:'dealDoneDate',
  }, {
    title:'状态',
    dataIndex:'status',
  }, {
    title:'备注',
    dataIndex:'remark',
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
      rowKey="serialNo"
    />


  )
}