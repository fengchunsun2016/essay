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
  DatePicker
} from 'antd';

const Option = Select.Option;
const {RangePicker} = DatePicker;
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
      requestType: 'month',
      startDate: moment(),
      endDate: moment(),
    }

    //查询
    this.handleSubmit = this.handleSubmit.bind(this);
    //禁止选择时间
    this.disabledDate= this.disabledDate.bind(this)
  }

  //不准选择日期
  disabledDate(current) {
    // Can not select days before today and today
    return current && current.valueOf() > Date.now();
  }
  handleSubmit(e) {
    e.preventDefault();
    let {form, onQuery} = this.props;
    form.validateFields((err, values) => {

      let {mid,merchantName,status,date} =values;
      const dayFormat='YYYY-MM-DD';
      let beginTime;
      let endTime;
      if(date&&date.length>0){
        beginTime=date[0].format(dayFormat);
        endTime=date[1].format(dayFormat)
      }

      onQuery({mid,merchantName,status,beginTime,endTime});
    });
  }
  resetFields(){
    const {resetSearch,form: { resetFields}} = this.props;
    resetSearch();
    resetFields();
  }

  render() {
    let {merchantStatus = [], startDate = null, mid, merchantName, status, endDate = null, form: {getFieldDecorator}} = this.props;
    //下拉列表
    let options = merchantStatus.map((item) => (
      <Option key={item.id}>{item.name}</Option>
    ))

    const rangeConfig = {
      initialValue: [startDate?moment(startDate,'YYYY-MM-DD'):moment().subtract(1, 'month'), endDate?moment(endDate,'YYYY-MM-DD'):moment()],
      rules: [{type: 'array', message: '请选择日期!'}],
    }

    return (
      //时间选择范围

      <Card>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem
            label="商户号"
          >
            {getFieldDecorator('mid', {
              initialValue: mid?mid:'',
            })(
              <Input
                size="default"
                style={{width: 150}}
              />
            )}
          </FormItem>
          <FormItem
            label="商户名称"
          >
            {getFieldDecorator('merchantName', {
              initialValue: merchantName?merchantName:'',
            })(
              <Input
                size="default"
                style={{width: 150}}
              />
            )}
          </FormItem>
          <FormItem
            label="状态"
          >
            {getFieldDecorator('status', {
              initialValue: status?status:'all',
            })(
              <Select
                size="default"
                style={{width: 150}}
                placeholder="选择支付种类"
              >
                <Option key='all'>全部</Option>
                {options}
              </Select>
            )}
          </FormItem>

          <FormItem
            label="注册日期"
          >

            {getFieldDecorator('date', rangeConfig)(
              <RangePicker
                disabledDate={this.disabledDate}
                ranges={{今天: [moment(), moment()]}}
                size="default"
                style={{width: 200}}
              />
            )}

          </FormItem>

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