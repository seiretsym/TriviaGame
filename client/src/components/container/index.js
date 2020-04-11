import React, { Component } from "react";

class Container extends Component {
  render() {
    return (
      <div className="container rounded mt-5 border border-dark">
        {this.props.children}
      </div>
    )
  };
}

export default Container;