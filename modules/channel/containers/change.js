import React from 'react';
import {Row, Col, notification} from 'antd';
import {connect} from 'react-redux';
import {postChange} from '../actions';
import ChangeForm from '../components/changeForm';

class SubChange extends React.Component {
  render(){
    //ChangeForm
    const formProps = {
      submit: (data)=>{
        const { dispatch } = this.props;
        
        dispatch(postChange({passWord:data.oldPassword, newPassWord:data.password}));
      }
    }
    return (
      <div className="changeMain" style={{width:'100%', height:'100%', position:'relative'}}>
        <Row>
          <Col span={8} offset={8}>
            <div className="changeBox" style={{minWidth:'400px', maxWidth:'500px'}}>

              <div className="title">
                修改密码
              </div>

              <ChangeForm {...formProps} />

            </div>
          </Col>
        </Row>
        <style jsx>{`
                    .changeBox{
                        position:relative;
                        margin-top:10vh;
                        width:100%px;
                        height:400px;
                        box-shadow:5px 5px 5px #999;
                        text-align:center;
                        background:#fff;
                        font-size:16px;
                        color:#000;
                    }

                    .changeBox label{
                        font-size:16px;
                    }
                    .title{
                        height:80px;
                        line-height:80px;
                        border-bottom:1px solid #ccc;
                        text-align:center;
                        font-size:24px;
                        margin-bottom:46px;
                    }

                `}</style>

      </div>
    )
  }



}

export  default connect(({auth,changeP})=>({auth,changeP}))(SubChange);





