/**
 * Created by lihejia on 2017/7/25.
 */
import React from 'react';
import {Row,Col,Card} from 'antd';

const styles={
   padding:{
     margin: '0 4px'
   }
}

//统计总计
export default ({titleFeeSum=0,titlePayCount=0,titlePaySum=0})=>{
  return (

    <Row>
      <Col span={8}>
        <Card style={styles.padding}>
          {titleFeeSum}元
          <span>分润金额</span>
        </Card>
      </Col>
      <Col span={8}>
        <Card style={styles.padding}>
          {titlePayCount}笔
          <span>交易笔数</span>
        </Card>
      </Col>
      <Col span={8}>
        <Card style={styles.padding}>
          {titlePaySum}元
          <span>交易总额</span>
        </Card>
      </Col>
    </Row>
  )
}