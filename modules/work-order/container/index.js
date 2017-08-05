import React from 'react';
import {Row, Col, Button, Card, notification} from 'antd';
import {connect} from 'react-redux';
import Left from '../components/left';
import List from '../components/list';
import {loadWorkOrderAction,postHaveReadAction,postWorkOrderAction} from '../actions';
import DetailModal from '../components/detailModal';
import CollectionCreateForm from '../components/submmitModal';


//提交工单成功提示
const openNotificationWithIcon = (type) =>{
  notification[type]({
    message:'恭喜!!!',
    description:'您的工单已提交成功！',
  });
};

const styles = {
  loadMore:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    height:100
  }
}

class WorkOrder extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      visible:false,
      detailData:{},
      detailVisible:false,
      detailLoading:false,

    }
  }

  //详情页弹出框
  detailShowModal(){
    this.setState({
      detailVisible:true,

    });
  }

  saveFormRef = (form) =>{
    this.form = form;
  }

  //提交工单弹出框

  handleCancel = () =>{
    this.setState({visible:false});
  }
  handleCreate = () =>{
    const form = this.form;
    form.validateFields((err, values) =>{
      if (err) {
        return;
      }

      form.resetFields();
      this.setState({visible:false});
      const {dispatch} = this.props;
      dispatch(postWorkOrderAction({issueTitle:values.title, detail:values.des}));

    });
  }



  /*点击加载更多*/
  loadMore(){
    const {dispatch, workOrder:{search}} = this.props;
    this.props.workOrder.search.page = search.page + 1;
    // console.log(search);
    dispatch(loadWorkOrderAction(search));

  }

  render(){
    const {workOrder:{list, total, pending, search:{page, rows}}} = this.props;
    const listProps = {
      list,
      total,
      pending,
      /*点击列表项显示详情*/
      handleClick:(record)=>{
        const {workOrder:{list},dispatch} = this.props;
        if(record.haveRead==false){
          const newList = list.map((item)=>{
            if(record.id==item.id){
              item.haveRead=true;
            }
            return item;
          });
          this.props.workOrder.list = newList;
          dispatch(postHaveReadAction({id:record.id}))

        }
        const detailData = list.find((item)=>item.id == record.id);
        this.setState({
          detailData
        })
        this.detailShowModal();

      }
    }
    //详情页
    const detailProps = {
      handleOk:() =>{
        this.setState({
          detailLoading:true
        });
        setTimeout(() =>{
          this.setState({
            detailLoading:false,
            detailVisible:false

          });
        }, 1000);
      },

      handleCancel:() =>{
        this.setState({
          detailVisible:false
        });
      }
    }
    //左侧（checkbox和提交工单）
    const leftProps = {
      showModal:() =>{
        this.setState({visible:true});
      },
      /*点击checkbox*/
      onClickCheckbox:(num)=>{
        const {dispatch, workOrder:{search}} = this.props;
        this.props.workOrder.search.page = 1;
        this.props.workOrder.search.status = num / 1;
        dispatch(loadWorkOrderAction(search));
      }
    }
    return (
      <div>
        <Row gutter={12} >
          <Col span={4} >
            <Left {...leftProps} />
          </Col>

          <Col className="gutter-row" span={20} >
            <Card>
              <List {...listProps} />

              <Col span={24} style={styles.loadMore} >
                {
                  total / rows + 1 > page ? <Button onClick={()=>this.loadMore()} >加载更多...</Button> : <Button>我是有底线的...</Button>
                }
              </Col>
            </Card>


          </Col>

        </Row>
        <DetailModal
          visible={this.state.detailVisible}
          loading={this.state.detailLoading}
          detailData={this.state.detailData}
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
export  default connect(({workOrder})=>({workOrder}))(WorkOrder);