import React, { PureComponent, Fragment } from 'react';
import { Table, Alert } from 'antd';
import styles from './index.less';
import PropTypes from 'prop-types';

function initTotalList(columns) {
  const totalList = [];
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
}

class StandardTable extends PureComponent {
  constructor(props) {
    super(props);
    const { columns } = props;
    const needTotalList = initTotalList(columns);

    this.state = {
      selectedRowKeys: [],
      needTotalList
    };
  }

  static getDerivedStateFromProps(nextProps) {
    // clean state
    if (nextProps.selectedRows.length === 0) {
      const needTotalList = initTotalList(nextProps.columns);
      return {
        selectedRowKeys: [],
        needTotalList
      };
    }
    return null;
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    let { needTotalList } = this.state;
    needTotalList = needTotalList.map(item => ({
      ...item,
      total: selectedRows.reduce((sum, val) => sum + parseFloat(val[item.dataIndex], 10), 0)
    }));
    const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys, needTotalList });
    console.log(this.state);
  };

  handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, filters, sorter);
    }
  };

  showTableInfo(record, index, indent, expanded) {
    return <span>详细信息待开发</span>;
  }

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };

  render() {
    const { selectedRowKeys, needTotalList } = this.state;
    const {
      data: { data = [], pageParam = {} },
      loading,
      columns,
      rowKey,
      showSizeChanger,
      size='middle'
    } = this.props;
    const paginationProps = {
      showSizeChanger: showSizeChanger,
      showQuickJumper: true,
      ...pageParam
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled
      })
    };

    return (
      <div className={styles.standardTable}>
        <div className={styles.tableAlert}>
          <Alert
              message={
              <Fragment>
                已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
                {needTotalList.map(item => (
                  <span key={item.dataIndex}
                      style={{ marginLeft: 8 }}
                  >
                    {item.title}
                    总计&nbsp;
                    <span style={{ fontWeight: 600 }}>
                      {item.render ? item.render(item.total) : item.total}
                    </span>
                  </span>
                ))}
                <a onClick={this.cleanSelectedKeys}
                    style={{ marginLeft: 24 }}
                >
                  清空
                </a>
              </Fragment>
            }
              showIcon
              type="info"
          />
        </div>
        <Table
            columns={columns}
            dataSource={data}
          // loading={loading}
            expandedRowRender={this.showTableInfo}
            onChange={this.handleTableChange}
            pagination={paginationProps}
            rowKey={rowKey || 'key'}
            rowSelection={rowSelection}
            size={size}
        />
      </div>
    );
  }
}

StandardTable.propTypes = {
  showSizeChanger: PropTypes.bool,
  list: PropTypes.array,
  pagination: PropTypes.object,
  columns: PropTypes.array,
  loading: PropTypes.object
};

export default StandardTable;
