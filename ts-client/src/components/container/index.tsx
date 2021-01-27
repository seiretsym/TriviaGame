import React, { Component } from "react";

class Container extends Component {
  render() {
    return (
      <div className="container rounded border border-dark">
        {this.props.children}
      </div>
    )
  };
}

export default Container;