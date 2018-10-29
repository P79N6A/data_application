import { AutoComplete, Input } from 'antd';
import React from 'react';

function onSelect(value) {
  console.log('onSelect', value);
}

class AutoInput extends React.Component {
  state = {
    dataSource: [],
  };

  handleSearch = (value) => {
    this.setState({
      dataSource: !value ? [] : [
        value,
        value + value,
        value + value + value,
      ],
    });
  };

  render() {
    const { dataSource } = this.state;
    return (
      <AutoComplete
        children={Input}
        dataSource={dataSource}
        onSearch={this.handleSearch}
        onSelect={onSelect}
        // style={{ width: 200 }}
        placeholder="input here"
      />
    );
  }
}

export default AutoInput;
