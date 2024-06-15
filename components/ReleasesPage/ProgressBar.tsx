import { formatTime } from '@/utils/formatTime';
import React from 'react'

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  isSeeking: boolean;
  onSeek: (e: React.MouseEvent<HTMLDivElement>) => void;
  setIsSeeking: (isSeeking: boolean) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentTime, duration, isSeeking, onSeek, setIsSeeking }) => {
  
  const progressBarWidth = (currentTime / duration) * 100;
  const cursorPosition = Math.round((currentTime / duration) * 100);

  return (
    <div
      className='bg-slate-800 border-slate-500 border-b rounded-t-xl p-4 pb-6 sm:p-10 sm:pb-8 lg:p-6 
      xl:p-10 xl:pb-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8'
      onClick={onSeek}
      onMouseMove={e => isSeeking && onSeek(e)}
      onMouseDown={() => setIsSeeking(true)}
      onMouseUp={() => setIsSeeking(false)}
      onMouseLeave={() => setIsSeeking(false)}
    >
      <div className='space-y-2'>
        <div className='relative'>
          <div className='bg-slate-700 rounded-full overflow-hidden'>
            <div
              className='bg-cyan-400 h-2'
              style={{ width: `${progressBarWidth}%` }}
              role='progressbar'
              aria-label='music progress'
              aria-valuenow={progressBarWidth}
              aria-valuemin={0}
              aria-valuemax={duration}
            />
          </div>
          <div 
            className='ring-cyan-400 ring-2 absolute top-1/2 w-4 h-4 -mt-2 -ml-2 flex items-center
            justify-center bg-white rounded-full shadow'
            style={{ left: `${cursorPosition}%` }}
          >
            <div className='w-1.5 h-1.5 bg-cyan-400 rounded-full ring-1 ring-inset ring-slate-900/5' />
          </div>
        </div>
        <div className='flex justify-between text-sm leading-6 font-medium tabular-nums'>
          <div className='text-slate-100'>{formatTime(currentTime)}</div>
          <div className='text-slate-100'>{formatTime(duration)}</div>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar