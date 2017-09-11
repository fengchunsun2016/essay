import React from 'react';
import {Table,Card} from 'antd';

const columns = [{
  title: '序号',
  dataIndex: 'id',
  width:'10%',
  render: (text, item, index) => (
    index + 1
  )
}, {
  title: '标题',
  dataIndex: 'title',
  width: '75%',
  render: (text, item) => {
    return (
      <p>
        {text}
        <span className={item.haveRead==0 ? 'hasRead' : ''} />
      </p>
    )
  }

}, {
  title: '发布时间',
  dataIndex: 'applyDate',
}];


export default ({pending, onRowClick, list = [], total = 0, onPageChange, rows = 10, page = 1}) => {

  //分页配置参数
  const pagConfig = {
    total,
    showTotal:total => `共 ${total} 条`,
    current: page,
    pageSize: rows,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50'],
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
        rowKey="id"
        onRowClick={onRowClick}
      />
      <style global jsx>
        {`
         .hasRead {
           display:inline-block;
           margin-left:10px;
           vertical-align:top;
           width:28px;
           height:14px;
           background:url("/static/images/new.png") no-repeat;
           background-size:100% 100%;
          }
         `}
      </style>
    </Card>
  )
}