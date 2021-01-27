import React, { Component } from "react";

class Audio extends Component {
  render() {
    return (
      <audio src={this.props.src} controls controlsList="nodownload" type="audio/mp3" {...this.props} />
    );
  }
}

export default Audio;