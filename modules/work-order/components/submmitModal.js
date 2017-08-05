import React from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        maskClosable={false}
        visible={visible}
        okText="提交"
        cancelText="返回"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem label="标题">
            {getFieldDecorator('title', {
              rules: [{ required: true,
                max: 30,
                message: '请输入标题(不能超过30个字符)'
              }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="问题描述">
            {getFieldDecorator('des',{
              rules: [{ required: true,
                max: 500,
                message: '请输入问题描述(不能超过500个字符)'
              }],
            })(<Input type="textarea" style={{height:'200px'}} />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);

export default CollectionCreateForm;



