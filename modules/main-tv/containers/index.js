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

    let {dispatch} = this.props;
    let {beginTime, endTime} = this.state;
    const queryData = {
      beginTime,
      endTime
    }
    dispatch(loadMainV(queryData))
  }

  render() {
    let {dispatch, mainV: {merPayLineChartTitle, merPayLineChartList}} = this.props;
    let {formant} = this.state;

    //统计参数、时间控件参数
    const headerProps = {
      beginTime: this.state.beginTime,
      endTime: this.state.endTime,
      merPayLineChartTitle,
      //时间选择函数
      onOk(times){
        let beginTime = times[0].format(formant);
        let endTime = times[1].format(formant);
        const queryData = {
          beginTime,
          endTime
        }
        dispatch(loadMainV(queryData))

      }
    }

    //可视化数据参数
    let vProps = {
      //做null处理，防止抛出警告
      merPayLineChartList: merPayLineChartList ? merPayLineChartList : []
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