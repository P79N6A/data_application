import React, { PureComponent } from 'react';
import { Button, Card, Col, Collapse, Modal, Row, Tabs } from 'antd';
import { Link, withRouter } from 'dva/router';
import { connect } from 'dva/index';

import Header from '../Header';
import AddProject from './AddProject';

const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;

class Project extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      personData: [],
      groupData: [],
      allData: [],
      visible: false,
      loading: true
    };
  }

  _handleCallback = (key) => {
    console.log(key);
  };

  _handleFormUpdate = (child) => {
    console.log(child);
    this.addModal = child;
  };

  show = () => {
    this.setState({ visible: true });
  };

  close = () => {
    this.setState({ visible: false });
  };

  update = (data) => {
    data && this.state.personData.push(data);
  };

  getData = () => {
    this.setState({loading:true});
    this.props.dispatch({
      type: 'project/getProjectData',
      payload: {},
    });
    this.timer = setTimeout(() => {
      this.setState({
        personData:this.props.projectData,
        loading:false
      })
    }, 1000 * .5);
  };

  _renderProjectData = (preData) => {
    const customStyle = {
      width: '90%',
    };
    const customPanelStyle = {
      paddingBottom: 24,
    };
    if(preData.length) {
      return (
        <Row type="flex" justify="start">
          <Col span={2}/>
          <Col span={20}>
            <Collapse bordered={false} style={customStyle}>
              {preData && preData.map((item, index) => {
                const data = { project: item.title };
                const path = { pathname: '/task/project', query: data };
                return (
                  <Panel header={item.title} key={index} style={customPanelStyle}>
                    <Card
                      title={item.title}
                      extra={<Link to={path}>More</Link>}
                    >
                      <p>{item.value}</p>
                    </Card>
                  </Panel>
                );
              })}
            </Collapse>
          </Col>
        </Row>
      );
    }
    else {
      return (
        <div>
          没有项目数据
        </div>
      )
    }
  };

  _renderContent = (param) => {
    const count = Object.keys(param).length;
    const projectName = count ? param['project'] : '';

    if(this.state.loading) {
      return(
        <div>
          <span style={{fontSize:'30'}}>Loding...</span>
        </div>
      )
    }
    else {
      if (count) {
        return (
          <>
            <Header title={projectName} Remove Upload Download/>
            <Button
              onClick={() => {
                this.props.history.goBack();
              }}
            >
              返回
            </Button>
          </>
        );
      }

      else {
        return (
          <>
            <Header title="项目管理" Search Add={this}/>
            <div>
              <Tabs
                defaultActiveKey="person"
                onChange={this._handleCallback}
                tabPosition="left"
              >
                <TabPane tab="个人" key="person">
                  {this._renderProjectData(this.state.personData)}
                </TabPane>
                <TabPane tab="工作组" key="group">
                  {this._renderProjectData(this.state.groupData)}
                </TabPane>
                <TabPane tab="所有" key="all">
                  {this._renderProjectData(this.state.allData)}
                </TabPane>
              </Tabs>
            </div>
          </>
        );
      }
    }
  };

  componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <div>
        {this._renderContent(this.props.location.query)}
        <div>
          <Modal
            title="新建项目"
            destroyOnClose={true}
            okText="添加"
            cancelText="取消"
            onOk={() => {
              this.addModal && this.addModal.handleSubmit();
            }}
            onCancel={this.close}
            visible={this.state.visible}
          >
            <AddProject
              onCancel={this.close}
              personData={this.state.personData}
              update={this.update}
              onRef={this._handleFormUpdate}
            />
          </Modal>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ project }) {
  return project;
}

export default withRouter(connect(mapStateToProps)(Project));
