import { Modal, Menu, Divider, Radio,Input  } from 'antd';
import React, { Component } from 'react';
import styles from './index.less'

const { TextArea } = Input;
// 定义左侧边栏
const menuList = [
    {
        key: 'proView',
        tab: '流程试图',
    }, {
        key: 'netSetting',
        tab: '通知设置',
    },{
        key: 'failOption',
        tab: '失败选项',
    },{
        key: 'agreeSetting',
        tab: '一致性设置',
    },{
        key: 'paraSetting',
        tab: '参数设置',
    }];
  
  const contentList = {
    proView: <p>正在完善</p>,
    netSetting: 
        <div>
            {/* 通知设置头部 */}
            <div>
                <p className = {styles.contTitle}>故障通知</p>
                <p>在作业首次出现错误或流程以失败结束时发送通知.</p>
                <Divider/>
                <button>
                    出现错误
                </button>
                <button>
                    流程错误
                </button>
                <p className = {styles.contTitle}>故障邮箱</p>
                <Radio>覆盖流程设置邮箱</Radio>
                <p style={{fontWeight:'bord'}}>失败时向这些地址发送通知.逗号、空格或分号分隔不同的地址.</p>
                <TextArea rows={4}/>
                <p className = {styles.contTitle}>成功邮箱</p>
                <Radio>覆盖流程设置邮箱</Radio>
                <p style={{fontWeight:'bord'}}>成功时向这些地址发送通知.逗号、空格或分号分隔不同的地址.</p>
                <TextArea rows={4}/>
            </div>
        </div>,
    failOption: <p>正在完善</p>,
    agreeSetting: <p>正在完善</p>,
    paraSetting: <p>正在完善</p>,
  };  


class ExecuteFlow extends Component {
    constructor(props){
        super(props);
        this.state = {
            key:'proView',
            tab:'流程试图'
        };
    }
    
    onMenuChange = (key, type) => {
        this.setState({ [type]: key.key });
      }

    render() {
        return (
        <div>
            <Modal
            title="Execute Flow"
            style={{ top: 50, width:'80%'}}
            visible={true}
            className = {styles.menubody}
            defaultSelectedKeys={['1']}
            >
            
            <Menu
                className={styles.menuList}
                activeTabKey={this.state.key}
                onClick={(key) => { this.onMenuChange(key, 'key'); }}
                >
                {menuList.map((item) => {
                    return (
                        <Menu.Item key={item.key}>
                        {item.tab}
                        </Menu.Item>
                    )
                })}
            </Menu>
            <div style={{width:'66.7%'}}>
                {contentList[this.state.key]}
            </div>

            </Modal>    
        </div>
        );
    }
}

export default ExecuteFlow;