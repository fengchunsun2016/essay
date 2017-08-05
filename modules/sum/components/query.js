/**
 * Created by lihejia on 2017/7/25.
 */
import React from 'react';
import moment from 'moment';
import {
  Input,
  Button,
  Card,
  Form,
  Select,
  DatePicker,
  Radio
} from 'antd';

const Option = Select.Option;
const {MonthPicker, RangePicker} = DatePicker;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

/***
 *
 * @param payType 支付种类
 */
class Query extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //当前默认选中类型
      requestType: 'month',
      startDate: moment(),
      endDate: moment(),
    }
    this.requestTypeChange = this.requestTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.exportSubmit = this.exportSubmit.bind(this);
    this.disabledDate= this.disabledDate.bind(this)
  }

  //不准选择日期
  disabledDate(current) {
    // Can not select days before today and today
    return current && current.valueOf() > Date.now();
  }

  exportSubmit(e) {
    e.preventDefault();
    let {form, onExport} = this.props;
    form.validateFields((err, values) => {
      onExport(values);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let {form, onQuery} = this.props;
    form.validateFields((err, values) => {
      onQuery(values);
    });
  }

  handleSelectChange() {

  }

  requestTypeChange(e) {
    let {value} = e.target;
    this.setState({
      requestType: value
    })
  }

  //根据日期类型选择空间
  selectDate() {
    let {requestType} = this.state;
    const {getFieldDecorator} = this.props.form;
    const rangeConfig = {
      initialValue: [moment(), moment()],
      rules: [{type: 'array', required: true, message: '请选择日期!'}],
    }
    const config = {
      initialValue: moment(),
      rules: [{type: 'object', required: true, message: '请选择日期!'}],
    };
    if ('day' == requestType) {
      return (
        <div>
          {getFieldDecorator('payDate', rangeConfig)(
            <RangePicker
              disabledDate={this.disabledDate}
              ranges={{今天: [moment(), moment()]}}
              size="default"
              style={{width: 200}}
            />
          )}
        </div>
      )

    }
    if ('month' == requestType) {
      return (
        <div>
          {getFieldDecorator('startDate', config)(
            <MonthPicker
              size="default"
              style={{width: 100}}

              disabledDate={this.disabledDate}
              placeholder="月份"
            />
          )}
          {getFieldDecorator('endDate', config)(
            <MonthPicker
              size="default"

              style={{width: 100}}
              disabledDate={this.disabledDate}
              placeholder="月份"
            />
          )}
        </div>
      )
    }
  }

  render() {
    let {payType = [], form: {getFieldDecorator, resetFields}} = this.props;

    let options = payType.map((item) => (
      <Option key={item.id}>{item.name}</Option>
    ))



    return (

      <Card>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem
            label="商户号"
            style={{margin: '5px 10px'}}
          >
            {getFieldDecorator('mid', {
              initialValue: '',
            })(
              <Input
                size="default"
                style={{width: 150}}
              />
            )}
          </FormItem>
          <FormItem
            style={{margin: '5px 3px'}}
            label="商户名称"
          >
            {getFieldDecorator('merName', {
              initialValue: '',
            })(
              <Input
                size="default"
                style={{width: 150}}
              />
            )}
          </FormItem>
          <br />
          <FormItem
            label="支付种类"
          >
            {getFieldDecorator('payType', {
              initialValue: '',
            })(
              <Select
                size="default"
                style={{width: 150}}
                placeholder="选择支付种类"
              >
                {options}
              </Select>
            )}
          </FormItem>

          <FormItem
            label="交易日期"
          >

            {this.selectDate()}

          </FormItem>
          <FormItem>
            {getFieldDecorator('requestType', {
              initialValue: this.state.requestType,
            })(
              <RadioGroup
                onChange={this.requestTypeChange}
                size="default"
              >
                <Radio value="month">月</Radio>
                <Radio value="day">日</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <br />
          <FormItem style={{marginTop: 16}}>
            <Button
              size="default"
              type="primary"
              htmlType="submit"
            >
              查询
            </Button>
            <Button
              style={{marginLeft: 8, background: '#00AA00'}}
              type="primary"
              size="default"
              onClick={this.exportSubmit}
            >
              导出
            </Button>
            <Button
              size="default"
              style={{marginLeft: 8}}
              onClick={() => resetFields()}
            >
              重置
            </Button>
          </FormItem>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(Query);