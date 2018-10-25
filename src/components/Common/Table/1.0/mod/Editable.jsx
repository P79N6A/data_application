import React, { PureComponent } from "react";
import { Input, InputNumber, Form, Select } from "antd";
import className from 'classnames';

import styles from "../index.less";

const EditableContext = React.createContext();

class EditableRow extends PureComponent {
    getState = () => {
        const { form } = this.props;
        let newState = null;

        form.validateFields((error, row) => {
            if (error) {
              return;
            }

            newState = row;

            // if (children && children[0] && children[0].props) {
            //     newState = {
            //         ...children[0].props.record,
            //         ...row
            //     };
            // }
        });

        return newState;
    }

    render() {
        const { form, index, rowIndex, ...props } = this.props;

        return (
            <EditableContext.Provider value={form}>
                <tr
                    {...props}
                    className={className(rowIndex % 2 == 1 && styles['editable-row-even'], `editable-row editable-row-${props["data-row-key"]}`)}
                />
            </EditableContext.Provider>
        );
    }
}

export const EditableFormRow = Form.create()(EditableRow);

/**
 *      inputExtend 根据不同 inputType 配置不同的扩展对象
 *      公共：
 *          width: inputExtend.width || 180
 * 
 *      number：
 * 
 *      selete：
 *          optionsArr： [{
 *              value: `value`,                 必须
 *              render: () => {return ...;}     可选
 *          }] 
 *      
 *      default：input
 */
export class EditableCell extends PureComponent {
    getInput = (tdName) => {
        const { inputType, inputExtend={} } = this.props;
        const commonProps = {
            size: "small",
            style: {
                width: inputExtend.width || 180,
                display: "block"
            }
        };

        let InputView = null;
        switch(inputType) {
            case "number":
                InputView = <InputNumber {...commonProps} />;
                break;
            case "selete":
                InputView = <Select
                    {...commonProps}
                    dropdownMatchSelectWidth={false}
                    getPopupContainer={() => document.querySelector(`[td-name="${tdName}"]`)}
                >
                    {
                        inputExtend.optionsArr && inputExtend.optionsArr.map((item) => {
                            return (
                                <Select.Option 
                                    key={item.value} 
                                    value={item.value}
                                >
                                    {
                                        item.render 
                                        ?
                                        item.render(item)
                                        :
                                        item.value
                                    }
                                </Select.Option>
                            );
                        })
                    }
                </Select>;
                break;
            default:
                InputView = <Input {...commonProps} />;
                break;
        }

        return InputView;
    };
  
    render() {
        const {
            editing,
            trID,
            align="left",
            dataIndex,
            title,
            record,
            moreRules,
            ...restProps
        } = this.props;

        const tdName = `td-${trID}-${dataIndex}`;

        return (
            <EditableContext.Consumer>
                {
                    (form) => {
                        const { getFieldDecorator } = form;
                        return (
                        <td
                            {...(editing ? {
                                "td-name": tdName
                            } : {})}
                            style={{...(restProps.className == "ant-table-selection-column" ? {
                                textAlign: "center"
                            } : {
                                textAlign: align
                            })}}
                        >
                            {
                                editing 
                                ? 
                                (
                                    <Form.Item style={{ margin: 0, width: "auto" }}>
                                        {
                                            getFieldDecorator(dataIndex, {
                                                /**
                                                 * [{
                                                 *   required: true,
                                                 *   message: `${title}不能为空!`,
                                                 * }]
                                                 */
                                                rules: moreRules ? moreRules : [],
                                                initialValue: record[dataIndex]
                                            })(this.getInput(tdName))
                                        }
                                    </Form.Item>
                                ) 
                                : 
                                restProps.children
                            }
                        </td>
                        );
                    }
                }
            </EditableContext.Consumer>
        );
    }
}
