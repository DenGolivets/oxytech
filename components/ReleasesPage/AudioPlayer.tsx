import { EventEmmiter } from '@/events/EventEmmiter';
import { pause, play, stop } from '@/events/audioEvents';
import React, { useEffect, useRef, useState } from 'react'
import ProgressBar from './ProgressBar';
import AudioPlayerControls from './AudioPlayerControls';

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer = ({ src }: AudioPlayerProps) => {

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const eventEmitter = new EventEmmiter();

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  useEffect(() => {
    const audio = audioRef.current

    eventEmitter.subscribe('play', () => play(audio as HTMLAudioElement));
    eventEmitter.subscribe('pause', () => pause(audio as HTMLAudioElement));
    eventEmitter.subscribe('stop', () => stop(audio as HTMLAudioElement));

    const handleTimeUpdate = () => {
      if (!isSeeking) {
        setCurrentTime(audio?.currentTime || 0);
      }

      setDuration(audio?.duration || 0);
    };

    audio?.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      eventEmitter.unsubscribe('play', () => play(audio as HTMLAudioElement));
      eventEmitter.unsubscribe('pause', () => pause(audio as HTMLAudioElement));
      eventEmitter.unsubscribe('stop', () => stop(audio as HTMLAudioElement));
      audio?.removeEventListener('timeupdate', () => handleTimeUpdate);
    }

  }, [audioRef.current, currentTime, duration, isSeeking]);
  
  const onPlay = () => {
    eventEmitter.dispatch('play');
  };

  const onPause = () => {
    eventEmitter.dispatch('pause');
  };

  const onStop = () => {
    eventEmitter.dispatch('stop');
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const bar = e.currentTarget;
      const clickPosition = e.clientX - bar.getBoundingClientRect().left;
      const percentage = clickPosition / bar.clientWidth;
      const seekTime = duration * percentage;

      setCurrentTime(seekTime);
      audioRef.current.currentTime = seekTime;
    }
  };

  return (
    <div className='w-full'>
      <audio 
        src={src}
        ref={audioRef}
        controls
        className='hidden'
      />
      <ProgressBar 
        currentTime={currentTime}
        duration={duration}
        isSeeking={isSeeking}
        onSeek={handleSeek}
        setIsSeeking={setIsSeeking}
      />
      <AudioPlayerControls 
        onPlay={onPlay}
        onPause={onPause}
        onStop={onStop}
      />
    </div>
  )
}

export default AudioPlayer