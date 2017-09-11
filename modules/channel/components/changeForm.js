import React from 'react';
import Router from 'next/router';
import {Form, Input, Button} from 'antd';

const FormItem = Form.Item;


class ChangeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let {form, submit} = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        try {
         submit(values);
        } catch (error) {
            // console.log(error)
        }
      }else {
        // console.log(err);
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({confirmDirty: this.state.confirmDirty || !!value});
  }

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次新密码输入必须完全一致！');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], {force: true});
    }
    callback();
  }


  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 6},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 14},
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="旧密码"
          hasFeedback
        >
          {getFieldDecorator('oldPassword', {
            rules: [{
              required: true,
              min: 6,
              max: 20,
              message: '旧密码最短6位，并不能为空',
            }],
          })(
            <Input type="password" id="oldPassword" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="新密码"
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true,
              min: 6,
              max: 20,
              message: '新密码最短6位，并不能为空',
            }, {
              validator: this.checkConfirm,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="新密码"
          hasFeedback
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true,
              min: 6,
              max: 20,
              message: '新密码最短6位，并不能为空',
            }, {
              validator: this.checkPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">提交密码</Button>
          <Button onClick={()=>Router.back()} style={{marginLeft:20}}>返回</Button>
        </FormItem>
      </Form>
    )
  }
}
const ChangeFormWrap = Form.create()(ChangeForm);

export default ChangeFormWrap;

