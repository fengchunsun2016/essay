import React from 'react';
import { Icon, Row, Col } from 'antd';

const styles = {
  iconStyle : {
    color : '#65ccf7',
    marginRight : 8
  },
  itemName : {
    textAlign : 'right'
  }
}

export default ({ messageIcon, detailData, handleMessageClick })=> {
  const {
    mti, tranType, cardExpDate, posInputType, cardSeqNo,
    posCondCode, currencyType, tranCode, rspCode, authNo,
    batchNo
  } = detailData;
  return (
    <div className="messageInfo">
      <div className="title">
        <Icon
          style={styles.iconStyle}
          type={messageIcon ? 'up-circle-o' : 'down-circle-o'}
          onClick={()=>handleMessageClick()}
        />
        <span>报文信息</span>
      </div>
      {
        messageIcon ? ( <div className="content">
          <Row>
            <Col span={6}>
              <Col span={12} style={styles.itemName}>
                <span>消息类型：</span>
              </Col>

              <span>{mti}</span>
            </Col>
            <Col span={6}>
              <Col span={12} style={styles.itemName}>
                <span>交易处理码：</span>
              </Col>

              <span>{tranType}</span>
            </Col>
            <Col span={6}>
              <Col span={12} style={styles.itemName}>
                <span>卡有效期：</span>
              </Col>

              <span>{cardExpDate}</span>
            </Col>
            <Col span={6}>
              <Col span={12} style={styles.itemName}>
                <span>服务点输入方式码：</span>
              </Col>

              <span>{posInputType}</span>
            </Col>

            <Col span={6}>
              <Col span={12} style={styles.itemName}>
                <span>卡片序列号：</span>
              </Col>

              <span>{cardSeqNo}</span>
            </Col>
            <Col span={6}>
              <Col span={12} style={styles.itemName}>
                <span>服务点条件码：</span>
              </Col>

              <span>{posCondCode}</span>
            </Col>
            <Col span={6}>
              <Col span={12} style={styles.itemName}>
                <span>货币类型：</span>
              </Col>

              <span>{currencyType}</span>
            </Col>
            <Col span={6}>
              <Col span={12} style={styles.itemName}>
                <span>交易类型码：</span>
              </Col>

              <span>{tranCode}</span>
            </Col>

            <Col span={6}>
              <Col span={12} style={styles.itemName}>
                <span>应答码：</span>
              </Col>

              <span>{rspCode}</span>
            </Col>
            <Col span={6}>
              <Col span={12} style={styles.itemName}>
                <span>授权码：</span>
              </Col>

              <span>{authNo}</span>
            </Col>
            <Col span={6}>
              <Col span={12} style={styles.itemName}>
                <span>批次号：</span>
              </Col>

              <span>{batchNo}</span>
            </Col>
          </Row>
        </div>) : ''
      }

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
