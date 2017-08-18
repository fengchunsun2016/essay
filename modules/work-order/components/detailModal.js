import React from 'react';
import {Modal, Button, Row, Col} from 'antd';

const styles = {
  all:{
    padding:'20px 0',
    fontSize:'14px',
    overflowWrap: 'break-word',
  },
  name:{
    fontWeight:700
  }

}

export default ({visible, detailData, handleOk, handleCancel})=>{

  return (
    <div>
      <Modal
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        footer={[
          <Button key="back" size="large" onClick={handleCancel} >关闭</Button>,

        ]}
      >

        <Row>
          <div style={styles.all} >
            <Col span={4} style={styles.name} >
              标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题：
            </Col>
            <Col span={20} >
              {detailData.issueTitle}
            </Col>
          </div>

          <div style={styles.all} >
            <Col span={4} style={styles.name} >
              问题描述：
            </Col>
            <Col span={20} >
              {detailData.detail}
            </Col>
          </div>

          <div style={styles.all} >
            <Col span={20} offset={4} style={{marginTop:'30px'}} >
              处理时间：{detailData.processTime}
            </Col>
          </div>

          <div style={styles.all} >
            <Col span={4} style={styles.name} >
              处理结果：
            </Col>
            <Col span={20} >
              {detailData.processResult}
            </Col>
          </div>

        </Row>

      </Modal>
    </div>
  )

}



