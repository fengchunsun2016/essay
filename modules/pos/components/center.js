import React from 'react';
import {Row, Col, Icon} from 'antd';



export default ({amountCount = 0, merFeeCount = 0})=>{

  return (
    <div>
      <Row style={{fontSize:16}}>
        <Col span={2}>
          <Icon type="appstore-o" style={{color:'#ffb319',marginRight:5}} />
          <span style={{fontWeight:700}}>总计</span>

        </Col>
        <Col span={6}>
          <span>交易总金额：</span>
          <span>{amountCount}元</span>
        </Col>
        <Col span={6}>
          <span>商户总手续费：</span>
          <span>{merFeeCount}元</span>
        </Col>

      </Row>
    </div>
  )

}

