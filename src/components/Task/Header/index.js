import React, { PureComponent } from 'react';
import { Breadcrumb, Button, Col, Input, Row} from 'antd';

import style from '../Task.less';

class Header extends PureComponent {

  _renderHeadFn= (props) => {
    const {Search, Add, Adv, Remove, Upload, Download} = props;
    return (
      <>
        {Search && (
          <Col span={4}>
            <Input.Search
              onSearch={value => console.log(value)}
              enterButton
            />
          </Col>
        )}
        {Add && (
          <Col span={1}>
            <Button type="primary">添加</Button>
          </Col>
        )}
        {Adv && (
          <Col span={1}>
            <Button type="primary">高级搜索</Button>
          </Col>
        )}
        {Remove && (
          <Col span={2}>
            <Button type="danger">删除</Button>
          </Col>
        )}
        {Upload && (
          <Col span={2}>
            <Button type="primary">上传</Button>
          </Col>
        )}
        {Download && (
          <Col span={2}>
            <Button type="primary">下载</Button>
          </Col>
        )}
      </>
    )
  };

  render() {
    const Item = Breadcrumb.Item;
    return (
      <div className={style.header}>
        <Row gutter={12}>
          <Col span={18}>
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
