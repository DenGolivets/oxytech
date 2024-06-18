'use client'

import { useRef, useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPlay, 
  faPause, 
  faVolumeUp, 
  faVolumeDown, 
  faVolumeMute, 
  faVolumeOff,
  faStepForward,
  faStepBackward,
} from "@fortawesome/free-solid-svg-icons";

interface AudioPlayerTwoProps {
  src: string;
  name: string;
}

declare module 'wavesurfer.js' {
  interface WaveSurfer {
    un(eventName: string, listener?: Function): void;
  }
}

const formWaveSurferOptions = (ref: React.RefObject<HTMLElement>) => ({
  container: ref.current!,
  waveColor: '#ccc',
  progressColor: '#ff2701',
  cursorColor: 'transparent',
  responsive: true,
  height: 80,
  normalize: true,
  backend: 'WebAudio',
  barWidth: 2,
  barGap: 3,
})

function formatTime(seconds: number) {
  let date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substr(11, 8);
}

const AudioPlayerTwo = ({ name, src }: AudioPlayerTwoProps) => {

  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioFileName, setAudioFileName] = useState('');

  useEffect(() => {
    // Check if waveformRef.current is not null
    if (!waveformRef.current) {
      return; // Exit the effect if the ref is not yet attached to a DOM element
    }

    const options = formWaveSurferOptions(waveformRef);
    wavesurfer.current = WaveSurfer.create(options as any);

    // Load the audio file
    if (wavesurfer.current !== null) {
      wavesurfer.current.load(src);
    }
    //  When wavesurfer is Ready
    wavesurfer.current.on('ready', () => {
      if (wavesurfer.current !== null) {
        setVolume(wavesurfer.current.getVolume());
        setDuration(wavesurfer.current.getDuration());
        setAudioFileName(name.split('/').pop() || '');
      }
    });
    
    // Update current time in state as audio plays
    wavesurfer.current.on('audioprocess', () => {
      if (wavesurfer.current !== null) {
        setCurrentTime(wavesurfer.current.getCurrentTime());
      }
    });

    // Clean up event listeners and destroy instance an amount
    return () => {
      if (wavesurfer.current) {
        (wavesurfer.current as any).un('audioprocess');
        (wavesurfer.current as any).un('ready');
      }
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, [src, name]);

  const handlePlayPause = () => {
    setPlaying(!playing);
    wavesurfer.current?.playPause();
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    wavesurfer.current?.setVolume(newVolume);
    setMuted(newVolume === 0);
  };

  const handleMute = () => {
    setMuted(!muted);
    wavesurfer.current && wavesurfer.current.setVolume(muted ? volume : 0);
  };

  const handleVolumeUp = () => {
    handleVolumeChange(Math.min(volume + 0.1, 1));
  };

  const handleVolumeDown = () => {
    handleVolumeChange(Math.max(volume - 0.1, 0));
  };

  return (
    <div id="waveform" ref={waveformRef} style={{ width: '100%' }} className="p-4">
      <div className="controls flex items-center justify-center gap-4">
        {/* Play Pause button */}
        <button onClick={handlePlayPause}>
          <FontAwesomeIcon 
            icon={playing ? faPause : faPlay} 
            size='2xl' 
            className="hover:text-purple-600 transition-all duration-300" 
          />
        </button>
        {/* Mute Unmute button */}
        <button onClick={handleMute}>
          <FontAwesomeIcon 
            icon={muted ? faVolumeOff : faVolumeMute} 
            size='2xl' 
            className="hover:text-red-600 transition-all duration-300" 
          />
        </button>
        {/* Volume Slider */}
        <input 
          type='range' 
          id="volume" 
          name='volume' 
          min='0' 
          max='1' 
          step='0.05' 
          value={muted ? 0 : volume}
          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))} 
        />
        {/* Volume Down button */}
        <button onClick={handleVolumeDown}>
          <FontAwesomeIcon icon={faVolumeDown} size='2xl' className="hover:text-red-600" />
        </button>
        {/* Volume Up button */}
        <button onClick={handleVolumeUp}>
          <FontAwesomeIcon icon={faVolumeUp} size='2xl' className="hover:text-red-600" />
        </button>
      </div>
      <div className="audio-info flex flex-col items-center justify-center">
        {/* Audio file name and current play time */}
        <span>
          Playing: <span className="text-red-600">{audioFileName} <br /></span>
        </span>
        <span>
          Duration: <span className="text-blue-400">{formatTime(duration)}</span> | Current Time:<span className="text-blue-400">{' '}</span>
          <span className="text-blue-400">{formatTime(currentTime)}</span> <br />
        </span>
        <span>
          Volume: <span className="text-blue-400">{Math.round(volume * 100)}%</span>
        </span>
      </div>
    </div>
  )
}

export default AudioPlayerTwo