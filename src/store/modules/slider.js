import gateway from '../../api/requests'

export default {
  namespaced: true,
  state: {
    readme: {},
    loadStatuses: {}
  },
  getters: {
    getAvatar: (state, _, rootState) => (idx) => {
      return rootState.feeds.repos[idx] ? rootState.feeds.repos[idx].owner.avatar_url : undefined
    },
    getUsername: (state, _, rootState) => (idx) => {
      return rootState.feeds.repos[idx] ? rootState.feeds.repos[idx].owner.login : undefined
    },
    getFullName: (state, _, rootState) => (idx) => {
      return rootState.feeds.repos[idx] ? rootState.feeds.repos[idx].full_name : undefined
    },
    getLoadStatus: (state) => (fullName) => {
      return state.loadStatuses[fullName]
    },
    getReadme: (state) => (fullName) => {
      return state.readme[fullName]
    }
  },
  mutations: {
    UPDATE_LOAD_STATUS (state, { fullName, status }) {
      state.loadStatuses[fullName] = status
    },
    ADD_README (state, { fullName, readme }) {
      state.readme[fullName] = readme
    }
  },
  actions: {
    loadReadme (state, fullName) {
      state.commit('UPDATE_LOAD_STATUS', { fullName: fullName, status: true })
      gateway(
        `/repos/${fullName}/readme`,
        'get',
        { Accept: 'application/vnd.github.v3.html+json' }
      )
        .then(resp => {
          state.commit('ADD_README', { fullName: fullName, readme: resp.data })
          state.commit('UPDATE_LOAD_STATUS', { fullName: fullName, status: false })
        })
        .catch(err => {
          state.commit('UPDATE_LOAD_STATUS', { fullName: fullName, status: false })
          console.log(err)
        })
    }
  }
}
