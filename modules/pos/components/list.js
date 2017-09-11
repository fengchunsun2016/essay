import React from 'react';
import { Table } from 'antd';


export default ({ pending, list = [], total = 0, onPageChange, onShowSizeChange, detailClick, rows = 10, page = 1, clientWidth }) => {
  const columns = [{
    title : '序号',
    render : (text, item, index) => (
      index + 1
    )
  }, {
    title : '商户号',
    dataIndex : 'mid',
  }, {
    title : '商户名称',
    dataIndex : 'merName',

  }, {
    title : '终端号',
    dataIndex : 'termCode',

  }, {
    title : '交易金额（元）',
    className : 'column-amount',
    dataIndex : 'amount',
    render : (text)=> {
      if (text) {
        return (
          <span>{text.toFixed(2)}</span>
        )
      }

    }
  }, {
    title : '商户手续费（元）',
    className : 'column-merFee',
    dataIndex : 'merFee',
    render : (text)=> {
      if (text) {
        return (
          <span>{text.toFixed(2)}</span>
        )
      }

    }

  }, {
    title : '交易类型',
    dataIndex : 'tranKindName',
  }, {
    title : '支付状态',
    dataIndex : 'status',
  }, {
    title : '冲正',
    dataIndex : 'isCorrect',
  }, {
    title : '撤销',
    dataIndex : 'isRevoke',
  }, {
    title : '卡类型',
    dataIndex : 'cardType',
  }, {
    title : '卡号',
    dataIndex : 'cardNo',
    render : (text)=> {
      if (text) {
        return (
          <span>{text.substr(0, 6) + '****' + text.substr(text.length-4,text.length)}</span>
        )
      }

    }
  }, {
    title : '终端流水号',
    dataIndex : 'voucherNo',
  }, {
    title : '系统参考号',
    dataIndex : 'referNo',
  }, {
    title : '终端批次号',
    dataIndex : 'batchNo',
  }, {
    title : '电子签名',
    dataIndex : 'isSign',
    render : (text)=> {
      return text == 1 ? '有' : '无'
    }
  }, {
    title : '创建时间',
    dataIndex : 'createTime',
  }, {
    title : '操作',
    render : (text, item)=>(
      <span style={{ color : '#118eea', cursor : 'pointer' }} onClick={()=>detailClick(item.id)}>详情</span>
    )
  }];


  //分页配置参数
  const pagConfig = {
    total,
    showTotal : total => `共 ${total} 条`,
    current : page,
    pageSize : rows,
    showSizeChanger : true,
    pageSizeOptions : ['10', '20', '50'],
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
      style={{ whiteSpace : 'nowrap' }}
      scroll={clientWidth && clientWidth < 1500 ? { x : 1300 } : { x : '100%' }}
    />


  )
}