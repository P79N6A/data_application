import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Input, message, Popconfirm, Divider, Radio, Select } from 'antd';
import isEqual from 'lodash/isEqual';
import styles from './style.less';

const RadioGroup = Radio.Group;

class TableForm extends PureComponent {
  index = 0;

  cacheOriginData = {};

  constructor(props) {
    super(props);

    this.state = {
      data: props.value,
      loading: false,
      /* eslint-disable-next-line react/no-unused-state */
      value: props.value,
    };
  }

  static getDerivedStateFromProps(nextProps, preState) {
    if (isEqual(nextProps.value, preState.value)) {
      return null;
    }
    return {
      data: nextProps.value,
      value: nextProps.value,
    };
  }

  getRowByKey(key, newData) {
    const { data } = this.state;
    return (newData || data).filter(item => item.key === key)[0];
  }

  toggleEditable = (e, key) => {
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target };
      }
      target.editable = !target.editable;
      this.setState({ data: newData });
    }
  };

  newMember = () => {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    newData.push({
      key: `NEW_TEMP_ID_${this.index}`,
      workId: '',
      name: '',
      department: '',
      editable: true,
      isNew: true,
    });
    this.index += 1;
    this.setState({ data: newData });
  };

  remove(key) {
    const { data } = this.state;
    const { onChange } = this.props;
    const newData = data.filter(item => item.key !== key);
    this.setState({ data: newData });
    onChange(newData);
  }

  handleKeyPress(e, key) {
    if (e.key === 'Enter') {
      this.saveRow(e, key);
    }
  }

  handleFieldChange(e, fieldName, key) {
    console.log(e, fieldName, key);
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      this.setState({ data: newData });
    }
  }

  saveRow(e, key) {
    e.persist();
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      if (this.clickedCancel) {
        this.clickedCancel = false;
        return;
      }
      const target = this.getRowByKey(key) || {};
      if (!target.workId || !target.name || !target.department) {
        message.error('请填写完整成员信息。');
        e.target.focus();
        this.setState({
          loading: false,
        });
        return;
      }
      delete target.isNew;
      this.toggleEditable(e, key);
      const { data } = this.state;
      const { onChange } = this.props;
      onChange(data);
      this.setState({
        loading: false,
      });
    }, 500);
  }

  cancel(e, key) {
    this.clickedCancel = true;
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (this.cacheOriginData[key]) {
      Object.assign(target, this.cacheOriginData[key]);
      delete this.cacheOriginData[key];
    }
    target.editable = false;
    this.setState({ data: newData });
    this.clickedCancel = false;
  }

  render() {
    const columns = [
      {
        title: '参数名',
        dataIndex: 'paramName',
        key: 'paramName',
        width: '20%',
        render: (text, record) => {
          console.log(record);
          if (record.editable) {
            return (
              <Input
                autoFocus
                onChange={e => this.handleFieldChange(e, 'paramName', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="参数名"
                value={text}
              />
            );
          }
          return text;
        }
      },
      {
        title: '参数类型',
        dataIndex: 'paramType',
        key: 'paramType',
        width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Select
                allowClear
                onChange={e => this.handleFieldChange(e, 'paramType', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="参数类型"
                value={text}
              >
                <Select.Option value="string">string</Select.Option>
                <Select.Option value="number">number</Select.Option>
                <Select.Option value="boolean">boolean</Select.Option>
                <Select.Option value="json">json</Select.Option>
              </Select>
            );
          }
          return text;
        }
      },
      {
        title: '能否为空',
        dataIndex: 'paramIsNull',
        key: 'paramIsNull',
        width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Select
                onChange={e => this.handleFieldChange(e, 'paramIsNull', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                value={text}
              >
                <Select.Option value="是">是</Select.Option>
                <Select.Option value="否">否</Select.Option>
              </Select>
            );
          }
          return text;
        }
      },
      {
        title: '备注',
        dataIndex: 'paramNotice',
        key: 'paramNotice',
        width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                onChange={e => this.handleFieldChange(e, 'paramNotice', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="备注"
                value={text}
              />
            );
          }
          return text;
        }
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          const { loading } = this.state;
          if (!!record.editable && loading) {
            return null;
          }
          if (record.editable) {
            if (record.isNew) {
              return (
                <span>
                  <a onClick={e => this.saveRow(e, record.key)}>添加</a>
                  <Divider type="vertical"/>
                  <Popconfirm onConfirm={() => this.remove(record.key)}
                              title="是否要删除此行？"
                  >
                    <a>删除</a>
                  </Popconfirm>
                </span>
              );
            }
            return (
              <span>
                <a onClick={e => this.saveRow(e, record.key)}>保存</a>
                <Divider type="vertical"/>
                <a onClick={e => this.cancel(e, record.key)}>取消</a>
              </span>
            );
          }
          return (
            <span>
              <a onClick={e => this.toggleEditable(e, record.key)}>编辑</a>
              <Divider type="vertical"/>
              <Popconfirm onConfirm={() => this.remove(record.key)}
                          title="是否要删除此行？"
              >
                <a>删除</a>
              </Popconfirm>
            </span>
          );
        }
      }
    ];

    const { loading, data } = this.state;

    return (
      <Fragment>
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={false}
          rowClassName={record => (record.editable ? styles.editable : '')}
        />
        <Button
          icon="plus"
          onClick={this.newMember}
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
        >
          新增参数
        </Button>
      </Fragment>
    );
  }
}

export default TableForm;
