/**
 * @file channel/modules/account/components/query.js
 * @author Mantak <mantak.cn@gmail.com>
 * Date: 2017-08-08
 * Last Modified Date: 2017-08-08
 * Last Modified By: Mantak <mantak.cn@gmail.com>
 */

import React from 'react';
import moment from 'moment';
import {
  Row,
  Col,
  Input,
  Button,
  Card,
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
      //当前默认选中类型
      requestType : 'month',
      startDate : moment(),
      endDate : moment(),
      loading : false,
    }

    //查询
    this.handleSubmit = this.handleSubmit.bind(this);
    //禁止选择时间
    this.disabledDate = this.disabledDate.bind(this);
    // 导出
    this.exportSubmit = this.exportSubmit.bind(this);

  }



  //不准选择日期
  disabledDate(current) {
    // Can not select days before today and today
    return current && current.valueOf() > Date.now();
  }

  handleSubmit(e) {
    e.preventDefault();
    let { form, onQueryChange } = this.props;
    form.validateFields((err, values) => {

      const { transNo, amount, amountType, mid, merName, accType, transType, createTime } = values;
      const dayFormat = 'YYYY-MM-DD';
      let startDate;
      let endDate;
      if (createTime && createTime.length > 0) {
        startDate = createTime[0].format(dayFormat);
        endDate = createTime[1].format(dayFormat)
      }
      onQueryChange({ transNo, amount, amountType, mid, merName, accType, transType, startDate, endDate });
    });
  }

  async exportSubmit(e) {
    e.preventDefault();
    this.setState({
      loading : true
    });
    let { onExport } = this.props;
    await onExport();
    this.setState({
      loading : false
    });
  }
  //重置查询条件
  resetFields(){
    const {resetSearch,form: { resetFields}} = this.props;
    resetSearch();
    resetFields();
  }

  render() {
    let { transChange, amountTypeListShow = [], accTypeList = [], transTypeList = [], search, form: { getFieldDecorator } } = this.props;
    let { transNo, amount, amountType, mid, merName, accType, transType, startDate, endDate } = search;
    //下拉列表
    let optionsAmount = amountTypeListShow.map((item) => (
      <Option key={item.id}>{item.name}</Option>
    ));
    let optionsAcc = accTypeList.map((item) => (
      <Option key={item.id}>{item.name}</Option>
    ));
    let optionsTrans = transTypeList.map((item) => (
      <Option key={item.id}>{item.name}</Option>
    ));

    const rangeConfig = {
      initialValue : [startDate ? moment(startDate, 'YYYY-MM-DD') : moment().subtract(1, 'month'), endDate ? moment(endDate, 'YYYY-MM-DD') : moment()],
      rules : [{ type : 'array', message : '请选择日期!' }],
    }

    return (
      //时间选择范围

      <Card>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Row>
            <Col span={6}>
              <FormItem
                label="交易号"
                style={{marginLeft:12}}
              >
                {getFieldDecorator('transNo', {
                  initialValue : transNo ? transNo : '',
                })(
                  <Input
                    size="default"
                    style={{ width : 150 }}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                label="商户号"
              >
                {getFieldDecorator('mid', {
                  initialValue : mid ? mid : '',
                })(
                  <Input
                    size="default"
                    style={{ width : 150 }}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                label="商户名称"
                style={{marginLeft:12}}
              >
                {getFieldDecorator('merName', {
                  initialValue : merName ? merName : '',
                })(
                  <Input
                    size="default"
                    style={{ width : 150 }}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                label="账户类型"
                style={{ marginRight : 30 }}
              >
                {getFieldDecorator('accType', {
                  initialValue : accType ? accType : 'all',
                })(
                  <Select
                    size="default"
                    style={{ width : 100 }}
                  >
                    <Option key='all'>全部</Option>
                    {optionsAcc}
                  </Select>
                )}
              </FormItem>
            </Col>




          </Row>

          <Row>

            <Col span={6}>
              <FormItem
                label="交易类型"
                style={{ marginRight : 30 }}
              >
                {
                  getFieldDecorator('transType', {
                    initialValue : transType ? transType : 'all',

                  })(
                    <Select
                      size="default"
                      style={{ width : 100 }}
                      onChange={(value)=>{this.props.form.setFieldsValue({'amountType':'all'});transChange(value)}}
                    >
                      <Option key='all'>全部</Option>
                      {optionsTrans}
                    </Select>
                  )
                }
              </FormItem>
            </Col>

            <Col span={6}>
              <FormItem
                label="发生额"
              >
                {getFieldDecorator('amount', {
                  initialValue : amount ? amount : '',
                })(
                  <Input
                    size="default"
                    style={{ width : 150 }}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                label="发生额类型"
                style={{ marginRight : 0 }}
              >
                {getFieldDecorator('amountType', {
                  initialValue :  amountType?amountType:'all'
                })(
                  <Select
                    size="default"
                    style={{ width : 150 }}

                  >
                    <Option key='all'>全部</Option>
                    {optionsAmount}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                label="创建日期"
              >
                {getFieldDecorator('createTime', rangeConfig)(
                  <RangePicker
                    disabledDate={this.disabledDate}
                    ranges={{ 今天 : [moment(), moment()] }}
                    size="default"
                    style={{ width : 180 }}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={10}>
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
                  onClick={() => {this.resetFields();transChange('all')}}
                >
                  重置
                </Button>
              </FormItem>
            </Col>

          </Row>



        </Form>
      </Card>
    )
  }
}

export default Form.create()(Query);
