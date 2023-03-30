export const state = () => ({
  selectedSingleIds: [],
  selectedSetIds: [],
  caption: '',
})

export const mutations = {
  toggleSingle(state, singleId) {
    if (state.selectedSingleIds.includes(singleId)) {
      state.selectedSingleIds = state.selectedSingleIds.filter(
        (sid) => sid !== singleId
      )
    } else {
      state.selectedSingleIds.push(singleId)
    }
  },

  toggleSet(state, setId) {
    if (state.selectedSetIds.includes(setId)) {
      state.selectedSetIds = state.selectedSetIds.filter((sid) => sid !== setId)
    } else {
      state.selectedSetIds.push(setId)
    }
  },

  updateCaption(state, caption) {
    state.caption = caption
  },

  clear(state) {
    state.selectedSingleIds = []
    state.selectedSetIds = []
    state.caption = ''
  },
}
