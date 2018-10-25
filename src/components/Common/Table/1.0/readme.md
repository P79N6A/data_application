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