import { createSlice } from '@reduxjs/toolkit'

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    currentTrack: null,
    playList: [],
  },
  reducers: {
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

export const { playTrack, stopTrack, nextTrack, prevTrack, shuffleTrack } =
  playerSlice.actions

export default playerSlice.reducer
