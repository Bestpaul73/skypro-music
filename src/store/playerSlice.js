import { createSlice } from '@reduxjs/toolkit'

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    currentTrack1: {},
    playList: [],
  },
  reducers: {
    setCurrentTrack(state, action) {
      console.log(state)
      console.log(action)
      state.player.currentTrack = action.payload
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
