import React, { PureComponent } from 'react';
import { Breadcrumb, Button, Col, Input, Row} from 'antd';

class Header extends PureComponent {

  render() {
    const Item = Breadcrumb.Item;
    return (
        <Row gutter={24} style={{marginBottom:24,marginTop:10}}>
          <Col span={14}>
          <Breadcrumb >
            <Item>
              <strong>
                {this.props.title || ""}
              </strong>
            </Item>
          </Breadcrumb>
          </Col>
          <Col span={6}>
            <Input.Search
              placeholder="input search text"
              onSearch={value => console.log(value)}
              enterButton
            />
          </Col>
          <Col span={4}>
            <Button type="success">+添加</Button>
          </Col>
        </Row>
    );
  }
}

export default Header;
