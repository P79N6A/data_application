import React, { PureComponent } from 'react';
import { Breadcrumb } from 'antd';

class Header extends PureComponent {

  render() {
    const Item = Breadcrumb.Item;
    return (
      <Breadcrumb>
        <Item>{this.props.title || ""}</Item>
      </Breadcrumb>
    );
  }
}

export default Header;
