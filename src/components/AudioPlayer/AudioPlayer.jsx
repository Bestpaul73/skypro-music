import { useContext, useEffect, useRef, useState } from 'react'
import loadingContext from '../Context'
import * as S from './AudioPlayer.styles'
import {
  ProgressInputTrack,
  ProgressInputVolume,
} from '../ProgressBar/ProgressBar'

const AudioPlayer = () => {
  const { currentTrack } = useContext(loadingContext)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoop, setIsLoop] = useState(false)

  const audioRef = useRef(0)

  const track_file = currentTrack.track_file

  const handlePlay = () => {
    audioRef.current.play()
    setIsPlaying(true)
  }

  useEffect(handlePlay, [currentTrack])

  const handleStop = () => {
    audioRef.current.pause()
    setIsPlaying(false)
  }

  const timeToString = (time) => {
    time = Math.round(time)
    let minutes = String(Math.trunc(time / 60))
    let seconds = String(time % 60)
    return `${minutes.padStart(2, 0)}:${seconds.padStart(2, 0)}`
  }

  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(timeToString(audioRef.current.currentTime))
      setDuration(timeToString(audioRef.current.duration)) //тут оно не нужно
    }, 1000)
    // setDuration(timeToString(audioRef.current.duration))     //но тут получается Нан
    // console.log(audioRef.current.duration);
    return () => clearTimeout(interval)
  }, [currentTrack])

  const handleLoop = () => {
    console.log(isLoop)
    audioRef.current.loop = !isLoop
    setIsLoop(!isLoop)
    console.log(audioRef.current.loop) //почему сразу не меняется состояние??
  }

  const awaitImplementation = () => {
    alert('Функционал еще не реализован')
  }

  // useEffect(() => {
  //   const ref = audioRef.current
  //   console.log(ref)

  //   ref.volume = 0.1

  //   setIsLoop(ref.loop)
  //   // setVolume(ref.volume)

  //   const handleTimeUpdate = () => {
  //     // if (ref.currentTime && ref.duration) {
  //     //   setCurrentTime(ref.currentTime)
  //     //   setDuration(ref.duration)
  //     // } else {
  //     //   setCurrentTime(0)
  //     //   setDuration(0)
  //     // }
  //   }

  //   ref.addEventListener('timeupdate', handleTimeUpdate)

  //   return () => {
  //     ref.removeEventListener('timeupdate', handleTimeUpdate)
  //   }
  // }, [])

  return (
    <>
      <audio src={track_file} ref={audioRef}></audio>
      <S.BarDiv>
        <S.BarContentDiv>
          <S.TimeCode>
            {currentTime} / {duration}
          </S.TimeCode>

          {/* {audioRef ? <p>audioRef</p> : <p>NULL</p>} */}
          <ProgressInputTrack ref={audioRef} />

          <S.BarPlayerBlockDiv>
            <S.BarPlayerDiv>
              <S.PlayerControlsDiv>
                <S.PlayerBtnPrevDiv onClick={awaitImplementation}>
                  <S.PlayerBtnPrevSvg alt="prev">
                    <use xlinkHref="img/icon/sprite.svg#icon-prev" />
                  </S.PlayerBtnPrevSvg>
                </S.PlayerBtnPrevDiv>

                {isPlaying ? (
                  <S.PlayerBtnPlayDiv className="_btn" onClick={handleStop}>
                    <S.PlayerBtnPlaySvg alt="stop">
                      <use xlinkHref="img/icon/sprite.svg#icon-pause" />
                    </S.PlayerBtnPlaySvg>
                  </S.PlayerBtnPlayDiv>
                ) : (
                  <S.PlayerBtnPlayDiv className="_btn" onClick={handlePlay}>
                    <S.PlayerBtnPlaySvg alt="play">
                      <use xlinkHref="img/icon/sprite.svg#icon-play" />
                    </S.PlayerBtnPlaySvg>
                  </S.PlayerBtnPlayDiv>
                )}

                <S.PlayerBtnNextDiv onClick={awaitImplementation}>
                  <S.PlayerBtnNextSvg alt="next">
                    <use xlinkHref="img/icon/sprite.svg#icon-next" />
                  </S.PlayerBtnNextSvg>
                </S.PlayerBtnNextDiv>

                <S.PlayerBtnRepeatDiv
                  // className="_btn-icon"
                  onClick={handleLoop}
                >
                  <S.PlayerBtnRepeatSvg alt="repeat" $stroke={isLoop}>
                    <use xlinkHref="img/icon/sprite.svg#icon-repeat" />
                  </S.PlayerBtnRepeatSvg>
                </S.PlayerBtnRepeatDiv>

                <S.PlayerBtnShuffleDiv onClick={awaitImplementation}>
                  <S.PlayerBtnShuffleSvg alt="shuffle">
                    <use xlinkHref="img/icon/sprite.svg#icon-shuffle" />
                  </S.PlayerBtnShuffleSvg>
                </S.PlayerBtnShuffleDiv>
              </S.PlayerControlsDiv>

              <S.PlayerTrackPlayDiv>
                <S.TrackPlayContainDiv>
                  <S.TrackPlayImageDiv>
                    <S.TrackPlaySvg alt="music">
                      <use xlinkHref="img/icon/sprite.svg#icon-note" />
                    </S.TrackPlaySvg>
                  </S.TrackPlayImageDiv>
                  <S.TrackPlayAuthorDiv>
                    <S.TrackPlayAuthorLinkA href="http://">
                      {currentTrack.name}
                    </S.TrackPlayAuthorLinkA>
                  </S.TrackPlayAuthorDiv>
                  <S.TrackPlayAlbumDiv>
                    <S.TrackPlayAlbumLinkA href="http://">
                      {currentTrack.author}
                    </S.TrackPlayAlbumLinkA>
                  </S.TrackPlayAlbumDiv>
                </S.TrackPlayContainDiv>

                <S.TrackPlayLikeDisDiv>
                  <S.TrackPlayLikeDiv onClick={awaitImplementation}>
                    <S.TrackPlayLikeSvg alt="like">
                      <use xlinkHref="img/icon/sprite.svg#icon-like" />
                    </S.TrackPlayLikeSvg>
                  </S.TrackPlayLikeDiv>
                  <S.TrackPlayDislikeDiv onClick={awaitImplementation}>
                    <S.TrackPlayDislikeSvg alt="dislike">
                      <use xlinkHref="img/icon/sprite.svg#icon-dislike" />
                    </S.TrackPlayDislikeSvg>
                  </S.TrackPlayDislikeDiv>
                </S.TrackPlayLikeDisDiv>
              </S.PlayerTrackPlayDiv>
            </S.BarPlayerDiv>

            <S.BarVolumeBlockDiv>
              <S.VolumeContentDiv>
                <S.VolumeImageDiv>
                  <S.VolumeSvg alt="volume">
                    <use xlinkHref="img/icon/sprite.svg#icon-volume" />
                  </S.VolumeSvg>
                </S.VolumeImageDiv>
                <S.VolumeProgressDiv className="_btn">
                  <ProgressInputVolume ref={audioRef} />
                </S.VolumeProgressDiv>
              </S.VolumeContentDiv>
            </S.BarVolumeBlockDiv>
          </S.BarPlayerBlockDiv>
        </S.BarContentDiv>
      </S.BarDiv>
    </>
  )
}

export default AudioPlayer
