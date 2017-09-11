import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Button, Card} from 'antd';
import router from 'next/router';



const styles = {
  name:{
    textAlign:'right'
  },
  button:{
    marginTop:40
  },
  text:{
    lineHeight:'50px',
    fontSize:14
  }
}
class Detail extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const {detailData:{
      mid,
      merName,
      termCode,
      batchNo,
      physicalId,
      simNo,
      posFactoryName,
      posModelName,
      posType,
      isBindName,
      bindDate,
      managerKey,
      isFault,
      isLost
    }} = this.props.terminal;
    return(
      <Card>
        <Row style={styles.text}>
          <Col span={8}>
            <Col span={12} style={styles.name}>
              商户号：
            </Col>
            <Col span={12}>
              {mid}
            </Col>
          </Col>
          <Col span={16}>
            <Col span={6} style={styles.name}>
              商户名称：
            </Col>
            <Col span={6}>
              {merName}
            </Col>
          </Col>

          <Col span={8}>
            <Col span={12} style={styles.name}>
              终端编号：
            </Col>
            <Col span={12}>
              {termCode}
            </Col>
          </Col>
          <Col span={8}>
            <Col span={12} style={styles.name}>
              批次号：
            </Col>
            <Col span={12}>
              {batchNo}
            </Col>
          </Col>
          <Col span={8}>
            <Col span={12} style={styles.name}>
              SN号：
            </Col>
            <Col span={12}>
              {physicalId}
            </Col>
          </Col>
          <Col span={8}>
            <Col span={12} style={styles.name}>
              SIM号：
            </Col>
            <Col span={12}>
              {simNo}
            </Col>
          </Col>

          <Col span={8}>
            <Col span={12} style={styles.name}>
              生产厂商：
            </Col>
            <Col span={12}>
              {posFactoryName}
            </Col>
          </Col>
          <Col span={8}>
            <Col span={12} style={styles.name}>
              机具型号：
            </Col>
            <Col span={12}>
              {posModelName}
            </Col>
          </Col>
          <Col span={8}>
            <Col span={12} style={styles.name}>
              终端类型：
            </Col>
            <Col span={12}>
              {posType}
            </Col>
          </Col>

          <Col span={8}>
            <Col span={12} style={styles.name}>
              绑定状态：
            </Col>
            <Col span={12}>
              {isBindName}
            </Col>
          </Col>
          <Col span={8}>
            <Col span={12} style={styles.name}>
              绑定时间：
            </Col>
            <Col span={12}>
              {bindDate}
            </Col>
          </Col>
          <Col span={8}>
            <Col span={12} style={styles.name}>
              绑定主秘钥：
            </Col>
            <Col span={12}>
              {managerKey}
            </Col>
          </Col>

          <Col span={8}>
            <Col span={12} style={styles.name}>
              是否为故障机：
            </Col>
            <Col span={12}>
              {isFault}
            </Col>
          </Col>
          <Col span={8}>
            <Col span={12} style={styles.name}>
              是否已经丢失：
            </Col>
            <Col span={12}>
              {isLost}
            </Col>
          </Col>


        </Row>
        <Row type='flex' align='middle' justify='center' style={styles.button}>
          <Button onClick={()=>router.back()}>返回</Button>
        </Row>

      </Card>

    )
  }
}

export default connect(({terminal})=>({terminal}))(Detail)

