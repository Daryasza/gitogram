import gateway from '../../api/requests'

export default {
  namespaced: true,
  state: {
    avatar: '',
    username: '',
    nickname: '',
    reposts: '',
    repostsLink: '',
    watchers: '',
    watchersLink: '',
    starredRepos: [],
    starredMap: {},
    isUserDataLoading: false,
    isStarredReposLoading: false
  },
  getters: {
    getAvatar (state) {
      return state.avatar
    },
    getUsername (state) {
      return state.username
    },
    getNickname (state) {
      return state.nickname
    },
    getReposts (state) {
      return state.reposts
    },
    getRepostsLink (state) {
      return state.repostsLink
    },
    getWatchers (state) {
      return state.watchers
    },
    getWatchersLink (state) {
      return state.watchersLink
    },
    getStarredRepos (state) {
      return state.starredRepos
    },
    getRepoStar: (state) => (fullName) => {
      return !!state.starredMap[fullName]
    },
    getUserDataLoadStatus (state) {
      return state.isUserDataLoading
    },
    getStarredReposLoadStatus (state) {
      return state.isStarredReposLoading
    }
  },
  mutations: {
    UPDATE_AVATAR (state, payload) {
      state.avatar = payload
    },
    UPDATE_USERNAME (state, payload) {
      state.username = payload
    },
    UPDATE_NICKNAME (state, payload) {
      state.nickname = payload
    },
    UPDATE_REPOSTS (state, payload) {
      state.reposts = payload
    },
    UPDATE_REPOSTS_LINK (state, payload) {
      state.repostsLink = payload
    },
    UPDATE_WATCHERS (state, payload) {
      state.watchers = payload
    },
    UPDATE_WATCHERS_LINK (state, payload) {
      state.watchersLink = payload
    },
    UPDATE_STARRED_REPOS (state, payload) {
      state.starredRepos = payload
    },
    UPDATE_STARRED_MAP (state, { fullName, starred }) {
      state.starredMap[fullName] = starred
    },
    UPDATE_USER_DATA_LOADING (state, payload) {
      state.isUserDataLoading = payload
    },
    UPDATE_STARRED_REPOS_LOADING (state, payload) {
      state.isStarredReposLoading = payload
    }
  },
  actions: {
    loadUserData (state) {
      state.commit('UPDATE_USER_DATA_LOADING', true)

      gateway(
        '/user',
        'get',
        {
          Authorization: `token ${sessionStorage.getItem('token')}`
        })
        .then(resp => {
          state.commit('UPDATE_AVATAR', resp.data.avatar_url)
          state.commit('UPDATE_USERNAME', resp.data.name)
          state.commit('UPDATE_NICKNAME', resp.data.login)
          // TODO
          state.commit('UPDATE_REPOSTS', resp.data.public_repos)
          state.commit(
            'UPDATE_REPOSTS_LINK',
            `${resp.data.html_url}?tab=repositories`
          )
          state.commit('UPDATE_WATCHERS', resp.data.followers)
          state.commit(
            'UPDATE_WATCHERS_LINK',
            `${resp.data.html_url}?tab=followers`
          )

          state.commit('UPDATE_USER_DATA_LOADING', false)
        })
        .catch(err => { console.log(err) })
    },
    loadStarredRepos (state) {
      state.commit('UPDATE_STARRED_REPOS_LOADING', true)

      gateway(
        '/user/starred',
        'get',
        {
          Authorization: `token ${sessionStorage.getItem('token')}`
        })
        .then(resp => {
          state.commit('UPDATE_STARRED_REPOS', resp.data)
          for (const repo of resp.data) {
            state.commit('UPDATE_STARRED_MAP', { fullName: repo.full_name, starred: true })
          }
          state.commit('UPDATE_STARRED_REPOS_LOADING', false)
        })
        .catch(err => { console.log(err) })
    },
    starRepo (state, fullName) {
      gateway(
        `/user/starred/${fullName}`,
        'put',
        {
          Authorization: `token ${sessionStorage.getItem('token')}`,
          Accept: 'application/vnd.github.v3+json'
        }
      )
        .then(() => {
          state.commit('UPDATE_STARRED_MAP', { fullName, starred: true })
        })
        .catch(err => { console.log(err) })
    },
    unstarRepo (state, fullName) {
      gateway(
        `/user/starred/${fullName}`,
        'delete',
        {
          Authorization: `token ${sessionStorage.getItem('token')}`,
          Accept: 'application/vnd.github.v3+json'
        }
      )
        .then(() => {
          state.commit('UPDATE_STARRED_MAP', { fullName, starred: false })
        })
        .catch(err => { console.log(err) })
    }
  }
}
