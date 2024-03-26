import { createSlice, current } from '@reduxjs/toolkit'
import { tracksApi } from './api/tracksApi'

const shuffle = (array) => {
  if (array?.length > 0) {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }
}

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    isPlaying: false,
    isShuffle: false,
    currentTrack: null,
    currentTrackId: null,
    playList: [],
    shuffledPlayList: [],
    ordinalPlayList: [],
    filteredPlayList: [],
    filters: {
      authors: [],
      dateOrder: 'По умолчанию',
      genre: [],
    },
    searchString: [],
  },
  reducers: {
    setCurrentTrack(state, action) {
      state.isPlaying = true
      state.currentTrack = action.payload.track
      state.currentTrackId = state.playList.findIndex(
        (el) => el.id === state.currentTrack.id,
      )
      // console.log(state.currentTrackId)
    },

    clearCurrentTrack(state) {
      state.isPlaying = false
      state.isShuffle = false
      state.currentTrack = null
      state.currentTrackId = null
    },

    setOrdinalPlayList(state, action) {
      state.ordinalPlayList = action.payload.playList
      console.log(state.ordinalPlayList)
    },

    setPlayList(state) {
      state.playList = state.isShuffle
        ? shuffle(state.ordinalPlayList)
        : state.ordinalPlayList
      // state.shuffledPlayList = action.payload.playList
      // state.ordinalPlayList = action.payload.playList
      // console.log(state.isShuffle, state.playList)
    },

    playTrack(state) {
      state.isPlaying = true
    },

    stopTrack(state) {
      state.isPlaying = false
    },

    nextTrack(state) {
      if (state.playList[state.currentTrackId + 1]) {
        state.currentTrack = state.playList[state.currentTrackId + 1]
        state.currentTrackId++
      }
    },

    prevTrack(state) {
      if (state.playList[state.currentTrackId - 1]) {
        state.currentTrack = state.playList[state.currentTrackId - 1]
        state.currentTrackId--
      }
    },

    shuffleTrack(state) {
      state.isShuffle = !state.isShuffle
    },

    changeTrackLike(state, action) {
      const { isLiked } = action.payload
      state.currentTrack.isLiked = isLiked
    },

    setFilters(state, action) {
      const { filterName, filterValue } = action.payload

      if (filterName === 'dateOrder') {
        state.filters[filterName] = filterValue
        return
      }

      if (state.filters[filterName].includes(filterValue)) {
        state.filters[filterName] = state.filters[filterName].filter(
          (el) => el.toLowerCase() !== filterValue.toLowerCase(),
        )
        // console.log(Object.values(state.filters[filterName]))
      } else {
        state.filters[filterName].push(filterValue)
        // console.log(Object.values(state.filters[filterName]))
      }
    },

    searchTracks(state, action) {
      state.searchString = action.payload.value
    },

    clearSearchString(state) {
      state.searchString = []
    },
  },

  // extraReducers: (builder) => {
  //   builder.addMatcher(
  //     tracksApi.endpoints.setLike.matchFulfilled,
  //     (state, { payload }) => {
  //       console.log(payload)
  //     },
  //   )
  // },
})

export const {
  setCurrentTrack,
  clearCurrentTrack,
  setOrdinalPlayList,
  setPlayList,
  playTrack,
  stopTrack,
  nextTrack,
  prevTrack,
  shuffleTrack,
  setFilters,
  changeTrackLike,
  searchTracks,
  clearSearchString,
} = playerSlice.actions

export default playerSlice.reducer
