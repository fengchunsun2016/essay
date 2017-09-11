/**
 * Created by lihejia on 2017/7/25.
 */
import React from 'react';
import {Table, Card} from 'antd';


/***
 *
 * @param total
 * @param currentPage 当前页
 * @param list  数据列表
 * @param onPageChange 页数更改
 * @param payType 支付种类
 * @returns {}
 */
export default ({page = 1, rows = 10, pending, total = 0, list = [], onPageChange, onShowSizeChange}) => {

  const columns = [{
    title: '序号',
    dataIndex: 'id',
    render: (text, item, index) => (
      index + 1
    )
  }, {
    title: '商户号',
    dataIndex: 'mid',

  }, {
    title: '商户名称',
    dataIndex: 'merName',
  }, {
    title: '支付种类',
    dataIndex: 'payType',
  }, {
    title: '分润金额(元)',
    className:'column-feeSum',
    dataIndex: 'feeSum',
    render: (text) => {
      return (
        <p>
          {text.toFixed(2)}
        </p>
      )
    }
  }, {
    title: '交易笔数(笔)',
    className:'column-payCount',
    dataIndex: 'payCount',
  }, {
    title: '交易金额(元)',
    className:'column-paySum',
    dataIndex: 'paySum',
    render: (text) => {
      return (
        <p>
          {text.toFixed(2)}
        </p>
      )
    }
  }];


  //分页配置参数
  const pagConfig = {
    total,
    showTotal:total => `共 ${total} 条`,
    current: page,
    pageSize: rows,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50'],
    onShowSizeChange(current, pageSize){
      onShowSizeChange(current, pageSize)
    },
    onChange(page, pageSize){
      onPageChange(page, pageSize)
    }
  }

  return (
    <Card>
      <Table
        size="middle"
        loading={pending}
        columns={columns}
        dataSource={list}
        pagination={pagConfig}
        rowKey="rowNum"

      />
    </Card>

  )
}
