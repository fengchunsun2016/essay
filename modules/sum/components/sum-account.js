/**
 * Created by lihejia on 2017/7/25.
 */
import React from 'react';
import {Row, Col, Card} from 'antd';

const styles = {
  padding: {
    margin:'0 2px',
    textAlign: 'center'
  },
  num: {
    fontSize: 20,
    marginRight: 5
  },
  text: {
    fontSize: 12
  },
  img:{
    width:70,
    height:70
  }
}

//统计总计
export default ({titleFeeSum = 0, titlePayCount = 0, titlePaySum = 0})=> {
  return (

    <Row>

      <Col span={8}>
        <Card style={styles.padding}>

          <img src="/static/images/split-profit.png" alt="" style={styles.img} />

          <p>
            <span style={styles.num}>
              {titleFeeSum}
            </span>

            <span style={styles.text}>元</span>
          </p>

          <p style={styles.text}>分润金额</p>
        </Card>
      </Col>
      <Col span={8}>
        <Card style={styles.padding}>

          <img src="/static/images/deal-count.png" alt="" style={styles.img} />

          <p>
            <span style={styles.num}>
              {titlePayCount}
            </span>

            <span style={styles.text}>笔</span>
          </p>

          <p style={styles.text}>交易笔数</p>
        </Card>
      </Col>
      <Col span={8}>
        <Card style={styles.padding}>

          <img src="/static/images/deal-total.png" alt="" style={styles.img} />

          <p>
            <span style={styles.num}>
              {titlePaySum}
            </span>

            <span style={styles.text}>元</span>
          </p>

          <p style={styles.text}>交易总额</p>
        </Card>
      </Col>
    </Row>
  )
}