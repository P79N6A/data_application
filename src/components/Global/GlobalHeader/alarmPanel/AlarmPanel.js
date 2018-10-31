import React, { PureComponent } from "react";
import className from "classnames";
import styles from "../index.less";
import { Menu, Dropdown  } from 'antd';
import { connect } from "dva";
import SockJS from "SockJS";
import Stomp from "Stomp";

let stompClient = null;
const webSocket = window.SSystem.webSocket;

@connect(({ globalData, loading }) => ({
    globalData,
    loading: loading.models.globalData,
}))

class AlarmPanel extends PureComponent  {
    constructor(props) {
        super(props);
        this.state = {
            personList: [],
            carList: [],
            carNum: 0,
            personNum: 0,
        }
    }
    componentDidMount(){
        this.buildSocket();
        // let { globalData } = this.props;
        // setInterval(() => {
        //     let n = 100;
        //     n -= 5;
        //     globalData.carAlarmNum = n;
        // }, 1000);
    }
    componentWillReceiveProps(nextProps){
        const { globalData } = nextProps;
        if(globalData.carAlarmNum===0){
            this.setState({carNum: 0})
        }
        if(globalData.personAlarmNum===0){
            this.setState({personNum: 0})
        }
        // this.props.onClickChange = (e) => {
        //     this.setState({carNum: e});
        // }
        // console.log(globalData, 'globalData111111')
    }

    buildSocket = ()=>{
        let socket = new SockJS(webSocket);
        stompClient = Stomp.over(socket);
        let parseResponse = (respnose)=>{
            let responseMessage = JSON.parse(respnose.body).responseMessage;
            if(typeof responseMessage =="string"){
                responseMessage = JSON.parse(responseMessage.replace(/\'/g,"\""));
            }
            return responseMessage;
        }

        stompClient.connect({},(frame)=>{ 
            let { personList, carList, carNum, personNum } = this.state
            // 车辆告警
            stompClient.subscribe('/topic/alarm_car', (respnose) => {
                // let responseMessage = parseResponse(respnose);
                let responseMessage = JSON.parse(respnose.body) || [];
                carNum++;
                carList.unshift(responseMessage);
                this.setState({
                    personVisible: false,
                    carVisible: true,
                    carData: responseMessage,
                    carList,
                    carNum,
                });
                this.props.dispatch({
                    type: "globalData/setCarAlarmNum",
                    payload: carNum,
                });
                this.props.dispatch({
                    type: "globalData/setCarAlarmList",
                    payload: carList,
                });
                setTimeout(()=>{
                    this.setState({carVisible: false,})
                },10000);
            })
            // 人脸告警
            stompClient.subscribe('/topic/alarm_face',(respnose)=>{ 
                // console.log(respnose.body, JSON.parse(respnose.body), 'respnose');
                // let responseMessage = parseResponse(respnose);
                let responseMessage = JSON.parse(respnose.body) || [];
                personNum++;
                personList.unshift(responseMessage);
                this.setState({
                    carVisible: false,
                    personVisible: true,
                    personData: responseMessage,
                    personList,
                    personNum,
                });
                this.props.dispatch({
                    type: "globalData/setPersonAlarmNum",
                    payload: personNum,
                });
                this.props.dispatch({
                    type: "globalData/setPersonAlarmList",
                    payload: personList,
                });
                setTimeout(()=>{
                    this.setState({personVisible: false})
                },10000);

            })
       });
    }
    //跳转告警详情页面
    toAlarmDetail = (type) => {
        // const { personList, carList } = this.state
        // let storage = window.localStorage;
        let url = "";
        if(type===1){
            url = window.location.hash.includes("#") ? "#/personnelSystem/executeWarn" : "/personnelSystem/executeWarn";
            // storage.setItem("personAlarm", JSON.stringify(personList));
            // this.setState({ personList:[] });
            
        }else{
            url = window.location.hash.includes("#") ? "#/carSystem/carAlert" : "/carSystem/carAlert";
            // storage.setItem("carAlarm", JSON.stringify(carList));
            // this.setState({ carList:[] });
            
        }
        window.location.href = url;
    }
    render(){
        const { carNum, personNum } = this.state
        let total = personNum+carNum;
        const menu = (
            <Menu>
              <Menu.Item>
                <div style={{color:"#1890ff"}} onClick={()=>this.toAlarmDetail(1)}>
                    <span style={{color:"red"}}>{`${personNum}条人员告警`}</span>
                    未读
                </div>
              </Menu.Item>
              <Menu.Item>
                <div style={{color:"#1890ff"}} onClick={()=>this.toAlarmDetail(2)}>
                    <span style={{color:"red"}}>{`${carNum}条车辆告警`}</span>
                    未读
                    {/* <span style={{color:"red"}}>{carNum}</span>
                    条未读车辆告警信息 */}
                </div>
              </Menu.Item>
             
            </Menu>
          );
        return (
            <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter">
                <div className={styles.alarm_panel}>
                    告警消息
                    <div className={styles.num} style={{width:total>99?25:18}}>{total>99?"99+":total}</div>
                    {/* <i className={className(styles.icon, "anticon anticon-warning")}></i> */}
                </div>
            </Dropdown>
        );
    };
}


/**
 * 告警信息面板
 */
export default AlarmPanel;

