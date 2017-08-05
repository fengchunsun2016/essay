/**
 * Created by lihejia on 2017/7/22.
 */
import React from 'react';
import {Modal, Button} from 'antd';

export  default  ({data, visible, onCancel}) =>{

  let {applyDate, content, title, fileName, filePath} = data;

  //文件下载
  function downLoad(){
    window.open(filePath)
  }

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      cancelText="关闭"
      footer={
      <Button onClick={onCancel}>关闭</Button>
       }
      style={{textAlign: 'center'}}
    >
      <div className="modalCon">
        <div className="conTop">

          <span>发布时间：</span>
          <span>{applyDate}</span>
        </div>
        <div className="conText">
          {content}
        </div>
        <div className="footer">
          <div className="buttonBox">
            {fileName ? ( <span className="download-tag" onClick={downLoad}>下载:{fileName} </span> ) : ''}
          </div>

        </div>
      </div>


      <style global jsx>{`

                    .conTop{
                        line-height:'30px';
                        font-size:'14px';
                        padding-bottom:'50px';
                        border-top:'1px solid #ccc';
                        text-align:center;
                        color:#999;
                    }
                    .conText{
                        margin-top:30px;
                        text-indent:30px;
                        font-size:16px;

                    }
                    .download-tag{
                      color:blue;
                      cursor:pointer;
                    }
                    .footer{
                        display:flex;
                        justify-content:center;
                        align-items:center;
                        margin-top:10px;
                        border-top:1px solid #ccc;
                        padding-top:10px;
                    }
                     .footer .load{
                        margin-right:30px;
                     }

                `}</style>

    </Modal>

  )
}