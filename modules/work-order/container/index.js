import React from 'react';
import { Row, Col, Button, Card } from 'antd';
import { connect } from 'react-redux';
import Left from '../components/left';
import List from '../components/list';
import { loadWorkOrderAction, postHaveReadAction, postWorkOrderAction } from '../actions';
import DetailModal from '../components/detailModal';
import CollectionCreateForm from '../components/submmitModal';


const styles = {
  loadMore : {
    display : 'flex',
    justifyContent : 'center',
    alignItems : 'center',
    height : 100
  }
}

class WorkOrder extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible : false,
      detailData : {},
      detailVisible : false,
      detailLoading : false,

    }
  }

  //详情页弹出框
  detailShowModal() {
    this.setState({
      detailVisible : true,

    });
  }

  saveFormRef = (form) => {
    this.form = form;
  }

  //提交工单弹出框

  handleCancel = () => {
    this.setState({ visible : false });
  }
  handleCreate = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      form.resetFields();
      this.setState({ visible : false });
      const { dispatch } = this.props;
      dispatch(postWorkOrderAction({ issueTitle : values.title, detail : values.des }));

    });
  }


  /*点击加载更多*/
  loadMore() {
    const { dispatch, workOrder:{ search } } = this.props;
    this.props.workOrder.search.page = search.page + 1;
    // console.log(search);
    dispatch(loadWorkOrderAction(search));

  }

  render() {
    const { workOrder:{ list, total, pending, search:{ page, rows, status } } } = this.props;
    const listProps = {
      list,
      total,
      pending,
      /*点击列表项显示详情*/
      handleClick : (record)=> {
        const { workOrder:{ list }, dispatch } = this.props;
        if (record.haveRead == 1) {
          const newList = list.map((item)=> {
            if (record.feedbackNo == item.feedbackNo) {
              item.haveRead = 2;
            }
            return item;
          });
          this.props.workOrder.list = newList;
          dispatch(postHaveReadAction({ feedbackNo : record.feedbackNo }))

        }
        const detailData = list.find((item)=>item.feedbackNo == record.feedbackNo);
        this.setState({
          detailData
        })
        this.detailShowModal();

      }
    }
    //详情页
    const detailProps = {
      visible : this.state.detailVisible,
      loading : this.state.detailLoading,
      detailData : this.state.detailData,
      handleCancel : () => {
        this.setState({
          detailVisible : false
        });
      }
    }
    //左侧（checkbox和提交工单）
    const leftProps = {
      status,
      showModal : () => {
        this.setState({ visible : true });
      },
      /*点击checkbox*/
      onClickCheckbox : (num)=> {
        const { dispatch, workOrder:{ search } } = this.props;
        this.props.workOrder.search.page = 1;
        this.props.workOrder.search.status = num / 1;
        if(num==0){
          num=3
        }
        dispatch(loadWorkOrderAction({ ...search, status : num }));
      }
    }
    return (
      <div>
        <Row gutter={12}>
          <Col span={4}>
            <Left {...leftProps} />
          </Col>

          <Col className="gutter-row" span={20}>
            <Card>
              <List {...listProps} />

              <Col span={24} style={styles.loadMore}>
                {
                  total / rows > page ? <Button onClick={()=>this.loadMore()}>加载更多...</Button> : <div style={{ padding : '6px 15px', background : '#ccc', borderRadius : 5 }}>没有更多内容了...</div>
                }
              </Col>
            </Card>


          </Col>

        </Row>
        <DetailModal
          {...detailProps}
        />

        <CollectionCreateForm
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>

    )
  }


}
export  default connect(({ workOrder })=>({ workOrder }))(WorkOrder);