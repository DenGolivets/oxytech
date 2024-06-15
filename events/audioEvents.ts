export const play = (audio: HTMLAudioElement) => {
  audio.play()
}

export const pause = (audio: HTMLAudioElement) => {
  audio.pause()
}

export const stop = (audio: HTMLAudioElement) => {
  audio.pause()
  audio.currentTime = 0
}