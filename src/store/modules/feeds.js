import gateway from '../../api/requests'

export default {
  namespaced: true,
  state: {
    repos: [],
    loading: false
  },
  getters: {
    getRepos (state) {
      return state.repos
    },
    isLoading (state) {
      return state.loading
    }
  },
  mutations: {
    UPDATE_REPOS (state, payload) {
      if (Array.isArray(payload)) {
        state.repos = payload
      }
    },
    UPDATE_LOADING (state, payload) {
      state.loading = !!payload
    }
  },
  actions: {
    loadTrendings (state, lang = 'js') {
      state.commit('UPDATE_LOADING', true)

      const addZero = (value) => value < 10 ? `0${value}` : value

      const weekMS = 7 * 24 * 60 * 60 * 1000
      const weekAgo = new Date(Date.now() - weekMS)
      const formattedDate = [
        weekAgo.getFullYear(),
        addZero(weekAgo.getMonth() + 1),
        addZero(weekAgo.getDate())
      ].join('-')

      const params = new URLSearchParams()
      params.append('order', 'desc')
      params.append('sort', 'stars')
      params.append('per_page', 10)
      params.append('q', `language:${lang} created:>${formattedDate}`)

      gateway(
        `/search/repositories?${params}`, 'get'
      )
        .then(resp => {
          state.commit('UPDATE_REPOS', resp.data.items)
          state.commit('UPDATE_LOADING', false)
        })
        .catch(err => { console.log(err) })
    }
  }
}
