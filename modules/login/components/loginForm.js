import React from 'react';
import {Row, Col, Form, Icon, Input, Button} from 'antd';

const FormItem = Form.Item;

function trim(str){ //删除左右两端的空格
  return str.replace(/(^\s*)|(\s*$)/g, '');
}

/**
 * 用户登录Form窗口
 */
const NormalLoginForm = ({onChangeVcode, keyID, vcodeUri, pending, onLogin, form: {getFieldDecorator, validateFields}}) => {

  function handleSubmit(e) {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        for(var key in values){
          values[key] = trim(values[key])
        }
        values.keyID = keyID;
        onLogin(values)
      }
    });

  }

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <FormItem>
        {getFieldDecorator('userName', {
          validateTrigger: 'onBlur',
          rules: [
            {
              type: 'string',
              required: true,
              min: 6,
              max: 20,
              message: '请输入正确商户号'
            },
          ],
        })(
          <Input
            prefix={<Icon type="user" style={{fontSize: 13}} />}
            placeholder="请输入商户号"
          />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('passWord', {
          validateTrigger: 'onBlur',
          rules: [
            {
              type: 'string',
              required: true,
              min: 6,
              max: 20,
              message: '请输入正确密码'
            },
          ],
        })(
          <Input
            prefix={<Icon type="lock" style={{fontSize: 13}} />}
            type="password" placeholder="输入登录密码"
          />
        )}
      </FormItem>
      <FormItem>
        <Row gutter={8}>
          <Col span={12}>
            {getFieldDecorator('code', {
              validateTrigger: 'onBlur',
              rules: [{
                required: true,
                len: 4,
                message: '验证码错误'
              }],
            })(
              <Input placeholder="请输入验证码" />
            )}
          </Col>
          <Col span={9}>
            <img
              style={{width: '100%', height: '32px'}}
              role="presentation"
              onClick={onChangeVcode}
              src={vcodeUri}
              title="点击刷新验证码"
              alt="刷新验证码"
            />
          </Col>
        </Row>

      </FormItem>
      <FormItem>

        <Button
          loading={pending}
          type="primary"
          htmlType="submit"
          className="login-form-button"
          style={{width: '100%'}}
        >
          登录
        </Button>

      </FormItem>

    </Form>
  );
}

export default Form.create()(NormalLoginForm);





