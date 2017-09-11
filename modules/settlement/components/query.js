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
      //当前默认选中类型
      requestType : 'month',
      startDate : moment(),
      endDate : moment(),
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

      let { serialNo, status, date } =values;
      const dayFormat = 'YYYY-MM-DD';
      let startSettleTime;
      let endSettleTime;
      if (date && date.length > 0) {
        startSettleTime = date[0].format(dayFormat);
        endSettleTime = date[1].format(dayFormat)
      }

      onQuery({ serialNo, status, startSettleTime, endSettleTime });
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
  resetFields(){
    const {resetSearch,form: { resetFields}} = this.props;
    resetSearch();
    resetFields();
  }

  render() {
    let { amountStatus = [], serialNo,status,startDate = null, endDate = null, form: { getFieldDecorator } } = this.props;
    //下拉列表
    let options = amountStatus.map((item) => (
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
                label="结算订单号"
              >
                {getFieldDecorator('serialNo', {
                  initialValue : serialNo?serialNo:'',
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

            <Col span={10}>
              <FormItem
                label="结算日期"
              >

                {getFieldDecorator('date', rangeConfig)(
                  <RangePicker
                    disabledDate={this.disabledDate}
                    ranges={{ 今天 : [moment(), moment()] }}
                    size="default"
                    style={{ width : 200 }}
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
