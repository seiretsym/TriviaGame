import React, { Component, SyntheticEvent } from "react";

type AudioProps = {
  id: string,
  src: string,
  onCanPlay: (event: SyntheticEvent<HTMLAudioElement>) => void,
  onError: (event: SyntheticEvent<HTMLAudioElement>) => void
}

class Audio extends Component<AudioProps> {
  render() {
    return (
      <audio controls controlsList="nodownload" {...this.props} />
    );
  }
}

export default Audio;