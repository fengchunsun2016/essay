/**
 * Created by lihejia on 2017/7/21.
 */
import React from 'react';
import {Row,Col,Card} from 'antd';
import createG2 from 'g2-react';

const Line = createG2(chart => { chart.col('axis', {
  alias: '交易时间',
  range: [0, 1]
});
  chart.col('amountSum', {
    alias: '交易额'
  });
  chart.line().position('axis*amountSum').size(2);
  chart.render();
});


const state={
  width: 500,
  height: 250,
  plotCfg: {
    margin: [15, 100, 60, 120],
  },
}

/**
 * 可视化参数
 * @param merPayLineChartList
 * @returns {React Component}
 */
export default ({merPayLineChartList=[]})=>{

  return (
    <Row style={{padding:2}}>
      <Col span={24}>
        <Card>
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