import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Checkbox, Alert, Icon } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';
import bg from '../../assets/bg.png';

const { Tab, UserName, PassWord, Submit } = Login;


function map({ user, loading }) {
  return { user, submitting: loading.effects['login/login'] };
}

@connect(map)
class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };

  onTabChange = type => {
    this.setState({ type });
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'user/userLogin',
        payload: {
          ...values,
          type,
        },
      });

    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => (
    <Alert
      message={content}
      showIcon
      style={{ marginBottom: 24 }}
      type="error"
    />
  );

  render() {
    const { user, submitting } = this.props;
    const { type, autoLogin } = this.state;
    return (
      <div
        className={styles.main}
        style={{ backgroundImage: bg }}
      >
        <Login
          defaultActiveKey={type}
          onSubmit={this.handleSubmit}
          onTabChange={this.onTabChange}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <Tab
            key="account"
            tab="账户密码登录"
          >
            {user.status === 'error' &&
            user.type === 'account' &&
              !submitting &&
              this.renderMessage('账户或密码错误（admin/888888）')}
            <UserName
              name="userName"
              placeholder="admin/user"
            />
            <PassWord
              name="passWord"
              onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
              placeholder="888888/123456"
            />
          </Tab>
          <div>
            <Checkbox
              checked={autoLogin}
              className={this.state.autoLogin ? styles['text-auto'] : styles['text-w']}
              onChange={this.changeAutoLogin}
            >
              自动登录
            </Checkbox>
            <a
              href="#"
              style={{ float: 'right' }}
            >
              忘记密码
            </a>
            <Link
              className={styles.register}
              to="/User/Register"
            >
              注册账户
            </Link>
          </div>
          <Submit loading={submitting}>登录</Submit>
        </Login>
      </div>
    );
  }
}

export default LoginPage;
