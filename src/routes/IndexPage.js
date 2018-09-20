import React from 'react';
import {connect} from 'dva';
import styles from './IndexPage.css';
import Example from "../components/Example"

class IndexPage extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: "example/fet",
      payload: "/mock-sa/users",
      // payload:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537362781048&di=4ecd4eb7c337a96ee97a83c12d3544a1&imgtype=jpg&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D2456942613%2C227113991%26fm%3D214%26gp%3D0.jpg",
      callback: (res) => {
        console.log(res)
      },
    })
  }

  render() {
    return (
      <div>
        <Example/>
      </div>
    );
  }
}


IndexPage.propTypes = {};

function map(a) {
  return a
}

export default connect(map)(IndexPage);
