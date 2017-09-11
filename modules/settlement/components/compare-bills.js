import React from 'react';
import moment from 'moment';
import { Col, Button, Modal, DatePicker, Form } from 'antd';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;


class CompareBills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible : false,
    }
  }

  showModal = () => {
    this.setState({
      visible : true,
    });
  }
  handleOk = () => {

    this.setState({
      visible : false,
      confirmLoading : false,
    });

  }
  handleCancel = () => {
    this.setState({
      visible : false,
    });
  }
  billsLoad = () => {
    const { form, onExportBills } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      if (values.date.length == 0) {
        return;
      }

      form.resetFields();
      this.setState({ visible : false });
      const { date } = values;
      let startDate = date[0].format('YYYY-MM-DD');
      let endDate = date[1].format('YYYY-MM-DD');
      onExportBills({ startDate, endDate });
    });
  }
  //不准选择日期
  disabledDate(current) {
    // Can not select days before today and today
    return current && current.valueOf() > Date.now();
  }

  //校验选择时间不能超过31天
  checkDate = (rule, value, callback) => {
    if (value.length != 0) {
      let rangeDate = 31 * 24 * 60 * 60 * 1000;
      let startDate = value[0].format('YYYY-MM-DD');
      let endDate = value[1].format('YYYY-MM-DD');

      let startDateC = new Date(startDate);
      let endDateC = new Date(endDate);
      let result = endDateC - startDateC;

      if (result <= rangeDate) {
        callback();
        return;
      }
    }
    callback('时间不能超过31天！！');
  }

  render() {
    const { visible, confirmLoading } = this.state;
    const rangeConfig = {
      initialValue : [moment().subtract(1, 'day'), moment().subtract(1, 'day')],
      rules : [{ type : 'array', validator : this.checkDate }],
    }
    let { form: { getFieldDecorator } } = this.props;

    return (
      <Col span={4} offset={6}>
        <Button
          style={{ background : '#00AA00', color : '#fff' }}
          size="default"
          onClick={this.showModal}
        >结算对账文件下载</Button>

        <Modal
          title='对账文件下载'
          maskClosable={false}
          visible={visible}
          onOk={this.billsLoad}
          okText="确定"
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          cancelText="取消"
          style={{ height : '200px', textAlign : 'center' }}
        >
          <Form layout="inline" onSubmit={this.handleSubmit}>
            <FormItem
              label="对账日期"
            >
              {getFieldDecorator('date', rangeConfig)(
                <RangePicker
                  disabledDate={this.disabledDate}

                  size="large"
                  style={{ width : 260 }}

                />
              )}
            </FormItem>

          </Form>
        </Modal>
      </Col>
    )
  }
}

const CompareBillsTrue = Form.create()(CompareBills);
export default CompareBillsTrue;




