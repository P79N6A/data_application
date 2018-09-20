import React, {Component} from 'react';
import {Menu, Icon} from "antd"
import List from "../../components/DataCollect/List"
import Mission from "../../components/DataCollect/Mission"
import Summary from "../../components/DataCollect/Summary"

class DataCollect extends Component {
  render() {
    return (
      <div>
        <Menu>
          onClick={this.handleClick}
          selectedKeys={["mail"]}
          mode="horizontal"
          >
          <Menu.Item key="mail">
            <Icon type="mail"/>Navigation One
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default DataCollect;
