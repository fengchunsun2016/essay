import React from 'react';
import { Row, Col, Icon } from 'antd';
import CompareBills from './compare-bills';


export default ({ sumAmount = 0, sumMerchantFee = 0, splitFeeSum = 0, onExportBills })=> {


  return (
    <div>
      <Row style={{ fontSize : 16 }}>
        <Col span={2}>
          <Icon type="appstore-o" style={{ color : '#ffb319', marginRight : 5 }} />
          <span style={{ fontWeight : 700 }}>总计</span>

        </Col>
        <Col span={4}>
          <span>交易金额：</span>
          <span>{sumAmount}元</span>
        </Col>
        <Col span={4}>
          <span>商户手续费：</span>
          <span>{sumMerchantFee}元</span>
        </Col>
        <Col span={4}>
          <span>分润：</span>
          <span>{splitFeeSum}元</span>
        </Col>
        <CompareBills onExportBills={onExportBills} />
      </Row>
    </div>
  )


}

