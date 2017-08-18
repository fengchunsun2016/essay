import React from 'react';
import {Col, Table} from 'antd';


const styles = {
  haveRead:{
    display:'inline-block',
    marginLeft:'10px',
    verticalAlign:'top',
    width:'28px',
    height:'14px',
    background:'url("/static/images/new.png") no-repeat',
    backgroundSize:'100% 100%',
  }
}

export  default class List extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible:false,
    }
  }

  render(){
    const {list,pending,handleClick} = this.props;
    const columns = [{
      title:'序号',
      dataIndex:'id',
      render:(text, item, index) =>{
        return (
          <p>
            {index + 1}
          </p>
        )
      }
    }, {
      title:'标题',
      dataIndex:'issueTitle',
      render:(text, item) =>{
        return (
          <p>
            {text}
            {
              item.status==2?(item.haveRead==2?'':<span style={styles.haveRead} />):''

            }

          </p>
        )
      }

    }, {
      title:'反馈时间',
      dataIndex:'feedbackTime',
    }, {
      title:'工单状态',
      dataIndex:'status',
      render:(text, item) =>{
        // console.log(item);
        return (
          <p>
            {item.status==2 ?
              (<span style={{color:'#48c545'}} >已解决</span>)
              : (<span style={{color:'#d8a12d'}} >待解决</span>)
               }
          </p>
        )
      }
    }];

    const tableConfig = {
      onRowClick:handleClick

    }
    return (
      <Col span={24} >
        {
          <Table
            size="default"
            loading={pending}
            columns={columns}
            dataSource={list}
            rowKey="feedbackNo"
            pagination={false}
            {...tableConfig}
          />

        }
        <style>{`
          table{
            font-size:14px;
            text-align:center;
          }
        `}</style>
      </Col>
    )
  }


}




