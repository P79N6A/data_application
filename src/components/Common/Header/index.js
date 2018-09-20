import React, {PureComponent} from 'react';
import {Icon, Popover} from 'antd';
import styles from './index.less'
import logo from '../../../assets/logo/logo.png';
import {getCookie} from "../../../utils/utils";


export default class VideoHeader extends PureComponent {

  render() {
    console.log()
    let username = getCookie('username')
    const content = (
      <div style={{height: '60px'}}>
        <p style={{color: '#595959'}}><Icon type="setting"/>设置</p>
        <p style={{color: '#595959'}}><Icon type="poweroff"/>
          <a href="/logout">退出</a>
        </p>
      </div>
    );
    const contentAlarm = (
      <div style={{height: '30px'}}>
        <Icon type="bell" theme="filled" style={{color: '#f44336'}}/>12
        <Icon type="bell" theme="filled" style={{color: '#e91e63'}}/>12
        <Icon type="bell" theme="filled" style={{color: '#ff9800'}}/>12
        <Icon type="bell" theme="filled" style={{color: '#8bc34a'}}/>12
      </div>
    );
    return (
      <div className={styles.headerWrap}>
        <div className={styles.logoWrap}>
          <img className={styles.logo} src={logo} alt="logo"/>
          <span>紫光华智安防项目</span>
        </div>
        <div>

        </div>
        <div className={styles.info}>
          <Popover content={contentAlarm} trigger="click">
            <Icon type="info-circle" theme={"filled"}/>
            <span className={styles.pops1}><span>{56}</span></span>
          </Popover>
        </div>
        <div className={styles.userInfoPanel}>
          <Icon type="user"/><span className={styles.userName}>{username}</span>
          <Popover placement="bottomLeft" arrowPointAtCenter content={content} trigger="click">
            <Icon type="down"/>
          </Popover>
        </div>
      </div>
    );
  }
}
