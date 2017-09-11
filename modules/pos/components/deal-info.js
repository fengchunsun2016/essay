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
export default ({ dealIcon, handleDealClick, detailData })=> {
  const {
    mid, merName, termCode, physicalId, tranKindName,
    voucherNo, referNo, statusName, cardNo, amount,
    merFee, createTime, isCorrect, isRevoke, isRefund
  } = detailData;
  return (
    <div className="dealInfo">
      <div className="title">
        <Icon
          style={styles.iconStyle}
          type={dealIcon ? 'up-circle-o' : 'down-circle-o'}
          onClick={()=>handleDealClick()} />
        <span>交易信息</span>
      </div>
      {
        dealIcon ? (<div className="content">
          <Row>
            <Col span={6}>
              <Col span={12} style={styles.itemName}>
                <span>商户号：</span>
              </Col>

              <span>{mid}</span>
            </Col>
            <Col span={6}>
              <Col span={12} style={styles.itemName}>
                <span>商户名称：</span>
              </Col>

              <span>{merName}</span>
            </Col>
            <Col span={6}>
              <Col span={12} style={styles.itemName}>
                <span>终端号：</span>
              </Col>

              <span>{termCode}</span>
            </Col>
            <Col span={6}>
              <Col span={12} style={styles.itemName}>
                <span>SN号：</span>
              </Col>

              <span>{physicalId}</span>
            </Col>

            <Col span={6}>
              <Col span={12} style={styles.itemName}>
                <span>交易类型：</span>
              </Col>

              <span>{tranKindName}</span>
            </Col>
            <Col span={6}>
              <Col span={12} style={styles.itemName}>
                <span>终端流水号：</span>
              </Col>

              <span>{voucherNo}</span>
            </Col>
            <Col span={6}>
              <Col span={12} style={styles.itemName}>
                <span>系统参考号：</span>
              </Col>

              <span>{referNo}</span>
            </Col>
            <Col span={6}>
              <Col span={12} style={styles.itemName}>
                <span>支付状态：</span>
              </Col>

              <span>{statusName}</span>
            </Col>

            <Col span={6}>
              <Col span={12} style={styles.itemName}>
                <span>卡号：</span>
              </Col>

              <span>{cardNo?(cardNo.substr(0,6)+'****'+cardNo.substr(cardNo.length-4,cardNo.length)):''}</span>
            </Col>
            <Col span={6}>
              <Col span={12} style={styles.itemName}>
                <span>交易金额(元)：</span>
              </Col>

              <span>{amount}</span>
            </Col>
            <Col span={6}>
              <Col span={12} style={styles.itemName}>
                <span>手续费(元)：</span>
              </Col>

              <span>{merFee}</span>
            </Col>
            <Col span={6} />



            <Col span={6}>
              <Col span={12} style={styles.itemName}>
                <span>创建时间：</span>
              </Col>

              <span>{createTime}</span>
            </Col>
            <Col span={6}>
              <Col span={12} style={styles.itemName}>
                <span>是否已冲正：</span>
              </Col>

              <span>{isCorrect}</span>
            </Col>
            <Col span={6}>
              <Col span={12} style={styles.itemName}>
                <span>是否已撤销：</span>
              </Col>

              <span>{isRevoke}</span>
            </Col>
            <Col span={6}>
              <Col span={12} style={styles.itemName}>
                <span>是否已退款：</span>
              </Col>

              <span>{isRefund=='Y'?'是':'否'}</span>
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
