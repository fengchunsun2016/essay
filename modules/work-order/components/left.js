import React from 'react';
import {Row, Col, Card, Checkbox, Button} from 'antd';


const styles = {
  sameStyle: {
    width: '100%',
    height: 150,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    border: 'none'

  },
  topStyle: {
    borderBottom: '1px dashed #f19800'
  }
}

export default class Left extends React.Component {

  onChange(arr) {
    let num = 0;
    if (arr.length != 0) {
      num = arr.reduce((a, b)=>a / 1 + b / 1)
    } else {
      num = 0
    }

    this.props.onClickCheckbox(num);

  }
  render(){
    const {status} = this.props;

    return (
      <Row>
        <Card style={{...styles.sameStyle, ...styles.topStyle}}>
          <Checkbox.Group onChange={(arr)=>this.onChange(arr)} defaultValue={status==3?['1', '2']:(status==2?['2']:(status==1?['1']:[]))}>
            <Col span={24}>
              <Checkbox style={{fontSize: '14px'}} value="2">已解决</Checkbox>
            </Col>
            <Col span={24}>
              <Checkbox style={{fontSize: '14px'}} value="1">待解决</Checkbox>
            </Col>
          </Checkbox.Group>

        </Card>
        <Card style={{...styles.sameStyle}}>
          <Button type="primary" onClick={this.props.showModal}>提交工单</Button>
        </Card>

      </Row>
    )
  }


}





