import React from 'react';
import { connect } from 'react-redux';
import router from 'next/router';
import { Row, Col, Button, Icon } from 'antd';
import DealInfo from '../components/deal-info';
import MessageInfo from '../components/message-info';


const styles = {
  iconStyle : {
    color : '#65ccf7',
    marginRight : 8
  },
  itemName : {
    textAlign : 'right'
  }
}
class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dealIcon : true,
      messageIcon : true,
      originalIcon : true,
      reconciliationIcon : true,
      otherIcon : true,
      signIcon : true,
    }
    this.handleDealClick = this.handleDealClick.bind(this);
    this.handleMessageClick = this.handleMessageClick.bind(this);
  }

  handleSignClick() {
    if (this.state.signIcon) {
      this.setState({
        signIcon : false
      })
    } else {
      this.setState({
        signIcon : true
      })
    }
  }

  handleOtherClick() {
    if (this.state.otherIcon) {
      this.setState({
        otherIcon : false
      })
    } else {
      this.setState({
        otherIcon : true
      })
    }
  }

  handleReconciliationClick() {
    if (this.state.reconciliationIcon) {
      this.setState({
        reconciliationIcon : false
      })
    } else {
      this.setState({
        reconciliationIcon : true
      })
    }
  }

  handleDealClick() {
    if (this.state.dealIcon) {
      this.setState({
        dealIcon : false
      })
    } else {
      this.setState({
        dealIcon : true
      })
    }
  }

  handleMessageClick() {
    if (this.state.messageIcon) {
      this.setState({
        messageIcon : false
      })
    } else {
      this.setState({
        messageIcon : true
      })
    }
  }

  handleOriginalClick() {
    if (this.state.originalIcon) {
      this.setState({
        originalIcon : false
      })
    } else {
      this.setState({
        originalIcon : true
      })
    }
  }

  render() {
    const {
      detailData,
      detailData:{
        oldVoucherNo, oldReferNo, oldBatchNo, checkTime, checkStatus,
        signStatus, signPath, remark, isSign
      }
    } = this.props.pos;

    const dealProps = {
      dealIcon : this.state.dealIcon,
      detailData,
      handleDealClick : this.handleDealClick,
    }
    const messageProps = {
      messageIcon : this.state.messageIcon,
      detailData,
      handleMessageClick : this.handleMessageClick,
    }
    return (
      <div className="main">
        <DealInfo {...dealProps} />

        <MessageInfo {...messageProps} />

        <div className="original">
          <div className="title">
            <Icon
              style={styles.iconStyle}
              type={this.state.originalIcon ? 'up-circle-o' : 'down-circle-o'}
              onClick={()=>this.handleOriginalClick()}
            />
            <span>原交易信息</span>
          </div>
          {
            this.state.originalIcon ? (<div className="content">
              <Row>
                <Col span={6}>
                  <Col span={12} style={styles.itemName}>
                    <span>原终端流水号：</span>
                  </Col>

                  <span>{oldVoucherNo}</span>
                </Col>
                <Col span={6}>
                  <Col span={12} style={styles.itemName}>
                    <span>原系统参考号：</span>
                  </Col>

                  <span>{oldReferNo}</span>
                </Col>
                <Col span={6}>
                  <Col span={12} style={styles.itemName}>
                    <span>原批次号：</span>
                  </Col>

                  <span>{oldBatchNo}</span>
                </Col>
              </Row>
            </div>) : ''
          }


        </div>

        <div className="reconciliationInfo">
          <div className="title">
            <Icon
              style={styles.iconStyle}
              type={this.state.reconciliationIcon ? 'up-circle-o' : 'down-circle-o'}
              onClick={()=>this.handleReconciliationClick()}
            />
            <span>对账信息</span>
          </div>
          {
            this.state.reconciliationIcon ? (<div className="content">
              <Row>
                <Col span={6}>
                  <Col span={12} style={styles.itemName}>
                    <span>对账时间：</span>
                  </Col>

                  <span>{checkTime}</span>
                </Col>
                <Col span={6}>
                  <Col span={12} style={styles.itemName}>
                    <span>对账结果：</span>
                  </Col>

                  <span>{checkStatus}</span>
                </Col>
              </Row>
            </div>) : ''
          }


        </div>

        {
          isSign == 1 ? (<div className="signInfo">
            <div className="title">
              <Icon
                style={styles.iconStyle}
                type={this.state.signIcon ? 'up-circle-o' : 'down-circle-o'}
                onClick={()=>this.handleSignClick()}
              />
              <span>电子签名</span>
            </div>
            {
              this.state.signIcon ? (<div className="content">
                <Row>
                  <Col span={6}>
                    <Col span={12} style={styles.itemName}>
                      <span>电子签名状态：</span>
                    </Col>

                    <span>{signStatus}</span>
                  </Col>
                  <Col span={6}>
                    <Col span={12} style={styles.itemName}>
                      <span>电子签名：</span>
                    </Col>

                    {
                      signPath ? <img src={signPath} alt="" style={{ width : '100px', height : '40px' }} /> : ''
                    }

                  </Col>
                </Row>
              </div>) : ''
            }


          </div>) : ''

        }

        <div className="otherInfo">
          <div className="title">
            <Icon
              style={styles.iconStyle}
              type={this.state.otherIcon ? 'up-circle-o' : 'down-circle-o'}
              onClick={()=>this.handleOtherClick()}
            />
            <span>其他信息</span>
          </div>
          {
            this.state.otherIcon ? (<div className="content">
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
            <Button type="primary" onClick={()=>router.back()}>返回</Button>
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
export default connect(({ pos })=>({ pos }))(Detail)







