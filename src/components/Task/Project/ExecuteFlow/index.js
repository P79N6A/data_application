import { Modal, Menu, Divider, Radio, Input, Checkbox, Select } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';

import styles from './index.less'

const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;


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
const selectList = [
    {
        value: '1',
        cont: '完成当前运行作业',
    }, {
        value: '2',
        cont: '取消所有作业',
    }, {
        value: '3',
        cont: '尽可能完成作业',
    }
];


const RedioList = [
    {
        value: '1',
        title: '跳过执行',
        cont: '不启动已经运行中的流程.',

    }, {
        value: '2',
        title: '一致执行',
        cont: '强制执行流程. 之前的执行不会被影响.',
    }
];



const contentList = {
    proView: <p>正在完善</p>,
    netSetting:
        <div>
            {/* 通知设置头部 */}
            <div>
                <p className={styles.contTitle}>故障通知</p>
                <p>在作业首次出现错误或流程以失败结束时发送通知.</p>
                <Divider />
                <button>
                    出现错误
                </button>
                <button>
                    流程错误
                </button>
                <p className={styles.contTitle}>故障邮箱</p>
                <Checkbox >覆盖流程设置邮箱</Checkbox>
                <p style={{ fontWeight: 'bord' }}>失败时向这些地址发送通知.逗号、空格或分号分隔不同的地址.</p>
                <TextArea rows={4} disabled={'disabled'}/>
                <p className={styles.contTitle}>成功邮箱</p>
                <Checkbox>覆盖流程设置邮箱</Checkbox>
                <p style={{ fontWeight: 'bord' }}>成功时向这些地址发送通知.逗号、空格或分号分隔不同的地址.</p>
                <TextArea rows={4} disabled={'disabled'}/>
            </div>
        </div>,
    failOption:
        <div>
            <p className={styles.contTitle}>失败选项</p>
            <p>当一个流程失败时，选择需要执行的操作</p>
            <Divider />
            <ul className={styles.listStyleSet}>
                <li><span style={{ fontWeight: 'bord' }}>完成当前运行作业</span> 只完成当前运行的作业.该操作不会启动任何新作业.</li>
                <li><span style={{ fontWeight: 'bord' }}>取消所有作业</span> 立即结束所有的作业，同时修改流程状态为失败.</li>
                <li><span style={{ fontWeight: 'bord' }}>尽可能完成作业</span> 该操作会尽可能的保持作业执行.</li>
            </ul>
            <Select defaultValue="1" style={{ width: 180, marginTop: 15 }} >
                {
                    selectList.map((item) => {
                        return (
                            <Option value={item.value}>{item.cont}</Option>
                        )
                    })
                }
            </Select>

        </div>,
    agreeSetting:
        <div>
            <p className={styles.contTitle}>一致性执行选项</p>
            <p>流程运行中有以下选项可以设置.</p>
            <Divider />
            <RadioGroup>
                {
                    RedioList.map((item) => {
                        return (
                            <div>
                                <Radio value={item.value}>{item.title}</Radio>
                                <p>{item.cont}</p>
                            </div>
                        )
                    })

                }
                <Radio value='3' style={{display:'block'}}>排序执行</Radio>
                <Select defaultValue="1" style={{ width: 180, marginTop: 15 }} >
                    <Option value='1'>level1</Option>
                    <Option value='2'>level2</Option>
                </Select>
                <p>管道执行流程，使当前执行流程不会被覆盖.</p>
                <ul className = {styles.listStyleSet}>
                    <li>
                        级别 1: 阻止作业A直到前一个流程作业A完成.
                    </li>
                    <li>
                        级别 2: 阻止作业A直到前一个流程作业A的子作业完成.
                    </li>
                </ul>
            </RadioGroup>

        </div>,
    paraSetting: 
        <div>
            <p className={styles.contTitle}>流程参数覆盖</p>
            <Divider />
        </div>,
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
    }

    // _handleCancel = () => {
    //     this.props.dispatch({
    //         type: 'project/hideModal'
    //     })
    // };

    _handleCancel = () =>{
        this.setState({ visible : false });
    }

    showModal = () =>{
        this.setState({ visible : true});
    }

    render() {
        return (
            <div>
                <Modal
                    title="Execute Flow"
                    style={{ top: 50, width: '80%' }}
                    visible={this.props.executeFlowVisible}
                    className={styles.menubody}
                    defaultSelectedKeys={['1']}
                    okText = "执行"
                    cancelText = "取消"
                    onCancel={this._handleCancel}
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
                    <div style={{ width: '66.7%' }}>
                        {contentList[this.state.key]}
                    </div>

                </Modal>
            </div>
        );
    }
}

function mapStateToProps({ project }) {
    return project;
}

export default connect(mapStateToProps)(ExecuteFlow);
