/**
 * Created by lihejia on 2017/7/21.
 */
import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import Header from '../components/header';
import Amount from '../components/amount';
import Trans from '../components/trans';
import {loadMainV} from '../actions';
/***
 * 主页可视化页面
 */
class MainV extends React.Component {

  constructor(props) {
    super(props);
    //时间格式化
    let formant = 'YYYY-MM-DD';
    //默认开始时间
    let beginTime = moment().format(formant);
    //默认结束时间
    let endTime = moment().format(formant);

    this.state = {
      beginTime,
      endTime,
      formant
    }
  }

  componentWillMount() {

    let {dispatch, mainV} = this.props;
    let {search:{startDate,endDate}} = mainV;
    let {beginTime, endTime} = this.state;
    let queryData = {
      beginTime,
      endTime
    }
    if(startDate){
      queryData = {
        beginTime:startDate,
        endTime:endDate
      }
    }
    dispatch(loadMainV(queryData))
  }

  render() {
    let {dispatch, mainV: {search:{startDate,endDate}, merPayLineChartTitle, merPayLineChartList}} = this.props;
    let {formant} = this.state;
    //统计参数、时间控件参数
    const headerProps = {
      startDate,
      endDate,
      beginTime: this.state.beginTime,
      endTime: this.state.endTime,
      merPayLineChartTitle,
      //时间选择函数
      onOk:(times)=>{
        let beginTime = times[0].format(formant);
        let endTime = times[1].format(formant);
        this.props.mainV.search.startDate = beginTime;
        this.props.mainV.search.endDate = endTime;
        const queryData = {
          beginTime,
          endTime
        }
        dispatch(loadMainV(queryData))
      }
    }
    let vProps;
    if (merPayLineChartList) {
      merPayLineChartList.map( (d) => {
        if (d.axis.length === 10) {
          d.axis = d.axis.slice(5);
        } else {
          let startHour = Number(d.axis) - 1;
          if (startHour < 10)  startHour = '0' + startHour ;
          d.axis = startHour + '-' + d.axis + '时'
        }
      });
      vProps = { merPayLineChartList }
    } else {
      vProps = {}
    }
    return (
      <div>
        <Header {...headerProps} />
        <Amount {...vProps} />
        <Trans {...vProps} />
      </div>
    )
  }
}


const propsMapToState = ({mainV}) => ({mainV})

export default connect(propsMapToState)(MainV);
