/**
 * Created by lihejia on 2017/7/21.
 */
import React from 'react';
import { Row, Col, Card } from 'antd';
import createG2 from 'g2-react';

const state = {
  width : 500,
  height : 250,
  plotCfg : {
    margin : [15, 100, 60, 120],
  },
}

const styles = {
  title : {
    fontSize : 16,
  },
  icon : {
    display : 'inline-block',
    marginRight : 5,
    width : 10,
    height : 10,
    borderRadius : '50%',
    background : '#1c9ed8',

  }
}

/**
 * 可视化参数
 * @param merPayLineChartList
 * @returns {React Component}
 */

export default ({ merPayLineChartList = [] })=> {
  const Line = createG2(chart => {
    chart.cols({
      'count' : {
        alias : '交易笔数',
      },
      'axis' : {
        range : [0, 1]
      }
    });
    chart.axis('count', {
      title : null,
    });
    chart.axis('axis', {
      title : null,
    });
    chart.line().position('axis*count').size(2);
    chart.render();
  });

  return (
    <Row style={{ padding : 2 }}>
      <Col span={24}>
        <Card>
          <div className="title" style={styles.title}>
            <span className="icon" style={styles.icon} />
            <span>交易笔数（笔）</span>
          </div>
          <Line
            data={merPayLineChartList}
            width={state.width}
            height={state.height}
            plotCfg={state.plotCfg}
            forceFit
          />
        </Card>
      </Col>
    </Row>
  )
}
