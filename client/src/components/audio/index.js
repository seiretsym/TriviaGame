import React, { Component } from "react";

class Audio extends Component {
  render() {
    return (
      <audio {...this.props}>
        <source src={this.props.src} type="audio/wav" />
      </audio>
    );
  }
}

export default Audio;