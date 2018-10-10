import React, {Component} from 'react'
import BarHZ from './BarHZ'
import LineHZ from './LineHZ'
class TestComponent extends Component{
  render() {
    return(
      <div>
        <div style={{width: '500px', height: '500px', float: 'left'}}>
          <LineHZ/>

        </div>
        <div  style={{width: '500px', height: '500px', float: 'left'}}>
          <BarHZ/>
        </div>
      </div>
    )
  }
}
export default TestComponent
