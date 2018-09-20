import React, {Component} from 'react';
import HomePagePure from "../../components/Home"
import {connect} from "dva"
import bar from "../../assets/bar.jpg"

class Home extends Component {
  render() {
    return (
      <div>
        <div>
          <img style={{height: "100px", width: "100%"}} src={bar} alt="homebar"/>
        </div>
        <HomePagePure/>
      </div>
    );
  }
}


export default connect((state) => {
  return state;
})(Home);
