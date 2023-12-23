import { createSlice } from '@reduxjs/toolkit'

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    currentTrack: {},
    playList: [],
  },
  reducers: {
    setCurrentTrack(state, action) {
      // console.log(state)
      // console.log(action.payload.track)
      state.currentTrack = action.payload.track
    },
    playTrack(state, action) {
      console.log(state)
      console.log(action)
    },
    stopTrack(state, action) {},
    nextTrack(state, action) {},
    prevTrack(state, action) {},
    shuffleTrack(state, action) {},
  },
})

export const { setCurrentTrack, playTrack, stopTrack, nextTrack, prevTrack, shuffleTrack } =
  playerSlice.actions

export default playerSlice.reducer
