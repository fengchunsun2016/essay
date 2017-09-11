/**
 * Created by lihejia on 2017/7/22.
 */
import React from 'react';
import {Modal, Button} from 'antd';

import { getMessageFile } from '../../../services/message';
import { genFileDownLink } from '../../../utils/downLink';

class MessageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
    this.downLoad = this.downLoad.bind(this);
  }

  async downLoad() {
    this.setState({
      loading: true,
    });
    let { filePath} = this.props.data;
    const result = await getMessageFile(filePath);
    await genFileDownLink(result);
    this.setState({
      loading: false,
    });
  }

  render () {
    const {visible, onCancel} = this.props;
    let {applyDate, content, title, fileName} = this.props.data;
    return (
      <Modal
        title={title}
        visible={visible}
        onCancel={onCancel}
        cancelText="关闭"
        maskClosable={false}
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
          {fileName ?
            <div className="footer">
              <Button type="primary" loading={this.state.loading} onClick={this.downLoad}>
                下载: {fileName}
              </Button>
            </div>
            :
            null
          }
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
}

export default MessageModal;
