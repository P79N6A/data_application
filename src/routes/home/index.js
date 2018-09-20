import React, {Component} from 'react';
import HomePagePure from "../../components/Home"
import {connect} from "dva"

class Home extends Component {
  render() {
    return (
      <div>
        <HomePagePure/>
      </div>
    );
  }
}


export default connect((state) => {
  return state;
})(Home);
