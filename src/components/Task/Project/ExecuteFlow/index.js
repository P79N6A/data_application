import { Menu, Modal } from 'antd';
import React, { Component } from 'react';

import styles from './index.less';
import AgreeSetting from './AgreeSetting';
import FailOption from './FailOption';
import NetSetting from './NetSetting';
import ParaSetting from './ParaSetting';
import ProView from './ProView';

// 定义左侧边栏
const menuList = [
  {
    key: 'proView',
    tab: '流程试图',
  }, {
    key: 'netSetting',
    tab: '通知设置',
  }, {
    key: 'failOption',
    tab: '失败选项',
  }, {
    key: 'agreeSetting',
    tab: '一致性设置',
  }, {
    key: 'paraSetting',
    tab: '参数设置',
  }];



const contentList = {
  proView: 
    <ProView />,
  netSetting:
    <NetSetting />,
  failOption:
    <FailOption />,
  agreeSetting:
    <AgreeSetting />,
  paraSetting:
    <ParaSetting />,
};


class ExecuteFlow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 'proView',
      tab: '流程试图',
      visible: false,
    };
  }

  onMenuChange = (key, type) => {
    this.setState({ [type]: key.key });
  };

  // _handleCancel = () => {
  //     this.props.dispatch({
  //         type: 'project/hideModal'
  //     })
  // };

  _handleCancel = () => {
    this.setState({ visible: false });
  };

  show = (data) => {
    this.setState({ visible: true });
  };

  render() {
    return (
      <div>
        <Modal
          title={"Execute Flow" + " " + this.props.title || "Execute Flow"}
          style={{ top: 20, width: '80%' }}
          visible={this.state.visible}
          className={styles.menubody}
          defaultSelectedKeys={['1']}
          okText="执行"
          cancelText="取消"
          onCancel={this._handleCancel}
        >

          <Menu
            className={styles.menuList}
            onClick={(key) => {
              this.onMenuChange(key, 'key');
            }}
          >
            {menuList.map((item) => {
              return (
                <Menu.Item key={item.key}>
                  {item.tab}
                </Menu.Item>
              );
            })}
          </Menu>
          <div style={{ width: '66.7%' }}>
            {contentList[this.state.key]}
          </div>

        </Modal>
      </div>
    );
  }
}


export default ExecuteFlow;
