import { createSlice } from '@reduxjs/toolkit'

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    isPlaying: false,
    currentTrack: null,
    playList: [],
  },
  reducers: {
    setCurrentTrack(state, action) {
      state.currentTrack = action.payload.track
    },
    setPlayList(state, action) {
      state.playList = action.payload.playList
      console.log(action.payload.playList)
    },
    playTrack(state, action) {
      state.isPlaying = true
      // console.log(state)
      // console.log(action)
    },
    stopTrack(state, action) {
      state.isPlaying = false

    },
    nextTrack(state, action) {},
    prevTrack(state, action) {},
    shuffleTrack(state, action) {},
  },
})

export const { setCurrentTrack, setPlayList, playTrack, stopTrack, nextTrack, prevTrack, shuffleTrack } =
  playerSlice.actions

export default playerSlice.reducer
