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
  Input,
  Button,
  Card,
  Form,
  Select,
  DatePicker,
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
      laoding: false,
    }

    //查询
    this.handleSubmit = this.handleSubmit.bind(this);
    //禁止选择时间
    this.disabledDate= this.disabledDate.bind(this)
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
    let {form, onQueryChange} = this.props;
    form.validateFields((err, values) => {

      const { amount, amountType, createTime } = values;
      const dayFormat = 'YYYY-MM-DD';
      let startDate;
      let endDate;
      if ( createTime && createTime.length > 0 ){
        startDate = createTime[0].format(dayFormat);
        endDate = createTime[1].format(dayFormat)
      }
      onQueryChange({ amount, amountType, startDate, endDate});
    });
  }
  async exportSubmit(e) {
    e.preventDefault();
    this.setState({
      loading: true
    });
    let {onExport} = this.props;
    await onExport();
    this.setState({
      loading: false
    });
  }

  render() {
    let {amountType = [], endDate = null, startDate = null, form: {getFieldDecorator, resetFields}} = this.props;
    //下拉列表
    let options = amountType.map((item) => (
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
            label="发生额"
          >
            {getFieldDecorator('amount', {
              initialValue: '',
            })(
              <Input
                size="default"
                style={{width: 150}}
              />
            )}
          </FormItem>
          <FormItem
            label="创建日期"
          >
            {getFieldDecorator('createTime', rangeConfig)(
              <RangePicker
                disabledDate={this.disabledDate}
                ranges={{今天: [moment(), moment()]}}
                size="default"
                style={{width: 200}}
              />
            )}
          </FormItem>
          <FormItem
            label="发生类型"
            style={{marginRight:30}}
          >
            {getFieldDecorator('amountType', {
              initialValue: 'all',
            })(
              <Select
                size="default"
                style={{width: 100}}
              >
                <Option key='all'>全部</Option>
                {options}
              </Select>
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
              style={{marginLeft: 8, background: '#00AA00'}}
              type="primary"
              size="default"
              onClick={(e)=>this.exportSubmit(e)}
              loading = {this.state.loading}
            >
              导出
            </Button>
            <Button
              size="default"
              style={{ marginLeft: 8}}
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
