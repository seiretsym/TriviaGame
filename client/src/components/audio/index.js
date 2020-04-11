import React, { Component } from "react";

class Audio extends Component {
  render() {
    return (
      <audio controls controlsList="nodownload">
        <source src={this.props.src} type="audio/wav"></source>
      </audio>
    );
  }
}

export default Audio;