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
const {RangePicker} = DatePicker;
const FormItem = Form.Item;

/***
 *
 * @param merchantStatus 商户状态
 */
class Query extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      //当前默认选中类型
      requestType:'month',
      startDate:moment(),
      endDate:moment(),
    }

    //查询
    this.handleSubmit = this.handleSubmit.bind(this);
    //禁止选择时间
    this.disabledDate = this.disabledDate.bind(this)
  }

  //不准选择日期
  disabledDate(current){
    // Can not select days before today and today
    return current && current.valueOf() > Date.now();
  }

  handleSubmit(e){
    e.preventDefault();
    let {form, onQuery} = this.props;
    form.validateFields((err, values) =>{

      onQuery(values);
      let {mid, merchantName, status, date, payType, orderNo, minAmount, maxAmount} =values;
      const dayFormat = 'YYYYMMDD';
      let beginTime;
      let endTime;
      if (date && date.length > 0) {
        beginTime = date[0].format(dayFormat);
        endTime = date[1].format(dayFormat)
      }

      onQuery({mid, merchantName, status, payType, orderNo, minAmount, maxAmount, beginTime, endTime, type:1});
    });
  }

  render(){
    let {amountStatus = [], form: {getFieldDecorator, resetFields}} = this.props;
    //下拉列表
    let options = amountStatus.map((item) => (
      <Option key={item.id} >{item.name}</Option>
    ))

    const rangeConfig = {
      initialValue:[moment().subtract(1, 'month'), moment()],
      rules:[{type:'array', message:'请选择日期!'}],
    }

    return (
      //时间选择范围

      <Form layout="inline" onSubmit={this.handleSubmit} >
        <Row>
          <Col span={18} >
            <Col span={8} >
              <FormItem
                label="结算订单号"
              >
                {getFieldDecorator('mid', {
                  initialValue:'',
                })(
                  <Input
                    size="default"
                    style={{width:200}}
                  />
                )}
              </FormItem>
            </Col>


            <Col span={6} >
              <FormItem
                label="状态"
              >
                {getFieldDecorator('status', {
                  initialValue:null,
                })(
                  <Select
                    size="default"
                    style={{width:100}}
                    placeholder="选择状态"
                  >
                    {options}
                  </Select>
                )}
              </FormItem>
            </Col>

            <Col span={10} >
              <FormItem
                label="交易时间"
              >

                {getFieldDecorator('date', rangeConfig)(
                  <RangePicker
                    disabledDate={this.disabledDate}
                    ranges={{今天:[moment(), moment()]}}
                    size="default"
                    style={{width:200}}
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
                size="default"
                style={{marginLeft:8}}
                onClick={() => resetFields()}
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
