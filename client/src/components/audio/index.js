import React, { Component } from "react";

class Audio extends Component {
  render() {
    return (
      <audio src={this.props.src} {...this.props} />
    );
  }
}

export default Audio;