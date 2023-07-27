import SAMPLES from '~/static/data/samples.json'

export const state = () => ({
  samples: SAMPLES,
})

// ---------------------- all still old -----------------------------

export const mutations = {
  addSet(state, { singleIds, setIds, caption }) {
    state.sets.push({
      id: state.sets?.length,
      singleIds,
      setIds,
      caption,
    })
  },
}

export const getters = {
  getAllSamples: (state) => {
    return state.samples
  },

  getSingleById: (state) => (singleId) => {
    return state.singles.find((s) => s.id === singleId)
  },

  getSetById: (state) => (setId) => {
    return state.sets.find((s) => s.id === setId)
  },

  getParentsBySingleId: (state, getters) => (singleId) => {
    let parents = []
    state.sets.forEach((set) => {
      if (set.singleIds?.includes(singleId)) parents.push(set)
      parents = parents.concat(getters.getParentsBySetId(set.id))
    })
    return [...new Set(parents)]
  },

  getParentsBySetId: (state) => (setId) => {
    const parents = []
    state.sets.forEach((set) => {
      if (set.setIds?.includes(setId)) parents.push(set)
    })
    return [...new Set(parents)]
  },
}
