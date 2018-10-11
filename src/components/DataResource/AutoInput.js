import { AutoComplete } from 'antd';
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
        dataSource={dataSource}
        onSearch={this.handleSearch}
        onSelect={onSelect}
        placeholder="input here"
        style={{ width: 200 }}
      />
    );
  }
}

export default AutoInput;
