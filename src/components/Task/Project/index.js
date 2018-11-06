import React, { PureComponent } from 'react';
import { Button, Card, Col, Collapse, Divider, Modal, Row, Tabs } from 'antd';
import { Link, Redirect, withRouter } from 'dva/router';
import { connect } from 'dva';

import AddProject from './AddProject';
import ExecuteFlow from './ExecuteFlow';
import Header from '../Header';
import ProjectFlow from './ProjectFlow';
import ProjectLog from './ProjectLog';
import style from './index.less';

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
      loading: true,
    };
  }

  _handleCallback = (key) => {
    // console.log(key);
  };

  getData = () => {
    this.setState({ loading: true });
    this.props.dispatch({
      type: 'project/getProjectData',
    });
    setTimeout(() => {
      this.setState({
        personData: this.props.projectData,
        loading: false,
      });
    }, 1000 * .5);
  };

  searchData = (value) => {
    this.setState({ loading: true });
    this.props.dispatch({
      type: 'project/getProjectData',
      payload:{
        search:value
      }
    });
    setTimeout(() => {
      this.setState({
        personData: this.props.projectData,
        loading: false,
      });
    }, 1000 * .5);
  };

  showExcFlow = (e, id) => {
    e.stopPropagation();
    this.execFlow && this.execFlow.show(id);
  };

  _renderProjectData = (preData) => {
    const customStyle = {
      width: '90%',
      borderRadius: '15px',
    };
    const customPanelStyle = {
      paddingBottom: 24,
    };
    if (preData.length) {
      console.log(preData.length);
      return (
        <Row type="flex" justify="start">
          <Col span={2}/>
          <Col span={20}>
            <Collapse style={customStyle}>
              {preData && preData.map((item, index) => {
                const data = { project: item.title ? item.title : ""};
                const path = { pathname: '/task/project', query: data };
                return (
                  <Panel header={item.title ? item.title : ""} key={index} style={customPanelStyle}>
                    <Card
                      title={item.title ? item.title : ""}
                      extra={<Link to={path}>更多</Link>}
                    >
                      <p>{item.value ? item.value : ""}</p>
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
      );
    }
  };

  _renderContent = (param) => {
    const count = Object.keys(param).length;
    const projectName = count ? param['project'] : '';

    if (count && this.state.personData) {
      const projectDetail = this.state.personData.find((item) => {
        return item.title === projectName;
      });
      if (!projectDetail) {
        return (<Redirect to="/task/project"/>);
      }
      else {
        return (
          <>
            <Header title={projectName} Remove Upload Download/>
            <div>
              <Row gutter={12}>
                <Col span={18}>
                  <Tabs
                    defaultActiveKey="flow"
                    onChange={this._handleCallback}
                    type="card"
                  >
                    <TabPane tab="流程" key="flow">
                      <ProjectFlow showExcFlow={this.showExcFlow}/>
                    </TabPane>
                    <TabPane tab="项目日志" key="log">
                      <ProjectLog/>
                    </TabPane>
                  </Tabs>
                </Col>
                <Col span={6}>
                  <div className={style.projectDetail}>
                    <h2><strong>{projectName}</strong></h2>
                    <Divider/>
                    <p><strong>创建时间:</strong> {projectDetail.create_time}</p>
                    <p><strong>修改时间:</strong> {projectDetail.modify_time}</p>
                    <p><strong>修改人:</strong> {projectDetail.modifier}</p>
                    <Divider/>
                    <p><strong>项目管理人:</strong> {projectDetail.manager}</p>
                    <div className='fr'>
                      <Button style={{ margin: '20px 20px' }}
                              onClick={() => {
                                this.getData();
                                this.props.history.goBack();
                              }}
                      >
                        返回
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
              <ExecuteFlow ref={ref => {
                this.execFlow = ref;
              }} title="test123"/>
            </div>
          </>
        );
      }
    }

    else {
      return (
        <>
          <Header title="项目管理" Search={this.searchData} Add={this.Add} />
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
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div>
        {this._renderContent(this.props.location.query)}
        <div>
          <AddProject
            getData={this.getData}
            Add={ref =>{this.Add = ref}}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ project }) {
  return project;
}

export default withRouter(connect(mapStateToProps)(Project));
