import SAMPLES from '~/static/data/samples.json'
import PROJECTS from '~/static/data/projects.json'

export const state = () => ({
  samples: SAMPLES,
  projects: PROJECTS,
})

export const mutations = {}

export const getters = {
  getAllCards: (state) => {
    return [...state.samples].concat([...state.projects])
  },

  getSampleById: (state) => (sampleId) => {
    return state.samples.find((s) => s.id === sampleId)
  },

  getProjectById: (state) => (projectId) => {
    return state.projects.find((p) => String(p.id) === String(projectId))
  },

  getRandomCards: (state, getters) => (n) => {
    const indices = []
    while (indices.length < n) {
      const randomIndex = Math.floor(Math.random() * getters.getAllCards.length)
      if (!indices.includes(randomIndex)) indices.push(randomIndex)
    }
    return indices.map((i) => getters.getAllCards[i])
  },

  getRandomProject: (state) => () => {
    const p = [...state.projects].filter((p) => p.type === 'project')
    const randomIndex = Math.floor(Math.random() * p.length)
    return p[randomIndex]
  },

  getRandomSet: (state) => () => {
    const p = [...state.projects].filter((p) => p.type === 'set')
    const randomIndex = Math.floor(Math.random() * p.length)
    return p[randomIndex]
  },

  getParentsBySampleId: (state, getters) => (singleId) => {
    let parents = []
    state.projects.forEach((set) => {
      if (set.singleIds?.includes(singleId)) parents.push(set)
      parents = parents.concat(getters.getParentsBySetId(set.id))
    })
    return [...new Set(parents)]
  },

  getParentsBySetId: (state) => (setId) => {
    const parents = []
    state.projects.forEach((set) => {
      if (set.setIds?.includes(setId)) parents.push(set)
    })
    return [...new Set(parents)]
  },
}
