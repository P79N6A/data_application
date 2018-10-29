import React, { PureComponent } from "react";
import { Table, Button, Modal, Input, Icon, message } from "antd";
import className from 'classnames';

import styles from "./index.less";

import { EditableFormRow, EditableCell } from "./mod/Editable";

const initRecordIDName = "id";
/**
 * 公用table 1.0
 * 主要功能说明：集成了包括搜索、分页、删除、新增等的公用table
 * 参数说明：
 *          app_id：            上级id（如果接口不需要上级id可以不传）
 *          recordIDName（*）：  table list的主要data key id，用于接口调用以及react list render优化
 *
 *          AddPop：            新增弹窗（抛出 getFn(obj) 方法，可用于更新列表数据）
 *          UpdatePop：         编辑弹窗（不传将自动使用AddPop，及add和update合二为一。同抛出 getFn）
 *          moreFnArr：         自定义扩展功能按钮（
 *                                  格式如下：
 *                                  {
 *                                      key: "edit",
 *                                      // iconName: "edit",
 *                                      title: "编辑",
 *                                      view: EditMenu      （同抛出 getFn, updateState）
 *                                  }
 *                              ）
 *          headerMoreFnArr:    自定义扩展header功能按钮（
 *                                  抛出    getState（）
 *                                          getFn()
 *                                          updateState(arr | itemData) 如果为arr就更新全部数据,如果为itemData则根据id更新单条数据
 *                                          getSelectedRowKeys（）获取当前页选框
 *                                          hasSelected 是否有选中
 *                                          clearSelecteRowKeys(array | string) 清除选框
 *                                  格式如下：
 *                                  {
 *                                      key: "excel",
 *                                      view: ExcelBtn, // react组件，优先级低于render
 *                                      render: render函数，返回react组件
 *                                  }
 *
 *                              ）
 *          HeaderExtend:       自定义扩展header内容组件（
 *                                  抛出 searchFilterFn(obj, onlyGet) 方法，可用于触发筛选更新列表数据，onlyGet true时不重置分页等参数
 *                                       getSelectedRowKeys() 方法，可用于获取选框arr
 *                                       clearSelecteRowKeys(), 同上
 *                                      getState()
 *                              ）
 *          searchExtendParam   初始请求附带参数
 *          getFn（*）：         getListData的接口函数（要求为返回Promise对象的函数方法, 并且结果用utils/modelResponse方法处理）
 *          updateFn：          更新的接口函数（要求同上）
 *          deleteFn：          删除的接口函数（要求同上）
 *          columnsArr（*）：   列表属性（与antd的columns类似）
 *                              扩展值 editable 是否可编辑 、inputType 编辑框类型 、moreRules antd的form自动检查配置参数 、inputExtend 编辑框扩展对象（详细配置看mod/Editable）
 *
 *          sorterObj：         初始排序筛选条件，参数：columnKey: dataIndex ; sortOrder: "descend" / "ascend"
 *          antdTableProps：    想要传给Table继承的antd原有api props，（支持大部分，如：expandedRowRender等），暂时不支持覆盖当前table的内部属性
 *          fnWidth:            功能栏宽度
 *          hasSearch：         是否有搜索框
 *
 *          其他请看源码: scrollX / showQuickJumper / showSizeChanger 等
 *          实例：readme.md
 */
class LayoutComponent extends PureComponent {
    constructor(props) {
        super(props);

        this.tableID = `tqtTable-${+new Date()}`;
        this._resetStateData(props);
        this.columns = this._dealColumn(props);
    }

    _resetStateData(props=this.props) {
        const { sorterObj, searchExtendParam } = props;

        this.state = {
            selectedRowKeys: [],
            page_size: 10,
            page_index: 1,
            total: 0,
            loading: true,
            data: [],
            enabledID: null,
        };

        this.searchExtendParam = searchExtendParam || {};

        this.sorterObj = {
            ...sorterObj,
            columnKey: null,
            sortOrder: null,
        };

        this.loading = false;
    }

    _dealColumn(props=this.props) {
        const {
            columnsArr=[],
            fnWidth=100,
            scrollX=false,
            fnAlign="left",
            recordIDName=initRecordIDName,
            updateFn,
            AddPop,
            UpdatePop,
            deleteFn,
            moreFnArr,
        } = props;

        let hasUpdateFn = false;
        const columns = [];
        const hasPop = UpdatePop || AddPop;

        columnsArr.forEach((item) => {
            if (hasPop && item.dataIndex == recordIDName) {
                let oldRenderFn = null;
                if (item.render) {
                    oldRenderFn = item.render;
                }

                item.render = (text, record, index) => {
                    return (
                      <a
                        href="javascript:;"
                        onClick={() => {
                            if (this.state.enabledID) {
                                return ;
                            }
                            this.updatePopRef && this.updatePopRef.show(record);
                        }}
                      >{ oldRenderFn ? oldRenderFn(text, record, index) : text}
                      </a>
                    );
                }
            }

            let align = "left";
            if (item.align) {
                align = item.align;
            } else {
                item.align = align;
            }

            if (item.editable) {
                hasUpdateFn = true;

                item.onCell = record => {
                    return {
                        record,
                        align,
                        dataIndex: item.dataIndex,
                        title: item.title,
                        moreRules: item.moreRules,
                        editing: record[recordIDName] == this.state.enabledID,
                        trID: record[recordIDName],
                        inputType: item.inputType || "text",
                        inputExtend: item.inputExtend,
                    };
                };
            }

            columns.push(item);
        });

        this.hasUpdateFn = hasUpdateFn && updateFn;

        const hasFn = this.hasUpdateFn || deleteFn || (moreFnArr && moreFnArr.length > 0);

        hasFn && columns.push({
            title: "操作",
            key: "fn",
            fixed: scrollX ? "right" : false,
            width: fnWidth,
            render: this._renderFnView,
            align: fnAlign || "left",
        });

        return columns;
    }

    getState = () => {
        return this.state;
    }

    componentDidMount() {
        this._onBlurHandler();

        document.body.addEventListener('click', this._onBlurHandler, false);

        this.getData({}, true);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.app_id !== this.props.app_id) {
            this._resetStateData();
            this.getData({}, true);
        }
    }

    // 防止组件销毁后触发setState等
    componentWillUnmount() {
        this.componentUnmount = true;
        clearTimeout(this.timer);
        this.timer = null;

        document.body.removeEventListener('click', this._onBlurHandler);
    }

    _onBlurHandler = (e) => {
        if (!this.state.enabledID) {
            return ;
        }

        if (matchesSelector(e.target, `#${this.tableID} .editable-row-${this.state.enabledID} *`)) {
            return ;
        }

        if (!matchesSelector(e.target, `.${this.tableID}-update-pop *`)) {
            // console.log("阻止默认事件")
            if (e) {
                e.stopPropagation();
                e.preventDefault();
            } else {
                window.event.returnValue = false;
                window.event.cancelBubble = true;
            }
        }

        this._update();
    }

    _renderFnView = (text, record, index) => {
        const { moreFnArr, deleteFn, recordIDName=initRecordIDName } = this.props;

        return (
          <div>
            {
                    this.hasUpdateFn && (
                    <span
                      className={styles.fnButton}
                      style={{marginRight: 20}}
                      onClick={() => {
                                this.setState({
                                    enabledID: this.state.enabledID ? null : record[recordIDName],
                                });
                            }}
                    >
                      {
                                this.state.enabledID ===  record[recordIDName] ? "放弃修改" : "编辑"
                            }
                    </span>
                    )
                }
            {
                    moreFnArr && moreFnArr.map((item) => {
                        return (
                          <span
                            key={item.key}
                            className={styles.fnButton}
                            style={{marginRight: 20}}
                            onClick={() => {
                                    if (this.state.enabledID || item.render) {
                                        return ;
                                    }

                                    this.refs[item.key] && this.refs[item.key].show(record);
                                }}
                          >
                            {
                                    item.render ? item.render(text, record, index, {
                                        getFn: this.getData,
                                        updateState: this.updateState,
                                    }) : item.title
                                }
                          </span>
                        );
                    })
                }
            {
                    deleteFn && (
                    <span
                      className={styles.fnButton}
                      onClick={() => {
                                if (this.state.enabledID) {
                                    return ;
                                }

                                this._deleteTips(() => {
                                    this._delete(record).then((data) => {
                                        if (data.isSuccess === true) {
                                            this.clearSelecteRowKeys(record[recordIDName]);
                                        }
                                    });;
                                })
                            }}
                    >
                            删除
                    </span>
                    )
                }
          </div>
        );
    }

    _renderHeader = () => {
        const { deleteFn, AddPop, headerMoreFnArr, HeaderExtend, hasSearch=true } = this.props;
        const selectedRowKeysByPage = this.getSelectedRowKeys();
        const hasSelected = selectedRowKeysByPage.length > 0;
        const commonStyle = {
            marginLeft: 15,
        };

        return (
          <div>
            <div className="clearfix">
              <div className="fl">
                {
                            AddPop && (
                            <Button
                              type="primary"
                              onClick={() => {
                                        this.addPopRef && this.addPopRef.show();
                                    }}
                            >
                              <Icon type="plus" /> 添加
                            </Button>
                            )
                        }
                {
                            deleteFn && (
                            <Button
                              style={{...(AddPop ? commonStyle : {})}}
                              type="primary"
                              onClick={() => {
                                        this._deleteTips(this._deleteAll);
                                    }}
                              disabled={!hasSelected}
                            >
                              <Icon type="delete" /> 批量删除
                            </Button>
                            )
                        }
                {
                            headerMoreFnArr && headerMoreFnArr.map((item) => {
                                const childrenProps = {
                                    getState: this.getState,
                                    hasSelected,
                                    updateState: this.updateState,
                                    getFn: this.getData,
                                    getSelectedRowKeys: this.getSelectedRowKeys,
                                    clearSelecteRowKeys: this.clearSelecteRowKeys,
                                };

                                return (
                                  <span style={{...((AddPop || deleteFn) ? commonStyle : {})}} key={item.key}>
                                    {
                                            item.render
                                            ?
                                            (
                                                item.render(childrenProps)
                                            )
                                            :
                                            (
                                              <item.view {...childrenProps} />
                                            )
                                        }
                                  </span>
                                );
                            })
                        }
              </div>
              {
                        hasSearch && (
                        <div className="fr">
                          <Input.Search
                            enterButton
                            placeholder="搜索"
                            onSearch={this._onSearch}
                            style={{width: 200}}
                          />
                        </div>
                        )
                    }
            </div>
            {
                    HeaderExtend && (
                    <div style={{marginTop: 12}}>
                      <HeaderExtend
                        getState={this.getState}
                        searchFilterFn={this.searchFilterFn}
                        getSelectedRowKeys={this.getSelectedRowKeys}
                        clearSelecteRowKeys={this.clearSelecteRowKeys}
                      />
                    </div>
                    )
                }
          </div>
        );
    }

    render() {
        const {
            app_id,
            scrollX=false,
            fnWidth,
            recordIDName=initRecordIDName,
            AddPop,
            UpdatePop,
            moreFnArr,
            showQuickJumper,
            showSizeChanger,
            antdTableProps={},
        } = this.props;
        const { selectedRowKeys } = this.state;

        const initRowSelection = {
            columnWidth: 20,
            selectedRowKeys,
            onChange: this._onSelectChange,
        }

        const rowSelection = typeof antdTableProps.rowSelection === "undefined" ? initRowSelection : (
            antdTableProps.rowSelection ? {
                ...antdTableProps.rowSelection,
                ...initRowSelection,
            } : false
        );

        this.rowRef = {};

        const keyObj = {};
        let rowIndex = 0;
        const components = {
            body: {
                row: (props) => {
                    if (typeof keyObj[props["data-row-key"]] === "undefined") {
                        keyObj[props["data-row-key"]] = rowIndex;
                        rowIndex++;
                    }
                    return (
                      <EditableFormRow
                        wrappedComponentRef={ref => this.rowRef[props["data-row-key"]] = ref}
                        {...props}
                        rowIndex={keyObj[props["data-row-key"]]}
                      />
                    )
                },
                cell: EditableCell,
            },
        };

        const columns = this._dealColumnSorter();
        return (
          <div className={className(styles['table-container'], 'common-table-container')} id={this.tableID}>
            <Table
                    // bordered
              size="middle"
              {...(scrollX ? {scroll: { x: fnWidth ? scrollX : true}} : {})}
              {...antdTableProps}
              rowSelection={rowSelection}
              className="table-main"
              components={components}
              title={this._renderHeader}
              columns={columns}
              rowKey={record => record[recordIDName]}
              dataSource={this.state.data || []}
              loading={this.state.loading}
              pagination={{
                        showTotal: total => {
                            return total > 0 ? `共${this.state.total}条` : null;
                        },
                        showQuickJumper: (showQuickJumper||showQuickJumper===false) ? showQuickJumper : true,
                        showSizeChanger: (showQuickJumper||showQuickJumper===false) ? showSizeChanger : true,
                        current: this.state.page_index,
                        total: this.state.total,
                        pageSize: this.state.page_size,
                    }}
              onChange={this._handleTableChange}
            />
            {
                    moreFnArr && moreFnArr.map((item) => {
                        const ItemPop = item.view;
                        return ItemPop && (
                        <ItemPop
                          key={`pop-${item.key}`}
                          ref={item.key}
                          app_id={app_id}
                          getFn={this.getData}
                          updateState={this.updateState}
                        />
);
                    })
                }
            {
                    AddPop && (
                    <AddPop
                      ref={ref => {
                            this.addPopRef = ref;

                            if (!UpdatePop) {
                                this.updatePopRef = ref;
                            }
                        }}
                      getFn={this.getData}
                      app_id={app_id}
                    />
)
                }
            {
                    UpdatePop && (
                    <UpdatePop
                      ref={ref => this.updatePopRef = ref}
                      getFn={this.getData}
                      app_id={app_id}
                    />
)
                }
          </div>
        );
    }

    // 自己管理排序显示问题
    _dealColumnSorter() {
        const newColumn = [];
        this.columns.forEach((item) => {
            const newItem = {...item};
            if (newItem.sorter && (newItem.dataIndex === this.sorterObj.columnKey)) {
                newItem.sortOrder = this.sorterObj.sortOrder;
            } else {
                newItem.sortOrder = null;
            }

            newColumn.push(newItem);
        });

        return newColumn;
    }

    _onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    }

    _deleteTips = (cb) => {
        Modal.confirm({
            title: "您确定要删除选中数据吗？",
            content: "此操作不可逆，请慎重考虑。",
            okText: "删除",
            okType: "danger",
            cancelText: "取消",
            onOk: () => {
                cb && cb();
            },
        })
    }

    _delete = async function _delete(item) {
        const { deleteFn, recordIDName=initRecordIDName, app_id } = this.props;

        return await deleteFn(...[
            app_id,
            {
                [recordIDName]: item[recordIDName],
            },
        ].filter(x => {
            return x || false
        })).then((data={}) => {
            if (this.componentUnmount === true) { return ; }

            if (data.isSuccess === true) {
                message.success(`删除数据成功！`);

                // 给服务器一点时间
                this.timer = setTimeout(() => {
                    this.getData();
                }, 1000 * .5);
            } else {
                message.error(`删除数据失败: ${  data.msg}`);
            }

            return data;
        });
    }

    _deleteAll = () => {
        const { recordIDName=initRecordIDName } = this.props;
        const selectedRowKeys = this.getSelectedRowKeys();

        this._delete({
            [recordIDName]: selectedRowKeys.join(","),
        }).then((data) => {
            if (data.isSuccess === true) {
                this.clearSelecteRowKeys(selectedRowKeys);
            }
        });
    }

    clearSelecteRowKeys = (arr) => {
        let isChange = false;
        const selectedRowKeys = [...this.state.selectedRowKeys];

        if (Array.isArray(arr)) {
            arr.forEach(item => {
                const index = selectedRowKeys.findIndex(v => v === item);
                if (index != -1) {
                    isChange = true;
                    selectedRowKeys.splice(index, 1);
                }
            })
        } else if (typeof arr === "string") {
            const index = selectedRowKeys.findIndex(v => v === arr);
            if (index != -1) {
                isChange = true;
                selectedRowKeys.splice(index, 1);
            }
        }

        if (isChange) {
            this.setState({
                selectedRowKeys,
            });
        }
    }

    // 获取当前选框状态
    getSelectedRowKeys = () => {
        const arr = [];
        const { recordIDName=initRecordIDName } = this.props;
        const { selectedRowKeys=[], data=[] } = this.state;
        const selectedArr = [...selectedRowKeys];
        data.forEach(item => {
            for (let i = 0; i < selectedArr.length; i++) {
                if (selectedArr[i] == item[recordIDName]) {
                    arr.push(item[recordIDName]);
                    selectedArr.splice(i, 1);
                    break;
                }
            }
        });

        return arr;
    }

    searchFilterFn = (obj={}, onlyGet) => {
        // 调用重置分页
        if (!onlyGet) {
            this.state.page_index = 1;
            this.searchExtendParam = {...obj};
        }

        this.getData();
    }

    updateState = (itemState) => {
        // 更新全部数据
        if (Array.isArray(itemState)) {
            this.setState({
                data: [...itemState],
            });
            return ;
        }

        // 更新单条数据
        const { recordIDName=initRecordIDName } = this.props;
        const data = [...this.state.data];

        for (let i = 0, l = data.length; i < l; i++) {
            if (data[i][recordIDName] == itemState[recordIDName]) {
                data[i] = {
                    ...data[i],
                    ...itemState,
                }

                this.setState({
                    data,
                });

                break;
            }
        }
    }

    getData = (params={}, isShowLoading) => {
        const { getFn, app_id } = this.props;

        if (this.loading) {
            return;
        }
        this.loading = true;

        !isShowLoading && this.setState({
            loading: true,
        });

        getFn(...[
            app_id,
            {
                search: this.searchValue || ``,
                page_size: this.state.page_size,
                page_index: this.state.page_index,
                ...this.searchExtendParam,
                ...params,
            },
        ].filter(x => {
            return x || false
        })).then((data={}) => {
            if (this.componentUnmount === true) { return ; }

            this.loading = false;

            if (data && data.isSuccess === true && data.res) {
                this.setState({
                    data: data.res.data || [],
                    total: data.res.page_param ? data.res.page_param.total : 0,
                    loading: false,
                });

                return;
            }

            this.setState({
                loading: false,
            });

            message.error(`请求数据失败！`);
        });
    }

    _onSearch = value => {
        this.state.page_index = 1;
        this.searchValue = value;
        this.getData({
            search: value,
        });
    }

    _handleTableChange = (pagination, filters, sorter) => {
        this.setState({
            page_index: pagination.current,
            page_size: pagination.pageSize,
        });

        let orderObj = {};
        let sorterObj = {
            ...this.sorterObj,
            sortOrder: false,
        };

        if (sorter.columnKey) {
            orderObj = {
                order_filed: sorter.columnKey,
                order_rule: sorter.order !== "descend" ? "asc" : "desc",
            };

            sorterObj = {
                columnKey: sorter.columnKey,
                sortOrder: sorter.order,
            };
        }

        this.sorterObj = sorterObj;

        this.getData({
            ...orderObj,
            page_size: pagination.pageSize,
            page_index: pagination.current,
        });
    }

    _update = () => {
        if (this.updatePopShow) {
            return ;
        }
        this.updatePopShow = true;

        const { updateFn, app_id, recordIDName=initRecordIDName } = this.props;

        Modal.confirm({
            className: `${this.tableID}-update-pop`,
            title: "您确定要更改当前数据吗？",
            content: "此操作不可逆，请慎重考虑。",
            okText: "保存",
            okType: "danger",
            cancelText: "取消",
            onOk: () => {
                let params = null;
                if (this.rowRef[this.state.enabledID]) {
                    params = this.rowRef[this.state.enabledID].getState();
                }

                if (params) {
                    updateFn(...[
                        app_id,
                        this.state.enabledID,
                        params,
                    ].filter(x => {
                        return x || false
                    })).then((data) => {
                        if (data.isSuccess === true) {
                            const newData = [...this.state.data];
                            const index = newData.findIndex(item => this.state.enabledID === item[recordIDName]);

                            const oldIndexData = {...newData[index]};
                            newData[index] = {
                                ...oldIndexData,
                                ...params,
                            };

                            this.setState({
                                enabledID: null,
                                data: newData,
                            });

                            message.success(`更新数据成功！`);
                        } else {
                            message.error(`更新数据失败。`);
                        }

                        this.updatePopShow = false;
                    });

                    return ;
                }

                message.error(`获取更新数据出现异常。`);
                this.updatePopShow = false;
            },
            onCancel: () => {
                this.updatePopShow = false;
            },
        });
    }
}

function matchesSelector(element, selector) {
    if (element.matches) {
        return element.matches(selector);
    } else if (element.matchesSelector) {
        return element.matchesSelector(selector);
    } else if (element.webkitMatchesSelector) {
        return element.webkitMatchesSelector(selector);
    } else if (element.msMatchesSelector) {
        return element.msMatchesSelector(selector);
    } else if (element.mozMatchesSelector) {
        return element.mozMatchesSelector(selector);
    } else if (element.oMatchesSelector) {
        return element.oMatchesSelector(selector);
    }
}

export default LayoutComponent;
