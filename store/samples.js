import SAMPLES from '~/static/data/samples.json'

export const state = () => ({
  singles: SAMPLES.singles,
  sets: SAMPLES.sets,
})

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
  getSingleById: (state) => (singleId) => {
    return state.singles.find((s) => s.id === singleId)
  },

  getSetById: (state) => (setId) => {
    return state.sets.find((s) => s.id === setId)
  },

  getParentsById(state, singleId) {
    return state.sets.filter((set) => set.sampleIds.includes(singleId))
  },
}
