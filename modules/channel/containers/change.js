import React from 'react';
import {Row, Col, notification} from 'antd';

import {connect} from 'react-redux';
import router from 'next/router';
import {postChange} from '../actions';
import ChangeForm from '../components/changeForm';

class SubChange extends React.Component {
  warn(type, title, des){
    const openNotificationWithIcon = (type) =>{
      notification[type]({
        message:title,
        description:des,
      });
    };
    openNotificationWithIcon(type);
  }
  render(){
    //ChangeForm
    const formProps = {
      submit:(data)=>{
        const {dispatch,changeP:{changeSuccess,changeData}} = this.props;
        dispatch(postChange({password:data.oldPassword, newPassword:data.password}));
        if(changeSuccess){
          this.props.auth.token = changeData.token;
          this.props.changeP.changeSuccess = false;

          this.warn('success','恭喜！','您的密码已修改成功！');
          router.back();
        }
        /*post('/changePassword', {password:data.oldPassword, newPassword:data.password}).then((data)=>{
          data = data.data;
          this.props.auth.token = data.token;
          router.back();
          this.warn('success','恭喜！','您的密码已修改成功！')
        })*/
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





