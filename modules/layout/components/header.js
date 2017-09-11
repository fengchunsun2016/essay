import React from 'react';
import { Layout, Badge, Row, Col, Icon, Dropdown, Menu } from 'antd';

const { Header } = Layout;
const styles = {
  header : {
    background : '#fff',
    paddingRight : 40,
    // textAlign:'center',
    fontSize : 16
  },
  headItem : {
    margin : '0 20px'
  },
  menuText : {
    marginLeft : 6,
    color : '#000'
  },
  personalIcon : {
    fontSize : 14,
    marginRight : 5
  },
  local : {
    position : 'relative',
    top : 15,
    color : '#afb2b4',
    fontSize : 14
  }
}

/***
 * header
 * @returns {React Component}
 */

export default  ({
  headerNews: { orderNews, messageNews },
  pathname,
  username,
  workOrderOnClick,
  messageOnClick,
  personalOnclick
}) => {

  const menu = (
    <Menu onClick={personalOnclick}>
      <Menu.Item key="1">
        <Icon type="user" style={styles.personalIcon} /> 基本信息
      </Menu.Item>
      <Menu.Item key="2">
        <Icon type="setting" style={styles.personalIcon} /> 修改密码
      </Menu.Item>
      <Menu.Item key="3">
        <Icon type="logout" style={styles.personalIcon} />退出登录
      </Menu.Item>
    </Menu>
  );

  const local = (pathname)=> {
    switch (pathname) {
      case'/message':
        return '系统消息';
      case '/work-order':
        return '工单';
      case '/channel/change':
        return '修改密码';
      case '/channel/basic':
        return '基本信息';
      case '/deal/detail':
        return '交易流水/详情';
      case '/pos/detail':
        return 'POS交易查询/详情';
      case '/terminal/detail':
        return '终端管理/详情';
      default:
        return pathname;
    }
  }

  return (
    <div>
      <Header style={styles.header}>
        <Row>
          <Col span={10}>
            {
              pathname == '/pos/detail' ||
              pathname == '/terminal/detail' ||
              pathname == '/message' ||
              pathname == '/work-order' ||
              pathname == '/channel/change' ||
              pathname == '/channel/basic' ||
              pathname == '/deal/detail' ?
                (<span style={styles.local}><Icon type="environment-o" style={{ color : '#06a2ea' }} />当前位置：{local(pathname)}</span>) : ''
            }
          </Col>
          <Col span={14}>
            <Row type="flex" justify="end">
              <Col style={styles.headItem}>
                <a role="button" onClick={workOrderOnClick} style={{ marginLeft : 10 }}>
                  <Badge dot={orderNews}>
                    <Icon type="question-circle" />
                    <span style={styles.menuText}>
                      工单
                    </span>
                  </Badge>
                </a>
              </Col>
              <Col style={styles.headItem}>
                <a role="button" onClick={messageOnClick} style={{ marginLeft : 10 }}>
                  <Badge dot={messageNews}>
                    <Icon type="message" />
                    <span style={styles.menuText}>
                  消息
                </span>
                  </Badge>

                </a>
              </Col>
              <Col style={styles.headItem}>
                <Dropdown overlay={menu} placement="bottomLeft">

                  <a className="ant-dropdown-link" style={{...styles.menuText,fontSize:16}}>
                    {username} <Icon type="down" />
                  </a>
                </Dropdown>
              </Col>
            </Row>
          </Col>
        </Row>

      </Header>
    </div>
  )
}
