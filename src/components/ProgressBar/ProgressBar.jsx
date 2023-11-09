import React from 'react'
import * as S from './ProgressBar.styles'
import { forwardRef } from 'react'

export const ProgressInputTrack = forwardRef((props, ref) => {
  ProgressInputTrack.displayName = 'ProgressInputTrack'
  
//   console.log(ref.current.duration) //почему с первого раза не передается??
//   console.log(ref.current.currentTime) 

  return (
    <S.ProgressInput
      type="range"
      min={0}
      max={ref.current.duration} 
      value={ref.current.currentTime}
      step={0.01}
    //   $color="#AD61FF"
      onChange={(e) => (ref.current.currentTime = e.target.value)}
    />
  )
})

export const ProgressInputVolume = forwardRef((props, ref) => {
  ProgressInputVolume.displayName = 'ProgresInputVolume'

    return (
      <S.ProgressInput
        type="range"
        min={0}
        max={1}
        value={ref.current.volume}
        step={0.01}
        onChange={(a) => { ref.current.volume = a.target.value }}
      />)
  });