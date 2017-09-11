import React from 'react';
import moment from 'moment';
import {
  Row,
  Col,
  Input,
  Button,
  Form,
  Select,
  DatePicker,
} from 'antd';

const Option = Select.Option;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;

/***
 *
 * @param merchantStatus 商户状态
 */
class Query extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : false,
    }

    //查询
    this.handleSubmit = this.handleSubmit.bind(this);
    //禁止选择时间
    this.disabledDate = this.disabledDate.bind(this)
  }

  //不准选择日期
  disabledDate(current) {
    // Can not select days before today and today
    return current && current.valueOf() > Date.now();
  }

  handleSubmit(e) {
    e.preventDefault();
    let { form, onQuery } = this.props;
    form.validateFields((err, values) => {

      let {
        mid, merName, termCode, tranKind, voucherNo,
        referNo, batchNo, cardNo, status, minAmount,
        maxAmount, date
      } =values;
      const dayFormat = 'YYYY-MM-DD';
      let startDate;
      let endDate;
      if (date && date.length > 0) {
        startDate = date[0].format(dayFormat);
        endDate = date[1].format(dayFormat)
      }

      onQuery({
        mid, merName, termCode, tranKind, voucherNo,
        referNo, batchNo, cardNo, status, minAmount,
        maxAmount, startDate, endDate, type : 1
      });
    });
  }

  async exportSubmit() {
    this.setState({
      loading : true,
    });
    let { onExport } = this.props;
    await onExport();
    this.setState({
      loading : false,
    });
  }

  //重置查询条件
  resetFields() {
    const { resetSearch, form: { resetFields } } = this.props;
    resetSearch();
    resetFields();
  }

  render() {
    let {
      posPayType = [],
      posStatus = [],
      search:{
        mid,
        merName,
        termCode,
        tranKind,
        voucherNo,
        referNo,
        batchNo,
        cardNo,
        status,
        startDate,
        endDate,
        minAmount,
        maxAmount,
      },
      form: { getFieldDecorator }
    } = this.props;
    //下拉列表
    let optionsStatus = posStatus.map((item) => (
      <Option key={item.id}>{item.name}</Option>
    ))
    let optionsType = posPayType.map((item) => (
      <Option key={item.id}>{item.name}</Option>
    ))

    const rangeConfig = {
      initialValue : [startDate ? moment(startDate, 'YYYY-MM-DD') : moment().subtract(1, 'month'), endDate ? moment(endDate, 'YYYY-MM-DD') : moment()],
      rules : [{ type : 'array', message : '请选择日期!' }],
    }

    return (
      //时间选择范围

      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Row>
          <Col span={18}>
            <Col span={8}>
              <FormItem
                label="商户号"
                style={{ marginLeft : 24 }}
              >
                {getFieldDecorator('mid', {
                  initialValue : mid ? mid : '',
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
                style={{ marginLeft : 12 }}
              >
                {getFieldDecorator('merName', {
                  initialValue : merName ? merName : '',
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
                label="终端号"
                style={{ marginLeft : 24 }}
              >
                {getFieldDecorator('termCode', {
                  initialValue : termCode ? termCode : '',
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
                label="交易金额"
                style={{ marginLeft : 12 }}
              >
                {getFieldDecorator('minAmount', {
                  initialValue : minAmount ? minAmount : '',
                })(
                  <Input
                    size="default"
                    style={{ width : 60 }}
                  />
                )}
              </FormItem>
              <span style={{ fontSize : 20, marginRight : 10 }}>~</span>
              <FormItem
              >
                {getFieldDecorator('maxAmount', {
                  initialValue : maxAmount ? maxAmount : '',
                })(
                  <Input
                    size="default"
                    style={{ width : 60 }}
                  />
                )}
              </FormItem>
            </Col>


            <Col span={8}>
              <FormItem
                label="交易类型"
                style={{ marginLeft : 12 }}
              >
                {getFieldDecorator('tranKind', {
                  initialValue : tranKind ? tranKind : 'all',
                })(
                  <Select
                    size="default"
                    style={{ width : 100 }}
                    placeholder="选择状态"
                  >
                    <Option key='all'>全部</Option>
                    {optionsType}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                label="支付状态"
                style={{ marginLeft : 12 }}
              >
                {getFieldDecorator('status', {
                  initialValue : status ? status : 'all',
                })(
                  <Select
                    size="default"
                    style={{ width : 100 }}
                    placeholder="选择状态"
                  >
                    <Option key='all'>全部</Option>
                    {optionsStatus}
                  </Select>
                )}
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem
                label="卡号"
                style={{ marginLeft : 36 }}
              >
                {getFieldDecorator('cardNo', {
                  initialValue : cardNo ? cardNo : '',
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
                label="终端流水号"
              >
                {getFieldDecorator('voucherNo', {
                  initialValue : voucherNo ? voucherNo : '',
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
                label="系统参考号"
              >
                {getFieldDecorator('referNo', {
                  initialValue : referNo ? referNo : '',
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
                label="终端批次号"
              >
                {getFieldDecorator('batchNo', {
                  initialValue : batchNo ? batchNo : '',
                })(
                  <Input
                    size="default"
                    style={{ width : 180 }}
                  />
                )}
              </FormItem>
            </Col>


            <Col span={9}>
              <FormItem
                label="创建日期"
                style={{ marginLeft : 12 }}
              >

                {getFieldDecorator('date', rangeConfig)(
                  <RangePicker
                    disabledDate={this.disabledDate}
                    ranges={{ 今天 : [moment(), moment()] }}
                    size="default"
                    style={{ width : 180 }}
                  />
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
                style={{ marginLeft : 8, background : '#00AA00' }}
                type="primary"
                size="default"
                onClick={(e)=>this.exportSubmit(e)}
                loading={this.state.loading}
              >
                导出
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
