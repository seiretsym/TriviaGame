import React, { Component } from "react";

class Audio extends Component {
  render() {
    return (
      <audio src={this.props.src} controls controlsList="nodownload" type="audio/wav" {...this.props} />
    );
  }
}

export default Audio;