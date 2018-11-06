import { Form, Divider, Checkbox, Input, Radio } from 'antd';
import React, { Component } from 'react';

import styles from '../index.less';

const { TextArea } = Input;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
// 定义RadioButton
const RadioBtnList = [
    {
        value:'showErr',
        key:'rBtn_1',
        cont:'出现错误',
    },{
        value:'flowErr',
        key:'rBtn_2',
        cont:'流程错误',
    }
];

@Form.create()
class NetSetting extends Component {
    constructor(props){
        super(props);
        this.changeFailEmail = this.changeFailEmail.bind(this);
        this.changeSucEmaill = this.changeSucEmaill.bind(this);
        this.state = {
            checkFailEmail: false,
            checkSucEmail: false,
        }
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        console.log("NetSetting submit");
    }

    // 检测故障邮箱
    changeFailEmail = (e) =>{
        this.setState({
            checkFailEmail:e.target.checked,
        })
    }

    // 检测成功邮箱
    changeSucEmaill = (e) =>{
        this.setState({
            checkSucEmail:e.target.checked,
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <p className={styles.contTitle}>故障通知</p>
                <p>在作业首次出现错误或流程以失败结束时发送通知.</p>
                <Divider />
                <Form className = {styles.formStyle} onSubmit = {this.handleSubmit}>
                    <FormItem>
                        {
                            getFieldDecorator('radio-button')(
                                <RadioGroup>
                                    {
                                        RadioBtnList.map((item)=>{
                                            return(
                                                <RadioButton value = {item.value} key = {item.key}>{item.cont}</RadioButton>
                                            )
                                        })
                                    }
                                </RadioGroup>
                            )
                        }
                    </FormItem>
                    <p className={styles.contTitle}>故障邮箱</p>
                    <FormItem>
                        <Checkbox
                            checked = {this.state.checkFailEmail}
                            onChange = {this.changeFailEmail}
                        >覆盖流程设置邮箱</Checkbox>
                    </FormItem>
                    <p style={{ fontWeight: 'bord' }}>失败时向这些地址发送通知.逗号、空格或分号分隔不同的地址.</p>
                    <FormItem>
                        <TextArea rows={4} disabled={!this.state.checkFailEmail} />
                    </FormItem>
                    <p className={styles.contTitle}>成功邮箱</p>
                    <FormItem>
                        <Checkbox
                            checked = {this.state.checkSucEmail}
                            onChange = {this.changeSucEmaill}
                        >覆盖流程设置邮箱</Checkbox>
                    </FormItem>
                    <p style={{ fontWeight: 'bord' }}>成功时向这些地址发送通知.逗号、空格或分号分隔不同的地址.</p>
                    <FormItem>
                        <TextArea rows={4} disabled={!this.state.checkSucEmail} />
                    </FormItem>
                </Form>                 
            </div>
        );
    }
}

export default NetSetting;
