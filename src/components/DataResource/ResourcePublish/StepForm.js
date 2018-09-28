/* eslint-disable no-unused-vars,react/no-direct-mutation-state,no-const-assign */
import { Steps, Button, message, Select, Form, Input } from 'antd';
import React from 'react';
import styles from './StepForm.less';
import getValidateForm from '../../Common/Form/ValidateForm';
import getRowForm from '../../Common/Form/RowForm';
import FormDetail from './FormDetail';
import CustomForm from '../../Common/Form/CustomForm';
import Reg from '../../../utils/RegExp';

const FormItem = Form.Item;

const Step = Steps.Step;

class ResourceApplyPure extends React.Component {
  constructor(props) {
    super(props);
    this.getChildForm = this.getChildForm.bind(this);
    this.addParam = this.addParam.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.next = this.next.bind(this);
    this.goNext = this.goNext.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleStepClick = this.handleStepClick.bind(this);
    this.saveParams = this.saveParams.bind(this);
    this.state = {
      current: 0,
      paramNum: 1,
      childForm: [],
      formValue: {
        apiMenu: '',
        apiName: ' ',
        apiDesc: '',
        serviceName: '',
        apiType: '',
        requestType: '',
        params: [],
      },
      steps: [],
    };
  }

  // 校验通过后缓存表单数据
  next(values, length, i, to, key) {
    // 存在参数则缓存
    if (key === 3 && Object.keys(values).length > 0) {
      this.saveParams(values);
    } else if (Object.keys(values).length > 0) {
      for (const k in values) {
        this.state.formValue[k] = values[k];
      }
    }
    console.log(this.state.formValue);
    // 校验之前的表单不进入下一个
    if (length !== i + 1) {
      return;
    }

    // 点击头部步骤条快速跳转
    if (to >= 0) {
      this.setState({ current: to });
    } else {
      // 点击按钮前进--最大3
      let current = this.state.current + 1;
      current = current > 3 ? 3 : current;
      this.setState({ current });
    }
  }

  // 先校验，通过后进入下一个表单
  goNext(to) {
    this.state.childForm.forEach(
      (v, i) => v.handleSubmit(this.state.childForm.length, i, to) === true,
    );
  }

  // 将参数param分割为json数组
  saveParams(values) {
    const param = {};
    const params = [];
    for (const k in values) {
      param[k] = values[k];
    }
    const ks = Object.keys(param);
    ks.forEach((k, i) => {
      const arr = k.split('-');
      if (!params[arr[1]]) {
        params[arr[1]] = {};
      }
      params[arr[1]][arr[0]] = param[k];
    });
    this.state.formValue.params = params;
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  getChildForm(ref, k) {
    ref.key = k;
    const hasIndex = this.state.childForm.forEach((v, i) => {
      if (v.key === k) {
        return i;
      }
    });
    if (!hasIndex >= 0) {
      this.state.childForm.push(ref);
    } else {
      this.state.childForm[hasIndex] = ref;
    }
  }

  handleDelete() {
    const n = this.state.paramNum - 1;
    this.setState({ paramNum: n });
  }

  handleStepClick(e) {
    const txt = e.target.innerText;
    let res;
    if (String(txt - 0) !== 'NaN') {
      res = txt - 1;
    } else {
      this.state.steps.forEach((v, i) => {
        if (txt === v.title) {
          res = i;
        }
      });
    }
    if (typeof res === 'undefined') {
      return;
    }
    this.goNext(res);
  }

  handleFormSubmit() {
    message.success('提交成功');
  }

  addParam() {
    const n = this.state.paramNum + 1;
    this.setState({ paramNum: n });
  }

  render() {
    const FormS1 = getValidateForm({
      state: this.state,
      key: 1,
      getForm: this.getChildForm,
      childFormSubmit: this.handleFormSubmit,
      formValue: this.state.formValue,
      next: this.next,
      FormItems: [
        { label: '接口名称', name: 'apiName' },
        { label: '接口目录', name: 'apiMenu' },
        { label: '接口描述', name: 'apiDesc' },
      ],
    });
    const FormS2 = getValidateForm({
      state: this.state,
      key: 2,
      getForm: this.getChildForm,
      childFormSubmit: this.handleFormSubmit,
      formValue: this.state.formValue,
      next: this.next,
      FormItems: [
        { label: '服务名称', name: 'serviceName', type: 'option', optionData: [1, 2, 3] },
        { label: '接口路径', name: 'apiPath' },
        {
          label: '请求类型',
          name: 'requestType',
          type: 'option',
          optionData: ['get', 'post', 'delete'],
        },
      ],
    });

    const FormS3 = getRowForm({
      num: this.state.paramNum,
      onDelete: this.handleDelete,
      getForm: this.getChildForm,
      formValue: this.state.formValue,
      next: this.next,
      key: 3,
    });

    const steps = [
      {
        title: '输入接口描述',
        content: <FormS1/>,
      },
      {
        title: '输入接口定义',
        content: <FormS2/>,
      },
      {
        title: '输入接口参数',
        content: (
          <div>
            <Button onClick={this.addParam} type="primary">
              新增参数
            </Button>
            <FormS3/>
          </div>
        ),
      },
      {
        title: '确认提交',
        content: <FormDetail formValue={this.state.formValue}/>,
      },
    ];
    this.state.steps = steps;
    const { current } = this.state;

    return (
      <div>
        <Steps className={styles['steps-header']} current={current} onClick={this.handleStepClick}>
          {steps.map(item => (
            <Step key={item.title} title={item.title}/>
          ))}
        </Steps>
        <div className={styles['steps-content']}>{steps[current].content}</div>
        <div className={styles['steps-action']}>
          {current < steps.length - 1 && (
            <Button onClick={() => this.goNext()} type="primary">
              下一步
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              onClick={() => {
                // this.goNext();
                this.handleFormSubmit();
              }}
              type="primary"
            >
              提交
            </Button>
          )}
          {current > 0 && (
            <Button onClick={() => this.prev()} style={{ marginLeft: 8 }}>
              上一步
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default ResourceApplyPure;
