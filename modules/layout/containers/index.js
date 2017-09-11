import React from 'react';
import router from 'next/router';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import Head from 'next/head';
import Menu from '../components/menu';
import SubHeader from  '../components/header';
import { signOut } from '../actions';
import { getHeaderNews } from '../../../services/headerNews';

const { Sider, Content, Footer } = Layout;

/***
 * 布局界面
 */

class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.loadNews = this.loadNews.bind(this);
    this.clearInterval = this.clearInterval.bind(this);
  }

  componentDidMount() {
    this.loadNews();
    window.addEventListener('beforeunload', this.clearInterval);
    this.interval = setInterval(this.loadNews, 30000);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.clearInterval);
    clearInterval(this.interval);
  }

  clearInterval() {
    clearInterval(this.interval);
  }

  async loadNews() {
    const { dispatch, passwordChanging } = this.props;
    if (!passwordChanging) {
      const res = await getHeaderNews();
      const { data } = res;
      if (data) {
        dispatch({ type : 'HEADER_NEWS_SUCCESS', data : data.data });
      }
    }
  }

  render() {
    let { props }=this;
    let { menu, auth, headerNews, dispatch } = props;
    //菜单参数
    const menuProps = {
      url : props.url,
      menus : menu.menus,
    }
    const headerProps = {
      username : auth.user.username,
      pathname : this.props.url.pathname,
      headerNews,
      //消息地址
      messagePath : 'message',
      workOrderOnClick(){
        const pathname = '/work-order'
        if (props.url.pathname == pathname) {
          return;
        }
        router.push(pathname)
      },
      messageOnClick(){
        const pathname = '/message'

        if (props.url.pathname == pathname) {
          return;
        }

        router.push(pathname)
      },
      personalOnclick:async (item)=>{
        if (item.key == 1) {
          //基本资料
          router.push('/channel/basic')
        } else if (item.key == 2) {
          //修改密码
          router.push('/channel/change')
        } else if (item.key == 3) {
          //退出登录
          await dispatch(signOut());
          //跳转到登录页面
          await router.push('/');
          if(!this.props.isServer){
            window.location.reload();
          }
        }
      },
    }

    return (
      <div>
        <Layout style={{ height : '100vh' }}>
          <Head>
            <link rel="stylesheet" href="/static/layout/index.css" />
          </Head>

          <Sider style={{ overflow : 'auto', width : '500px !important' }}>
            <div className="logo">
              <img src="/static/images/channel-logo.png" alt="" />
              <p className="text">渠道管理平台</p>
            </div>
            <Menu {...menuProps} />
          </Sider>

          <Layout>
            <SubHeader {...headerProps} />
            <Content style={{ margin : '10px 10px 0', overflow : 'initial' }}>
              {props.children}
            </Content>
            <Footer style={{ textAlign : 'center' }}>
              Copyright &copy; 2017北京亿联通付科技有限公司
            </Footer>
          </Layout>
        </Layout>
      </div>
    )
  }
}

const propsMapToState = ({ changeP: { changing }, auth, menu, headerNews }) => ({
  passwordChanging : changing,
  menu,
  headerNews,
  auth
})

export default connect(propsMapToState)(MainLayout);
