/**
 * Created by lihejia on 2017/7/25.
 */
import React from 'react';
import {Table} from 'antd';


/***
 *
 * @param total
 * @param currentPage 当前页
 * @param list  数据列表
 * @param onPageChange 页数更改
 * @param payType 支付种类
 * @returns {}
 */
export default ({page = 1, rows = 10, payType = [], pending, total = 0, list = [], onPageChange, onShowSizeChange}) => {

  const columns = [{
    title: '序号',
    dataIndex: 'id',
    width: '5%',
    render: (text, item, index) => (
      index + 1
    )
  }, {
    title: '商户号',
    dataIndex: 'mid',
    width: '15%',
    render: (text, item) => {
      return (
        <p>
          {text}
          <span className={item.status ? 'hasRead' : ''} />
        </p>
      )
    }

  }, {
    title: '商户名称',
    dataIndex: 'merName',
    width: '20%',
  }, {
    title: '支付种类',
    width: '10%',
    dataIndex: 'payType',
    render: (text) => {
      let resultText=text;
      //获取获取支付种类对应中文名称
      payType.map((tem) => {
        if(tem.id==text){
          resultText=tem.name;
          return;
        }
      })


      return resultText;
    }

  }, {
    title: '分润金额(元)',
    width: '10%',
    dataIndex: 'feeSum',
  }, {
    title: '交易笔数(笔)',
    width: '10%',
    dataIndex: 'payCount',
  }, {
    title: '交易金额(元)',
    dataIndex: 'paySum',
  }];


  //分页配置参数
  const pagConfig = {
    total,
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