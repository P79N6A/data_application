import React, {Component} from 'react'
import { Card, Tabs, Tag,  Icon } from 'antd';
import styles from '../index.less'
import carbg1 from '../../../assets/car1.jpg'
import carbg2 from '../../../assets/car2.jpg'
import userImg from '../../../assets/user.png'
import homeImg from '../../../assets/home.png'
import comnp from '../../../assets/company.png'

const TabPane = Tabs.TabPane;

class Person extends Component{
    render() {
        return(
            <div className={styles.person}>
            
                {/* 信息栏 */}
                <Card
                        title="个人信息"
                        style={{width:325}}>
                <div className={styles.personDiv}>
                    
                    
                        {/* 头像 */}
                    <div className={styles.personImg}>
                        <img src={userImg}></img>

                    </div>
                    {/* 身份信息 */}
                    <div style={{marginTop:'10px'}}>
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
                 </Card>

                {/* 信息选项卡 */}
                <Tabs defaultActiveKey="1" className={styles.megTabs}>
                    <TabPane tab={<span><Icon type="home" />住房信息</span>} key="1">
                        <Card className = {styles.homeMeg}>
                            {/* 左边的房屋图像 */}
                            <div>
                                <img src={homeImg}></img>
                            </div>
                            {/* 右边的信息展示 */}
                            <div>
                                <p><label>户主姓名：</label><span>王立军</span></p>
                                <p><label>小区：</label><span>启山小区</span></p>
                                <p><label>楼栋号：</label><span>2栋5单元</span></p>
                                <p><label>房间号：</label><span>2-4</span></p>
                                <p><label>房屋地址：</label><span>云南省临沧市临翔区启山小区2栋5单元2-4</span></p>                                
                            </div>

                        </Card>
                        <Card className = {styles.homeMeg}>
                            {/* 左边的房屋图像 */}
                            <div>
                                <img src={homeImg}></img>
                            </div>
                            {/* 右边的信息展示 */}
                            <div>
                                <p><label>户主姓名：</label><span>王立军、梅兰</span></p>
                                <p><label>小区：</label><span>御景江山</span></p>
                                <p><label>楼栋号：</label><span>2单元</span></p>
                                <p><label>房间号：</label><span>11-5</span></p>
                                <p><label>房屋地址：</label><span>云南省临沧市御景江山2单元11-5</span></p>                                
                            </div>

                        </Card>
                    </TabPane>
                    <TabPane tab={<span><Icon type="bank" />单位信息</span>} key="7">
                    <Card className = {styles.homeMeg}>
                            {/* 左边的房屋图像 */}
                            <div>
                                <img src={comnp}></img>
                            </div>
                            {/* 右边的信息展示 */}
                            <div>
                                <p><label>全称：</label><span>临沧市山水管理有限公司</span></p>
                                <p><label>归属：</label><span>个人</span></p>
                                <p><label>法人代表：</label><span>王玉凤</span></p>
                                <p><label>联系方式：</label><span>单位前台</span></p>
                                <p><label>联系电话：</label><span>236-2659846</span></p> 
                                <p><label>具体地址：</label><span>云南省临沧市哲学路114号</span></p>                                 
                            </div>

                        </Card>
                    </TabPane>
                    {/* <TabPane tab={<span><Icon type="fire" />烟感信息</span>} key="2">
                    Tab 2
                    </TabPane> */}
                    <TabPane tab={<span><Icon type="file-exclamation" />警情</span>} key="3">
                    敬请期待
                    </TabPane>
                    <TabPane tab={<span><Icon type="user" />人脸抓拍</span>} key="4">
                    敬请期待
                    </TabPane>
                    <TabPane tab={<span><Icon type="alert" />告警信息</span>} key="5">
                    敬请期待
                    </TabPane>
                    {/* <TabPane tab={<span><Icon type="file-text" />MAC记录</span>} key="6">
                    敬请期待
                    </TabPane> */}
                    
                    {/* <TabPane tab={<span><Icon type="exception" />门禁记录</span>} key="8">
                    Tab 2
                    </TabPane> */}
                    {/* <TabPane tab={<span><Icon type="car" />车辆记录</span>} key="9">
                    敬请期待
                    </TabPane> */}
                </Tabs>
                {/* 车辆记录 */}
                <div>
                    <Card
                        title="车辆记录"
                        style={{width:325}}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="渝A 95064" key="1">
                                <img className = {styles.carImg} src={carbg1}/>
                                <Card className = {styles.carMeg}>
                                    <p><label>进出：</label><span>进入</span></p>
                                    <p><label>时间：</label><span>2017.01.05 17:04:15</span></p>
                                    <p><label>关卡：</label><span>大车场入口</span></p>
                                    <p><label>地址：</label><span>云南省临沧市临翔区人民小学停车场</span></p>
                                </Card>
                                <Card className = {styles.carMeg}>
                                    <p><label>进出：</label><span>出门</span></p>
                                    <p><label>时间：</label><span>2017.01.06 08:16:15</span></p>
                                    <p><label>关卡：</label><span>大车场入口</span></p>
                                    <p><label>地址：</label><span>云南省临沧市临翔区人民小学停车场</span></p>
                                </Card>
                            </TabPane>
                            <TabPane tab="渝A 95214" key="2"><img className = {styles.carImg} src={carbg2}></img></TabPane>
                        </Tabs>
                        {/* 车辆信息 */}
                        

                        
                    </Card>


                </div>


  
            </div>
        )
    }
}

export default Person;