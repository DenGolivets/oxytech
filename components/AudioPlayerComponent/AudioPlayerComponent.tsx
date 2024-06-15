import AudioPlayer from "../ReleasesPage/AudioPlayer";

interface IAudioPlayerComponent {
  source: string;
}

const AudioPlayerComponent = ({ source }: IAudioPlayerComponent) => {
  return <AudioPlayer src={source} />;
};

export default AudioPlayerComponent;
