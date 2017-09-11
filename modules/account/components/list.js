/**
 * @file channel/modules/account/components/list.js
 * @author Mantak <mantak.cn@gmail.com>
 * Date: 2017-08-08
 * Last Modified Date: 2017-08-08
 * Last Modified By: Mantak <mantak.cn@gmail.com>
 */

import React from 'react';
import {Table} from 'antd';


/***
 *
 * @param total
 * @param currentPage 当前页
 * @param list  数据列表
 * @param onPageChange 页数更改
 * @param merchantStatus 商户状态
 * @returns {}
 */
export default ({page = 1, rows = 10, clientWidth, loading, total = 0, list = [], onPageChange, onPerPageChange}) => {
  const columns = [{
    title: '序号',
    dataIndex: 'id',
    render: (text, item, index) => (
      index + 1
    )
  }, {
    title: '交易号',
    dataIndex: 'transNo',
  }, {
    title: '商户号',
    dataIndex: 'mid',
  }, {
    title: '商户名称',
    dataIndex: 'merName',
  }, {
    title: '账户类型',
    dataIndex: 'accType',
  }, {
    title: '来源订单号',
    dataIndex: 'transSerialNo',
  },{
    title: '交易类型',
    dataIndex: 'transType',
  }, {
    title: '发生额（元）',
    className:'column-amount',
    dataIndex: 'amount',
    render: (text) => {
      if(text){
        return (
          <p>
            {text.toFixed(2)}
          </p>
        )
      }

    }
  }, {
    title: '余额（元）',
    className:'column-avlBalance',
    dataIndex: 'avlBalance',
    render: (text) => {
      if(text){
        return (
          <p>
            {text.toFixed(2)}
          </p>
        )
      }

    }
  }, {
    title: '发生额类型',
    dataIndex: 'amountType',
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
  }, {
    title: '备注',
    dataIndex: 'remark',
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
      onPerPageChange(current, pageSize)
    },
    onChange(page, pageSize){
      onPageChange(page, pageSize)
    }
  }
  return (
    <Table
      size="middle"
      loading={loading}
      columns={columns}
      dataSource={list}
      pagination={pagConfig}
      rowKey="transNo"
      style={{whiteSpace : 'nowrap'}}
      scroll={clientWidth&&clientWidth<1500?{x:1300}:{x:'100%'}}
    />
  )
}
