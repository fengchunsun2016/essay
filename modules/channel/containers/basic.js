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
    const {balance, basicData, settleData, rateData, childMerCount} = this.props.basic;
    return (

      <div className="main">
        <div className="balance">
          <Icon type="pay-circle-o" style={{color:'#ffb319',fontSize:20,marginRight:10}} />
          <span className="title">账户余额(元):</span>
          <span className="icon">￥</span>
          <span className="num">{balance}</span>
        </div>
        <div className="top">
          <div className="title">
            <Icon style={{color:'#65ccf7'}} type={this.state.topIcon ? 'down-circle-o' : 'down-circle-o'} onClick={()=>this.handleTopClick()} />
            <span>基本信息</span>
          </div>
          {
            this.state.topIcon?( <div className="content">

              <Row>
                <Col span={8}>
                  <div className="">
                    <Col span={8}>
                      <span className="name">商户号：</span>
                    </Col>
                    <Col span={16}>
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
                      <span className="number">{basicData ? basicData.merName : ''}</span>
                    </Col>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <div className="">
                    <Col span={8}>
                      <span className="name">联系人：</span>
                    </Col>
                    <Col span={16}>
                      <span className="number">{basicData ? basicData.bizContact : ''}</span>
                    </Col>


                  </div>
                </Col>
                <Col span={8}>
                  <div className="">
                    <Col span={6}>
                      <span className="name">电话：</span>
                    </Col>
                    <Col span={18}>
                      <span className="number">{basicData ? basicData.bizMobile : ''}</span>
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
                    <Col span={8}>
                      <span className="name">下辖商户数量：</span>
                    </Col>
                    <Col span={16}>
                      <span className="number">{childMerCount ? childMerCount : ''}</span>
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
            <Icon style={{color:'#65ccf7'}} type={this.state.centerIcon ? 'down-circle-o' : 'down-circle-o'} onClick={()=>this.handleCenterClick('centerCon')} />
            <span>结算信息</span>
          </div>
          {
            this.state.centerIcon?( <div className="content">
              <Row>
                <Col span={8}>
                  <div className="">
                    <Col span={8}>
                      <span className="name">开户银行：</span>
                    </Col>
                    <Col span={16}>
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
                    <Col span={8}>
                      <span className="name">开户名称：</span>
                    </Col>
                    <Col span={16}>
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
                      <span className="number">{settleData.openBankAcc?settleData.openBankAcc.substr(0,6)+'****'+settleData.openBankAcc.substr(settleData.openBankAcc.length-4,settleData.openBankAcc.length):''}</span>
                    </Col>
                  </div>
                </Col>
              </Row>
            </div>):''
          }


        </div>

        <div className="bottom">
          <div className="title">
            <Icon style={{color:'#65ccf7'}} type={this.state.bottomIcon ? 'down-circle-o' : 'down-circle-o'} onClick={()=>this.handleBottomClick('bottomCon')} />
            <span>费率信息</span>
          </div>
          {
            this.state.bottomIcon?( <div className="content">
              <div className="pay">
                <div className="boTitle">支付手续费</div>
                {
                  rateData&& rateData.pay? rateData.pay.map((item, index)=> {
                    return (
                      <Row key={index}>
                        <Col span={4}>
                          <span className="name">{item.payType}</span>
                        </Col>
                        <Col span={3}>
                          <span className="subName">费率（%）：</span>
                          <span className="">{(item.rate*100).toFixed(2)}</span>
                        </Col>
                        <Col span={4}>
                          <span className="subName">手续费封顶（元）：</span>
                          <span className="">{item.hightAmt}</span>
                        </Col>
                        <Col span={4}>
                          <span className="subName">手续费保底（元）：</span>
                          <span className="">{item.lowAmt}</span>
                        </Col>

                      </Row>
                    )
                  }) : ''
                }

              </div>
              <div className="payAnother">
                <div className="boTitle">代付手续费</div>

                {
                  rateData&&rateData.payAnother ? rateData.payAnother.map((item, index)=> {
                    return (
                      <Row key={index}>
                        <Col span={4}>
                          <span className="name">{item.typeCode}</span>
                        </Col>
                        <Col span={3}>
                          <span className="subName">费率（%）：</span>
                          <span className="">{(item.rate*100).toFixed(2)}</span>
                        </Col>
                        <Col span={4}>
                          <span className="subName">手续费封顶（元）：</span>
                          <span className="">{item.hightAmt}</span>
                        </Col>
                        <Col span={4}>
                          <span className="subName">手续费保底（元）：</span>
                          <span className="">{item.lowAmt}</span>
                        </Col>
                        <Col span={4}>
                          <span className="subName">最小结算金额（元）：</span>
                          <span className="">{item.merLowAmt}</span>
                        </Col>
                        <Col span={5}>
                          <span className="subName">最大结算金额（元）：</span>
                          <span className="">{item.merHightAmt}</span>
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
                        font-size:14px;
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
                        font-size:16px;

                    }
                    .balance .num{
                        margin-left:5px;
                        font-size:24px;
                        font-weight:500;
                    }

                    .top .title,.center .title,.bottom .title{
                        border-bottom:1px solid #ccc;
                        height:40px;
                        line-height:40px;
                        font-size:16px;
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
                        font-size:15px;
                        font-weight:500;
                    }
                    .bottom .content .name{
                        margin-left:20px;
                    }

                `}</style>
      </div>
    )
  }


}
const propsMapToState = ({basic}) => ({basic});

export default connect(propsMapToState)(SubBasic);







