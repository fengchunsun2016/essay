import React from 'react';
import {Row, Col, Icon} from 'antd';
import {connect} from 'react-redux';
import {basicLoadAction} from '../actions';


class SubBasic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topIcon: true,
      centerIcon: true,
      bottomIcon: true,
    }
  }

  componentDidMount() {
    const {dispatch,basic:{rateData}} = this.props;
    if(!rateData){
      dispatch(basicLoadAction());
    }

  }

  handleTopClick(){
    if(this.state.topIcon){
      this.setState({
        topIcon:false
      })
    }else {
      this.setState({
        topIcon:true
      })
    }
  }

  handleCenterClick(){
    if(this.state.centerIcon){
      this.setState({
        centerIcon:false
      })
    }else {
      this.setState({
        centerIcon:true
      })
    }
  }

  handleBottomClick(){
    if(this.state.bottomIcon){
      this.setState({
        bottomIcon:false
      })
    }else {
      this.setState({
        bottomIcon:true
      })
    }
  }


  render() {
    const {balance, basicData, settleData, rateData} = this.props.basic;
    // console.log(balance, basicData, settleData, rateData, '///////////////')
    return (

      <div className="main">
        <div className="balance">
          <span className="title">账户余额:</span>
          <span className="icon">￥</span>
          <span className="num">{balance}</span>
        </div>
        <div className="top">
          <div className="title">
            <Icon type={this.state.topIcon ? 'up' : 'down'} onClick={()=>this.handleTopClick()} />
            <span>基本信息</span>
          </div>
          {
            this.state.topIcon?( <div className="content">

              <Row>
                <Col span={8}>
                  <div className="">
                    <Col span={6}>
                      <span className="name">商户号：</span>
                    </Col>
                    <Col span={18}>
                      <span className="number">{basicData ? basicData.mid : ''}</span>
                    </Col>


                  </div>
                </Col>
                <Col span={8}>
                  <div className="">
                    <Col span={6}>
                      <span className="name">商户名称：</span>
                    </Col>
                    <Col span={18}>
                      <span className="number">{basicData ? basicData.merchantName : ''}</span>
                    </Col>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <div className="">
                    <Col span={6}>
                      <span className="name">联系人：</span>
                    </Col>
                    <Col span={18}>
                      <span className="number">{basicData ? basicData.contact : ''}</span>
                    </Col>


                  </div>
                </Col>
                <Col span={8}>
                  <div className="">
                    <Col span={6}>
                      <span className="name">电话：</span>
                    </Col>
                    <Col span={18}>
                      <span className="number">{basicData ? basicData.phone : ''}</span>
                    </Col>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="">
                    <Col span={6}>
                      <span className="name">身份证号：</span>
                    </Col>
                    <Col span={18}>
                      <span className="number">{basicData ? basicData.no : ''}</span>
                    </Col>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <div className="">
                    <Col span={6}>
                      <span className="name">下辖商户数量：</span>
                    </Col>
                    <Col span={18}>
                      <span className="number">{basicData ? basicData.underMerchant : ''}</span>
                    </Col>


                  </div>
                </Col>
                <Col span={8}>
                  <div className="">
                    <Col span={6}>
                      <span className="name">所在地：</span>
                    </Col>
                    <Col span={18}>
                      <span className="number">{basicData ? basicData.address : ''}</span>
                    </Col>
                  </div>
                </Col>
              </Row>

            </div>):''
          }


        </div>

        <div className="center">
          <div className="title">
            <Icon type={this.state.centerIcon ? 'up' : 'down'} onClick={()=>this.handleCenterClick('centerCon')} />
            <span>结算信息</span>
          </div>
          {
            this.state.centerIcon?( <div className="content">
              <Row>
                <Col span={8}>
                  <div className="">
                    <Col span={6}>
                      <span className="name">开户银行：</span>
                    </Col>
                    <Col span={18}>
                      <span className="number">{settleData.openBank}</span>
                    </Col>


                  </div>
                </Col>
                <Col span={8}>
                  <div className="">
                    <Col span={6}>
                      <span className="name">联行号：</span>
                    </Col>
                    <Col span={18}>
                      <span className="number">{settleData.openBankNo}</span>
                    </Col>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="">
                    <Col span={6}>
                      <span className="name">开户支行：</span>
                    </Col>
                    <Col span={18}>
                      <span className="number">{settleData.bankBranchName}</span>
                    </Col>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <div className="">
                    <Col span={6}>
                      <span className="name">开户名称：</span>
                    </Col>
                    <Col span={18}>
                      <span className="number">{settleData.openAccName}</span>
                    </Col>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="">
                    <Col span={6}>
                      <span className="name">银行账户：</span>
                    </Col>
                    <Col span={18}>
                      <span className="number">{settleData.accNo}</span>
                    </Col>
                  </div>
                </Col>
              </Row>
            </div>):''
          }


        </div>

        <div className="bottom">
          <div className="title">
            <Icon type={this.state.bottomIcon ? 'up' : 'down'} onClick={()=>this.handleBottomClick('bottomCon')} />
            <span>费率信息</span>
          </div>
          {
            this.state.bottomIcon?( <div className="content">
              <div className="pay">
                <div className="boTitle">{rateData &&rateData.pay? rateData.pay.name : ''}</div>
                {
                  rateData&& rateData.pay? rateData.pay.data.map((item, index)=> {
                    return (
                      <Row key={index}>
                        <Col span={4}>
                          <span className="name">{item.payType}</span>
                        </Col>
                        <Col span={4}>
                          <span className="subName">费率（%）：</span>
                          <span className="">{item.rate}</span>
                        </Col>
                        <Col span={4}>
                          <span className="subName">手续费封顶（元）：</span>
                          <span className="">{item.top}</span>
                        </Col>
                        <Col span={4}>
                          <span className="subName">手续费保底（元）：</span>
                          <span className="">{item.bottom}</span>
                        </Col>

                      </Row>
                    )
                  }) : ''
                }

              </div>
              <div className="payAnother">
                <div className="boTitle">{rateData&&rateData.payAnother ? rateData.payAnother.name : ''}</div>

                {
                  rateData&&rateData.payAnother ? rateData.payAnother.data.map((item, index)=> {
                    return (
                      <Row key={index}>
                        <Col span={4}>
                          <span className="name">{item.payType}</span>
                        </Col>
                        <Col span={4}>
                          <span className="subName">费率（%）：</span>
                          <span className="">{item.rate}</span>
                        </Col>
                        <Col span={4}>
                          <span className="subName">手续费封顶（元）：</span>
                          <span className="">{item.top}</span>
                        </Col>
                        <Col span={4}>
                          <span className="subName">手续费保底（元）：</span>
                          <span className="">{item.bottom}</span>
                        </Col>
                        <Col span={4}>
                          <span className="subName">最小结算金额（元）：</span>
                          <span className="">{item.min}</span>
                        </Col>
                        <Col span={4}>
                          <span className="subName">最大结算金额（元）：</span>
                          <span className="">{item.max}</span>
                        </Col>


                      </Row>
                    )
                  }) : ''
                }

              </div>
            </div>):''
          }

        </div>
        <style jsx>{`
                    .main{
                        padding: 0 10px;
                        width:100%;
                        font-size:16px;
                        background:#fff;
                        color:#000;
                    }
                    .balance{
                        height:70px;
                        line-height:70px;
                        font-size:16px;
                        font-weight:800;
                    }
                    .balance .title{
                        margin-right:60px;

                    }


                    .top .title,.center .title,.bottom .title{
                        border-bottom:1px solid #ccc;
                        height:40px;
                        line-height:40px;
                    }
                    .top .title span,.center .title span,.bottom .title span{
                        margin-left:10px;
                    }
                    .top .content,.center .content{
                        padding-top:10px;
                        height:160px;
                        line-height:46px;

                    }
                    .top .content .name,.center .content .name{
                        float:right;
                    }

                    .bottom .content{
                        padding:10px 0;
                        line-height:30px;
                    }
                    .bottom .content .boTitle{
                        font-weight:700;
                    }
                    .bottom .content .name{
                        margin-left:20px;
                    }
                    .top{

                    }
                    .center{

                    }
                    .bottom{

                    }
                `}</style>
      </div>
    )
  }


}
const propsMapToState = ({basic}) => ({basic});

export default connect(propsMapToState)(SubBasic);







