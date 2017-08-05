import React from 'react';
import {connect} from 'react-redux';
import Router from 'next/router';
import {Icon} from 'antd';
import LoginForm from '../components/loginForm';
import {doLogin} from '../actions/login';
import RandomUtil from '../../../utils/RandomUtil';
import config from '../../../config/config.json';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid:null,
      vcodeUri:null,
    }
    this.vode=this.vode.bind(this);
  }

  componentDidMount(){
    this.vode();
  }

  //生成验证码
  vode(){
    let uuid=RandomUtil.uuid(16,16);
    let vcodeUri= config.vcodeUri+uuid;
    this.setState({
      uuid,
      vcodeUri,
      keyID: uuid,
    })
  }

  render() {
    const {dispatch, auth} = this.props;
    const that=this;
    //登录配置信息
    let formConfig = {
      //是否加载中
      pending: auth.pending,
      keyID: this.state.keyID,
      vcodeUri: this.state.vcodeUri,
      //验证码图片修改
      onChangeVcode(){
          that.vode();
      },
      //登录
      onLogin (data) {
        dispatch(doLogin(data));
      }
    }
    return (
      <div style={{width: '100%', height: '100%'}} className="login-page">
        <div className="header">
          <img src="/static/images/logo.png" alt="" className="logo" />
          <div className="hotNum">
            <Icon type="phone" />
            &nbsp;
            <span>服务热线:&nbsp;</span>
            <span>400-160-5001</span>
          </div>
        </div>
        <div className="content">
          <img src="/static/images/login-bg.jpg" alt="" style={{width: '100%', height: '100%'}} />
          <div className="login">
            <div className="text">渠道管理平台</div>
            <LoginForm {...formConfig} />

          </div>
          <div className="footer">
            Copyright &copy; 2017北京亿联通付科技有限公司
          </div>
        </div>
      </div>
    )
  }
}

const mapStatetoProps = ({auth}) => ({auth});

export default connect(mapStatetoProps)(Login);
