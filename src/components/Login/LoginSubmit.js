import React from 'react';
import classNames from 'classnames';
import { Button, Form } from 'antd';
import styles from './index.less';

const FormItem = Form.Item;

const LoginSubmit = ({ className, ...rest }) => {
  const clsString = classNames(styles.submit, className);
  return (
    <FormItem>
      <Button className={clsString}
              htmlType="submit"
              size="large"
              type="primary"
              {...rest}
      />
    </FormItem>
  );
};

export default LoginSubmit;
