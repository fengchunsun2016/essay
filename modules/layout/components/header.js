import React from 'react';
import {Layout, Badge, Row, Col, Icon, Dropdown, Menu} from 'antd';

const {Header} = Layout;
const styles = {
  header:{
    background:'#fff',
    padding:0,
    textAlign:'center',
    fontSize:18
  },
  menuText:{
    marginLeft:10,
    color:'#000'

  },
  personalIcon:{
    fontSize:14,
    marginRight:5
  }
}

/***
 * header
 * @returns {React Component}
 */

export default  ({headerNews: {orderNews, messageNews}, username = '', workOrderOnClick, messageOnClick, personalOnclick}) =>{

  const menu = (
    <Menu onClick={personalOnclick} >
      <Menu.Item key="1" >
        <Icon type="user" style={styles.personalIcon} /> 基本信息
      </Menu.Item>
      <Menu.Item key="2" >
        <Icon type="setting" style={styles.personalIcon} /> 修改密码
      </Menu.Item>
      <Menu.Item key="3" >
        <Icon type="logout" style={styles.personalIcon} />退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Header style={styles.header} >
        <Row type="flex" justify="end" >
          <Col span={2} >
            <a role="button" onClick={workOrderOnClick} style={{marginLeft:10}} >
              <Badge dot={orderNews} >
                <Icon type="question-circle" />
                <span style={styles.menuText} >
                   工单
                </span>
              </Badge>

            </a>
          </Col>
          <Col span={2} >
            <a role="button" onClick={messageOnClick} style={{marginLeft:10}} >
              <Badge dot={messageNews} >
                <Icon type="message" />
                <span style={styles.menuText} >
                  消息
                </span>
              </Badge>

            </a>
          </Col>
          <Col span={8} >
            <Dropdown overlay={menu} placement="bottomRight" >
              <a className="ant-dropdown-link" >
                {username} <Icon type="down" />
              </a>
            </Dropdown>
          </Col>
        </Row>
      </Header>
    </div>
  )

}
