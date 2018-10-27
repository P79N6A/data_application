import React, {Component} from 'react'
import { Card, Tabs, Tag,  Icon } from 'antd';
import styles from '../index.less'

const TabPane = Tabs.TabPane;

class Person extends Component{
    render() {
        return(
            <div className={styles.person}>
                {/* 头部title */}
                <div className={styles.personTitle}>
                    <h2>一人一档</h2>
                </div>


                {/* 信息栏 */}
                <div className={styles.personMegDiv}>
                    {/* 头像 */}
                    <div className = {styles.personImg}>
                        <img></img>

                    </div>
                    {/* 身份信息 */}
                    <div>
                        <ul>
                            <li>
                                <label>姓名：</label>
                                <span>王立军</span>
                            </li>
                            <li>
                                <label>性别：</label>
                                <span>男</span>
                            </li>
                            <li>
                                <label>身份证号：</label>
                                <span>500988852254786584</span>
                            </li>
                            <li>
                                <label>民族：</label>
                                <span>白族</span>
                            </li>
                            <li>
                                <label>国籍：</label>
                                <span>中国</span>
                            </li>
                            <li>
                                <label>文化程度：</label>
                                <span>本科</span>
                            </li>
                            <li>
                                <label>人物标签：</label>
                                <span>
                                    <Tag color="#f50">楼组长</Tag>
                                    <Tag color="#2db7f5">志愿者</Tag>
                                </span>
                            </li>
                            <li>
                                <label>婚姻状况：</label>
                                <span>未婚</span>
                            </li>
                            <li>
                                <label>居住住址：</label>
                                <span>云南省临沧市临翔区永德县大王乡杏花村114号</span>
                            </li>
                            <li>
                                <label>电话：</label>
                                <span>15023989562</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 信息选项卡 */}
                <Tabs defaultActiveKey="2">
                    <TabPane tab={<span><Icon type="home" />住房信息</span>} key="1">
                    Tab 1
                    </TabPane>
                    <TabPane tab={<span><Icon type="fire" />烟感信息</span>} key="2">
                    Tab 2
                    </TabPane>
                    <TabPane tab={<span><Icon type="file-exclamation" />警情</span>} key="3">
                    Tab 2
                    </TabPane>
                    <TabPane tab={<span><Icon type="user" />人脸抓拍</span>} key="4">
                    Tab 2
                    </TabPane>
                    <TabPane tab={<span><Icon type="alert" />告警信息</span>} key="5">
                    Tab 2
                    </TabPane>
                    <TabPane tab={<span><Icon type="file-text" />MAC记录</span>} key="6">
                    Tab 2
                    </TabPane>
                    <TabPane tab={<span><Icon type="bank" />单位信息</span>} key="7">
                    Tab 2
                    </TabPane>
                    <TabPane tab={<span><Icon type="exception" />门禁记录</span>} key="8">
                    Tab 2
                    </TabPane>
                    <TabPane tab={<span><Icon type="car" />车辆记录</span>} key="9">
                    Tab 2
                    </TabPane>
                </Tabs>
                {/* 车辆记录 */}
                <div>
                    <Card
                        title="车辆记录"
                        style={{width:300}}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="渝A 95064" key="1"><img className = {styles.carImg} /></TabPane>
                            <TabPane tab="渝A 95214" key="2"><img className = {styles.carImg}></img></TabPane>
                            <TabPane tab="渝A 43264" key="3"><img className = {styles.carImg}></img></TabPane>
                        </Tabs>

                        
                    </Card>


                </div>


  
            </div>
        )
    }
}

export default Person;