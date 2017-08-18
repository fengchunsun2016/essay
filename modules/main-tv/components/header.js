/**
 * Created by lihejia on 2017/7/21.
 */
import React from 'react';
import {Row, Col, Card, DatePicker} from 'antd';
import moment from 'moment';

const {RangePicker} = DatePicker;
/***
 *
 * @param beginTime  开始时间
 * @param endTime  结束时间
 * @param onOk  时间回调函数
 * @param merPayLineChartTitle 交易数据
 * @returns {React Component}
 */
export default ({beginTime, endTime, startDate = null, endDate = null, onOk, merPayLineChartTitle = {}}) => {


  function disabledDate(current) {
    // Can not select days before today and today
    return current && current.valueOf() > Date.now();
  }

  return (
    <Row type="flex" justify="space-around" align="middle">
      <Col span={8} style={{padding: 5, height: '100%'}}>
        <Card>
          <div className="datePiker title">
            <div className="timeCount">
              <i className="icon" />
              <span className="text">交易日期</span>
            </div>
            <Col span={6} />
            <Col span={12}>
              <RangePicker
                disabledDate={disabledDate}
                ranges={{今天: [moment().startOf('day'), moment().endOf('day')], '当月': [moment().startOf('month'), moment().endOf('month')]}}
                defaultValue={[startDate?moment(startDate,'YYYY-MM-DD'):moment(beginTime), endDate?moment(endDate,'YYYY-MM-DD'):moment(endTime)]}
                onChange={onOk}
                style={{minWidth:200}}
              />

            </Col>
            <Col span={6} />
          </div>
        </Card>

      </Col>
      <Col span={16}>
        <Card>
          <div className="deal title">
            <div className="dealCount timeCount">
              <i className="icon" />
              <span className="text">交易统计</span>
            </div>
            <Col span={6}>
              <div className="item successM">
                <div className="data">
                  <span className="num">{merPayLineChartTitle && merPayLineChartTitle.succAmountSumTitle}</span>
                  <span>元</span>
                </div>
                <div className="text">成功交易额</div>
              </div>
            </Col>
            <Col span={6}>
              <div className="item amount">
                <div className="data">
                  <span className="num">{merPayLineChartTitle && merPayLineChartTitle.succCountTitle}</span>
                  <span>笔</span>
                </div>
                <div className="text">成功交易笔数</div>
              </div>
            </Col>
            <Col span={6}>
              <div className="item totalM">
                <div className="data">
                  <span className="num">{merPayLineChartTitle && merPayLineChartTitle.allAmountSumTitle}</span>
                  <span>元</span>
                </div>
                <div className="text">交易总额</div>
              </div>
            </Col>
            <Col span={6}>
              <div className="item totalA">
                <div className="data">
                  <span className="num">{merPayLineChartTitle && merPayLineChartTitle.allCountTitle}</span>
                  <span>笔</span>
                </div>
                <div className="text">交易总笔数</div>
              </div>
            </Col>
          </div>
        </Card>
      </Col>

      <style jsx>{`
                        .datePiker,.deal{
                            padding-top:40px;
                            height:150px;
                            background:#fff;
                        }
                        .title .timeCount{
                            position:absolute;
                            top:30px;
                            left:18px;
                            padding-left:10px;
                            font-size:16px;
                        }
                        .title .icon{
                            display:block;
                            position:absolute;
                            top:4px;
                            left:0;
                            width:6px;
                            height:16px;
                            border-radius:3px;
                            background:#00a1e9;
                        }
                        .deal .item{
                            font-size:16px;
                            text-align:center;
                        }
                        .deal .num{
                            font-size:32px;
                        }
                        .charts{
                            margin-top:17px;
                            height:640px;
                            background:#fff;
                        }
                        .charts .chart1,.charts .chart2{
                            position:relative;
                            height:320px;
                        }
                        .charts .chart{
                            position:absolute;
                            top:18px;
                            left:18px;
                            padding-left:15px;
                            font-size:16px;
                        }
                        .chart .icon{
                            display:block;
                            position:absolute;
                            top:7px;
                            left:0;
                            width:12px;
                            height:12px;
                            border-radius:6px;
                            background:#00a1e9;
                        }
                        .charts .chartBox1{
                            width:100%;
                            height:80%;
                            margin-top:20%;
                        }

                     `}
      </style>
    </Row>

  )
}
