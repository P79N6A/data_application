import React, { PureComponent } from 'react';
import { Breadcrumb, Button, Col, Input, Row, Popconfirm} from 'antd';

import style from '../Task.less';

class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state={
      searchValue:""
    }
  }

  _renderHeadFn= (props) => {
    const {Search, Add, Adv, Remove, Upload, Download} = props;
    return (
      <>
        {Search && (
          <Col span={4}>
            <Input.Search
              onSearch={value => Search(value)}
              enterButton
            />
          </Col>
        )}
        {Add && (
          <Col span={1}>
            <Button
              type="primary"
              onClick={Add.show}
            >
              添加
            </Button>
          </Col>
        )}
        {Adv && (
          <Col span={1}>
            <Button type="primary">高级搜索</Button>
          </Col>
        )}
        {Remove && (
          <Col span={2}>
            <Popconfirm
              title="你确定要删除吗？"
              onConfirm={()=>Remove(this.props.title)}
            >
            <Button type="danger">删除</Button>
            </Popconfirm>
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
