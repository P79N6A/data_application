import React, {Component} from 'react';
import ResourceContent from './ResourceContent'
class CollectResource extends Component{
  render() {
    return (
      <div  style={{flex: 1, padding: '0 11px'}}>
        <ResourceContent {...this.props}></ResourceContent>
      </div>
    )
  }
}
export default CollectResource