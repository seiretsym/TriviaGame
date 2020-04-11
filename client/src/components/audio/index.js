import React, { Component } from "react";

class Audio extends Component {
  render() {
    return (
      <audio id="audioplayer" controls controlsList="nodownload" preload="auto">
        <source src={this.props.src} type="audio/wav"></source>
      </audio>
    );
  }
}

export default Audio;