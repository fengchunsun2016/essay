import React from 'react';
import {Row, Col, Icon } from 'antd';

import CompareBills from './compare-bills';



export default ({amountTitle = 0, arrivalAmountTitle = 0, merFeeTitle = 0, onExportBills})=>{

  return (
    <div>
      <Row style={{fontSize:16}}>
        <Col span={2}>
          <Icon type="appstore-o" style={{color:'#ffb319',marginRight:5}} />
          <span style={{fontWeight:700}}>总计</span>

        </Col>
        <Col span={4}>
          <span>结算金额：</span>
          <span>{amountTitle}元</span>
        </Col>
        <Col span={4}>
          <span>到账金额：</span>
          <span>{arrivalAmountTitle}元</span>
        </Col>
        <Col span={4}>
          <span>手续费：</span>
          <span>{merFeeTitle}元</span>
        </Col>
        <CompareBills onExportBills={onExportBills} />
      </Row>
    </div>
  )

}

