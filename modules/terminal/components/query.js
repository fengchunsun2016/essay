import React from 'react';
import {
  Row,
  Col,
  Input,
  Button,
  Form,
  Select,
} from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;

/***
 *
 * @param merchantStatus 商户状态
 */
class Query extends React.Component {
  constructor(props) {
    super(props);
    //查询
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let { form, onQuery } = this.props;
    form.validateFields((err, values) => {

      onQuery(values);
    });
  }
  resetFields(){
    const {resetSearch,form: { resetFields}} = this.props;
    resetSearch();
    resetFields();
  }

  render() {
    let { terminalType = [], mid,merName,termCode,physicalId,status, form: { getFieldDecorator } } = this.props;
    //下拉列表
    let options = terminalType.map((item) => (
      <Option key={item.id}>{item.name}</Option>
    ))

    return (
      //时间选择范围

      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Row>
          <Col span={18}>
            <Col span={8}>
              <FormItem
                label="商户号"
              >
                {getFieldDecorator('mid', {
                  initialValue : mid?mid:'',
                })(
                  <Input
                    size="default"
                    style={{ width : 180 }}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                label="商户名称"
              >
                {getFieldDecorator('merName', {
                  initialValue : merName?merName:'',
                })(
                  <Input
                    size="default"
                    style={{ width : 180 }}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                label="终端编号"
              >
                {getFieldDecorator('termCode', {
                  initialValue : termCode?termCode:'',
                })(
                  <Input
                    size="default"
                    style={{ width : 180 }}
                  />
                )}
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem
                label="SN号"
                style={{marginLeft:8}}
              >
                {getFieldDecorator('physicalId', {
                  initialValue : physicalId?physicalId:'',
                })(
                  <Input
                    size="default"
                    style={{ width : 180 }}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                label="状态"
                style={{marginLeft:24}}
              >
                {getFieldDecorator('status', {
                  initialValue : status?status:'all',
                })(
                  <Select
                    size="default"
                    style={{ width : 100 }}
                    placeholder="选择状态"
                  >
                    <Option key='all'>全部</Option>
                    {options}
                  </Select>
                )}
              </FormItem>
            </Col>


          </Col>

          <Col>
            <FormItem>
              <Button
                size="default"
                type="primary"
                htmlType="submit"
              >
                查询
              </Button>
              <Button
                size="default"
                style={{ marginLeft : 8 }}
                onClick={() => this.resetFields()}
              >
                重置
              </Button>
            </FormItem>
          </Col>
        </Row>


      </Form>

    )
  }
}

export default Form.create()(Query);
