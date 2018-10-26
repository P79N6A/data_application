import React, { PureComponent } from "react";
// import { connect } from 'dva';

import Table from "components/Table/1.0";
import ExcelBtn from "components/Table/1.0/mod/ExcelBtn";
import HeaderExtend from "components/Table/1.0/example/HeaderExtend";
// import AddMenu from "components/Permission/MenuInfo/AddMenu";
// import EditMenu from "components/Permission/MenuInfo/EditMenu";
import { getMenuInfo, deleteMenuInfo, updateMenuById } from 'services/menu';

const columnsArr = [
    {
        width: 100,
        title: "menu_id",
        dataIndex: "menu_id",
        // render: (text, record, index) => {
        //     return (
        //         <span>{text}-test</span>
        //     );
        // }
    },
    {
        width: 200,
        title: "上级菜单编号",
        dataIndex: "parent_menu_code",
        sorter: true,
        editable: true,
        inputType: "selete",
        inputExtend: {
            width: 160,
            optionsArr: [
                {
                    value: "test1"
                },
                {
                    value: "test2"
                },
            ]
        }
    },
    {
        width: 200,
        title: "菜单编号",
        dataIndex: "menu_code",
        sorter: true
    },
    {
        width: 300,
        title: "菜单描述",
        dataIndex: "description",
        editable: true,
        render: (text, record, index) => {
            return (
                <span>
                    <img src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2562428211,1327135209&fm=58&bpow=1175&bpoh=769" alt=""/>
                    {text}
                </span>
            );
        }
    }
];

const moreFnArr = [
    // {
    //     key: "edit",
    //     // iconName: "edit",
    //     title: "编辑more",
    //     view: EditMenu,
    //     // render: (text, record, index) => {
    //     //     return (
    //     //         <span>{`dsadas`}</span>
    //     //     );
    //     // }
    // },
    // {
    //     key: "quickUpdate",
    //     render: (text, record, index, props) => {
    //         const { getFn, updateState } = props;
    //         return (
    //             <span onClick={() => {
    //                 // getFn && getFn();
    //                 updateState && updateState({
    //                     ...record,
    //                     description: 222
    //                 });
    //             }}>{record.menu_id}</span>
    //         );
    //     }
    // }
];

const headerMoreFnArr = [
    {
        key: "excel",
        // view: ExcelBtn,
        render: (props) => {
            return <ExcelBtn 
                {...props} 
                exlName="tqtTest" 
                columnsArr={columnsArr} 
                // exlBtn={null}
            />
        }
    }
];

class LayoutComponent extends PureComponent {
    render() {
        const { app_id=44 } = this.props;
        return (
            <div>
                <Table
                    app_id={app_id}
                    recordIDName="menu_id"
                    moreFnArr={moreFnArr}
                    headerMoreFnArr={headerMoreFnArr}
                    HeaderExtend={HeaderExtend}
                    getFn={getMenuInfo}
                    updateFn={updateMenuById}
                    deleteFn={deleteMenuInfo}
                    columnsArr={columnsArr}
                    // AddPop={EditMenu}
                    // UpdatePop={EditMenu} 添加和编辑弹窗整合为一个
                    antdTableProps={{
                        expandedRowRender: (record, index, indent, expanded) => {
                            return `test antdTableProps expandedRowRender.`;
                        }
                    }}
                    // antdTableProps={{
                    //     rowSelection: false
                    // }}
                    // hasSearch={false}
                />
            </div>
        );
    }
}

// function mapStateToProps({ menu }) {
//     return {
//         app_id: menu.app_id
//     };
// }

export default LayoutComponent;
// export default connect(mapStateToProps)(LayoutComponent);
