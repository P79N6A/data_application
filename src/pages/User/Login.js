import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Checkbox, Alert, Icon } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';
import bg from '../../assets/bg.png';

const { Tab, UserName, Password, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };

  onTabChange = type => {
    this.setState({ type });
  };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      this.loginForm.validateFields(['mobile'], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;
          dispatch({
            type: 'login/getCaptcha',
            payload: values.mobile,
          })
            .then(resolve)
            .catch(reject);
        }
      });
    });

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        }
      });
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => (
    <Alert message={content}
           showIcon
           style={{ marginBottom: 24 }}
           type="error"
    />
  );

  render() {
    const { login, submitting } = this.props;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}
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
          <Tab key="account"
               tab="账户密码登录"
          >
            {login.status === 'error' &&
              login.type === 'account' &&
              !submitting &&
              this.renderMessage('账户或密码错误（admin/888888）')}
            <UserName name="userName"
                      placeholder="admin/user"
            />
            <Password
              name="password"
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
            <a href="#"
               style={{ float: 'right' }}
            >
              忘记密码
            </a>
            <Link className={styles.register}
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
