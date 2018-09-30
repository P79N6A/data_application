import React from 'react';
import { Icon } from 'antd';
import styles from './index.less';

export default {
  UserName: {
    props: {
      size: 'large',
      prefix: <Icon className={styles.prefixIcon}
                    type="user"
      />,
      placeholder: 'admin',
    },
    rules: [
      {
        required: true,
        message: 'Please enter username!',
      }
    ]
  },
  Password: {
    props: {
      size: 'large',
      prefix: <Icon className={styles.prefixIcon}
                    type="lock"
      />,
      type: 'password',
      placeholder: '888888',
    },
    rules: [
      {
        required: true,
        message: 'Please enter password!',
      }
    ]
  },
  Mobile: {
    props: {
      size: 'large',
      prefix: <Icon className={styles.prefixIcon}
                    type="mobile"
      />,
      placeholder: 'mobile number',
    },
    rules: [
      {
        required: true,
        message: 'Please enter mobile number!',
      },
      {
        pattern: /^1\d{10}$/,
        message: 'Wrong mobile number format!',
      }
    ]
  },
  Captcha: {
    props: {
      size: 'large',
      prefix: <Icon className={styles.prefixIcon}
                    type="mail"
      />,
      placeholder: 'captcha',
    },
    rules: [
      {
        required: true,
        message: 'Please enter Captcha!',
      }
    ]
  }
};
