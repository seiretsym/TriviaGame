import React, { Component } from "react";

export class Row extends Component {
  render() {
    return (
      <div className={"row " + (this.props.classes || "")}>
        {this.props.children}
      </div>
    )
  }
}

export class Col extends Component {
  render() {
    return (
      <div className={"col" + (this.props.classes || "")} >
        {this.props.children}
      </div >
    )
  }
}

