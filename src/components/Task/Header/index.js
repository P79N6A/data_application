import React, { PureComponent } from 'react';
import { Breadcrumb, Button, Col, Input, Row} from 'antd';

import style from '../Task.less';

class Header extends PureComponent {

  _renderHeadFn= (props) => {
    const {Search, Add} = props;
    return (
      <>
        {Search && (
          <Col span={6}>
            <Input.Search
              placeholder="input search text"
              onSearch={value => console.log(value)}
              enterButton
            />
          </Col>
        )}
        {Add && (
          <Col span={4}>
            <Button type="success">+添加</Button>
          </Col>
        )}
      </>
    )
  };

  render() {
    const Item = Breadcrumb.Item;
    return (
      <div className={style.header}>
        <Row gutter={24}  >
          <Col span={14}>
          <Breadcrumb >
            <Item>
              <strong className={style.title} >
                {this.props.title || ""}
              </strong>
            </Item>
          </Breadcrumb>
          </Col>
          {this._renderHeadFn(this.props)}
        </Row>
      </div>
    );
  }
}

export default Header;
