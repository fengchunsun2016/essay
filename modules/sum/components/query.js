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
      loading: false,
    }
    this.requestTypeChange = this.requestTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.exportSubmit = this.exportSubmit.bind(this);
    this.disabledDate= this.disabledDate.bind(this);
    this.selectDate = this.selectDate.bind(this);
  }

  //不准选择日期
  disabledDate(current) {
    // Can not select days before today and today
    return current && current.valueOf() > Date.now();
  }

  async exportSubmit() {
    this.setState({
      loading: true
    });
    let {onExport} = this.props;
    await onExport();
    this.setState({
      loading: false
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let {form, onQuery} = this.props;
    form.validateFields((err, values) => {

      onQuery(values);
    });
  }


  requestTypeChange(e) {
    let {value} = e.target;
    this.props.changeType(value);
  }

  //根据日期类型选择空间
  selectDate() {
    let {startMonth, endMonth, startDay, endDay, requestType} = this.props;
    const {getFieldDecorator} = this.props.form;

    const rangeConfig = {
      initialValue: [startDay?moment(startDay,'YYYY-MM-DD'):moment(), endDay?moment(endDay,'YYYY-MM-DD'):moment()],
      rules: [{type: 'array', message: '请选择日期!'}],
    }
    const configStartMonth = {
      initialValue: startMonth?moment(startMonth,'YYYY-MM'):moment(),
      rules: [{type: 'object', message: '请选择日期!'}],
    };
    const configEndMonth = {
      initialValue: endMonth?moment(endMonth,'YYYY-MM'):moment(),
      rules: [{type: 'object', message: '请选择日期!'}],
    };
    if ('day' == requestType) {
      return (
        <FormItem
          label="交易日期"
        >

          {getFieldDecorator('payDate', rangeConfig)(
            <RangePicker
              disabledDate={this.disabledDate}
              ranges={{今天: [moment(), moment()]}}
              size="default"
              style={{width: 200}}
            />
          )}

        </FormItem>


      )

    }
    if ('month' == requestType) {
      return (
        <span>
          <FormItem
            label="交易日期"
          >
            {getFieldDecorator('startDate', configStartMonth)(
              <MonthPicker
                size="default"
                style={{width: 80}}

                disabledDate={this.disabledDate}
                placeholder="月份"
              />
            )}


          </FormItem>
          <FormItem>

            {getFieldDecorator('endDate', configEndMonth)(
              <MonthPicker
                size="default"

                style={{width: 80}}
                disabledDate={this.disabledDate}
                placeholder="月份"
              />
            )}

          </FormItem>
        </span>

      )
    }
  }
  resetFields(){
    const {resetSearch,form: { resetFields}} = this.props;
    resetSearch();
    resetFields();
  }

  render() {
    let {payTypeList = [], payType, mid, merName, requestType,form: {getFieldDecorator}} = this.props;

    let options = payTypeList.map((item) => (
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
              initialValue: mid?mid:'',
            })(
              <Input
                size="default"
                style={{width: 140}}
              />
            )}
          </FormItem>
          <FormItem
            style={{margin: '5px 3px'}}
            label="商户名称"
          >
            {getFieldDecorator('merName', {
              initialValue: merName?merName:'',
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
              initialValue: payType?payType:'all',
            })(
              <Select
                size="default"
                style={{width: 140}}
                placeholder="选择支付种类"
              >
                <Option key='all'>全部</Option>
                {options}
              </Select>
            )}
          </FormItem>


          {this.selectDate()}


          <FormItem>
            {getFieldDecorator('requestType', {
              initialValue: requestType?requestType:'month',
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
              loading={this.state.loading}
            >
              导出
            </Button>
            <Button
              size="default"
              style={{marginLeft: 8}}
              onClick={() => this.resetFields()}
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
