import React from 'react';
import Router from 'next/router';
import { Row, Col, Icon, Button } from 'antd';
import { connect } from 'react-redux';


const styles = {
  iconStyle : {
    color : '#65ccf7',
    marginRight : 8
  },
  itemName : {
    textAlign : 'right'
  }
}

class SubBasic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topIcon : true,
      centerIcon : true,
      bottomIcon : true,
    }
  }


  handleTopClick() {
    if (this.state.topIcon) {
      this.setState({
        topIcon : false
      })
    } else {
      this.setState({
        topIcon : true
      })
    }
  }

  handleCenterClick() {
    if (this.state.centerIcon) {
      this.setState({
        centerIcon : false
      })
    } else {
      this.setState({
        centerIcon : true
      })
    }
  }

  handleBottomClick() {
    if (this.state.bottomIcon) {
      this.setState({
        bottomIcon : false
      })
    } else {
      this.setState({
        bottomIcon : true
      })
    }
  }


  render() {
    const {
      detailData:
        { amount, createTime, isRefund, merName, merchantFee, mid, orderNo, payType, remark, serialNo, splitFee, status, succAmount }
    } = this.props.deal;

    return (

      <div className="main">
        <div className="top">
          <div className="title">
            <Icon
              style={styles.iconStyle}
              type={this.state.topIcon ? 'up-circle-o' : 'down-circle-o'}
              onClick={()=>this.handleTopClick()}
            />
            <span>基本信息</span>
          </div>
          {
            this.state.topIcon ? (<div className="content">
              <Row>
                <Col span={12}>
                  <Col span={10} style={styles.itemName}>
                    <span>商户订单号：</span>
                  </Col>

                  <span>{orderNo}</span>


                </Col>
                <Col span={10}>
                  <Col span={12} style={styles.itemName}>
                    <span>平台订单号：</span>
                  </Col>

                  <span>{serialNo}</span>
                </Col>

                <Col span={12}>
                  <Col span={10} style={styles.itemName}>
                    <span>支付状态：</span>
                  </Col>

                  <span>{status}</span>
                </Col>
                <Col span={10}>
                  <Col span={12} style={styles.itemName}>
                    <span>交易时间：</span>
                  </Col>

                  <span>{createTime}</span>
                </Col>
              </Row>
            </div>) : ''
          }


        </div>

        <div className="center">
          <div className="title">
            <Icon
              style={styles.iconStyle}
              type={this.state.centerIcon ? 'up-circle-o' : 'down-circle-o'}
              onClick={()=>this.handleCenterClick('centerCon')}
            />
            <span>商户信息</span>
          </div>
          {
            this.state.centerIcon ? ( <div className="content">
              <Row>
                <Col span={8} offset={1}>
                  <Col span={12} style={styles.itemName}>
                    <span>商户号：</span>
                  </Col>

                  <span>{mid}</span>
                </Col>
                <Col span={8}>
                  <Col span={12} style={styles.itemName}>
                    <span>商户名称：</span>
                  </Col>

                  <span>{merName}</span>
                </Col>

                <Col span={8} offset={1}>
                  <Col span={12} style={styles.itemName}>
                    <span>是否退款：</span>
                  </Col>

                  <span>{isRefund == 'N' ? '否' : '是'}</span>
                </Col>
                <Col span={8}>
                  <Col span={12} style={styles.itemName}>
                    <span>交易金额（元）：</span>
                  </Col>

                  <span>{amount}</span>
                </Col>
                <Col span={7}>
                  <Col span={12} style={styles.itemName}>
                    <span>支付种类：</span>
                  </Col>

                  <span>{payType}</span>
                </Col>

                <Col span={8} offset={1}>
                  <Col span={12} style={styles.itemName}>
                    <span>商户手续费（元）：</span>
                  </Col>

                  <span>{merchantFee}</span>
                </Col>
                <Col span={8}>
                  <Col span={12} style={styles.itemName}>
                    <span>分润（元）：</span>
                  </Col>

                  <span>{splitFee ? splitFee : '0'}</span>
                </Col>
                <Col span={7}>
                  <Col span={12} style={styles.itemName}>
                    <span>成功金额（元）：</span>
                  </Col>

                  <span>{succAmount}</span>
                </Col>
              </Row>
            </div>) : ''
          }


        </div>

        <div className="bottom">
          <div className="title">
            <Icon
              style={styles.iconStyle}
              type={this.state.bottomIcon ? 'up-circle-o' : 'down-circle-o'}
              onClick={()=>this.handleBottomClick('bottomCon')}
            />
            <span>其他信息</span>
          </div>
          {
            this.state.bottomIcon ? (<div className="content">
              <Row>
                <Col span={3} style={{ textAlign : 'right' }}>
                  备注：
                </Col>
                <Col>
                  {remark}
                </Col>
              </Row>
            </div>) : ''
          }


        </div>
        <div className="back content">
          <Row type="flex" justify="center">
            <Button type="primary" onClick={()=>Router.back()}>返回</Button>
          </Row>

        </div>
        <style jsx>{`
                    .main{
                        padding: 0 10px;
                        width:100%;
                        font-size:14px;
                        background:#fff;
                        color:#000;
                        line-height:60px;
                    }
                    .main .title{
                        border-bottom:1px solid #ccc;
                        font-size:16px;
                    }
                    .content{
                        padding:20px 0;
                    }

                `}</style>
      </div>
    )
  }


}
const propsMapToState = ({ deal }) => ({ deal });

export default connect(propsMapToState)(SubBasic);









