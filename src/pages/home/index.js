import React, { Component } from 'react';
import { connect } from 'dva';
import HomePagePure from '../../components/Home';
import bar from '../../assets/bar.jpg';

class Home extends Component {
  render() {
    return (
      <div>
        <div>
          <img alt="homebar" src={bar} style={{ height: '100px', width: '100%' }}/>
        </div>
        <HomePagePure/>
      </div>
    );
  }
}

export default connect(state => state)(Home);
