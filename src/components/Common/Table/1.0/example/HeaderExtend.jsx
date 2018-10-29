import React, { PureComponent } from "react";
import { Radio } from 'antd';

class LayoutComponent extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            order_rule: 1,
        };
    }

    render() {
        // const { searchFilterFn } = this.props;
        return (
          <div>
            <span style={{marginRight: 10}}>order_filed: menu_code:  </span>
            <Radio.Group onChange={this._onChange} value={this.state.order_rule}>
              <Radio value={1}>asc</Radio>
              <Radio value={2}>desc</Radio>
            </Radio.Group>

            <p>tips: 这只是一个实验而已，排序这类筛选不要放在header中，而且1.0table中这类筛选只刷新列表，不会更新table th中的排序icon样式</p>
          </div>
        );
    }

    _onChange = (e) => {
        const value = e.target.value;
        this.setState({
            order_rule: value,
        });
        const { searchFilterFn } = this.props;

        searchFilterFn({
            order_filed: "menu_code",
            order_rule: value == 1 ? "asc" : "desc",
        })
    }
}

export default LayoutComponent;
