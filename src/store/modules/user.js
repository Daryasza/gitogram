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
    userRepos: [],
    starredRepos: [],
    starredMap: {},
    starLoadingMap: {},
    follow: [],
    followMap: {},
    followLoadingMap: {},
    isFollowDataLoading: false,
    isUserDataLoading: false,
    isUserReposLoading: false,
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
    getUserRepos (state) {
      return state.userRepos
    },
    getRepoStar: (state) => (fullName) => {
      return !!state.starredMap[fullName]
    },
    getRepoStarCount: (state) => (fullName) => {
      return state.starredRepos.find(
        item => item.full_name === fullName
      )?.stargazers_count
    },
    getStarLoadStatus: (state) => (fullName) => {
      return !!state.starLoadingMap[fullName]
    },
    getFollow (state) {
      return state.follow
    },
    getFollowObject: (state) => (login) => {
      return !!state.followMap[login]
    },
    getFollowCount (state) {
      return Object.values(state.followMap).filter(
        item => item
      ).length
    },
    getFollowDataLoadStatus (state) {
      return state.isFollowDataLoading
    },
    getFollowObjectLoadStatus: (state) => (login) => {
      return !!state.followLoadingMap[login]
    },
    getUserDataLoadStatus (state) {
      return state.isUserDataLoading
    },
    getStarredReposLoadStatus (state) {
      return state.isStarredReposLoading
    },
    getUserReposLoadStatus (state) {
      return state.isUserReposLoading
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
    UPDATE_USER_REPOS (state, payload) {
      state.userRepos = payload
    },
    UPDATE_REPO_DATA (state, { fullName, data }) {
      const idx = state.starredRepos.findIndex(
        item => item.full_name === fullName
      )
      if (idx > -1) {
        state.starredRepos[idx] = data
      } else {
        state.starredRepos.push(data)
      }
    },
    UPDATE_STARRED_MAP (state, { fullName, starred }) {
      state.starredMap[fullName] = starred
    },
    UPDATE_FOLLOW (state, data) {
      state.follow = data
    },
    UPDATE_FOLLOW_ITEM (state, { login, following }) {
      const idx = state.follow.findIndex(
        item => item.login === login
      )
      if (idx !== undefined) {
        state.follow[idx] = following
      }
    },
    UPDATE_FOLLOW_MAP (state, { login, following }) {
      state.followMap[login] = following
    },
    UPDATE_FOLLOW_DATA_LOADING (state, payload) {
      state.isFollowDataLoading = payload
    },
    UPDATE_FOLLOW_LOADING_MAP (state, { login, status }) {
      state.followLoadingMap[login] = status
    },
    UPDATE_USER_DATA_LOADING (state, payload) {
      state.isUserDataLoading = payload
    },
    UPDATE_STAR_MAP (state, { fullName, status }) {
      state.starLoadingMap[fullName] = status
    },
    UPDATE_STARRED_REPOS_LOADING (state, payload) {
      state.isStarredReposLoading = payload
    },
    UPDATE_USER_REPOS_LOADING (state, payload) {
      state.isUserReposLoading = payload
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
        })
        .catch(err => { console.log(err) })
        .finally(() => state.commit('UPDATE_USER_DATA_LOADING', false))
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
        })
        .catch(err => { console.log(err) })
        .finally(() => state.commit('UPDATE_STARRED_REPOS_LOADING', false))
    },
    loadFollowData (state) {
      state.commit('UPDATE_FOLLOW_DATA_LOADING', true)

      gateway(
        '/user/following',
        'get',
        {
          Authorization: `token ${sessionStorage.getItem('token')}`
        })
        .then(resp => {
          state.commit('UPDATE_FOLLOW', resp.data)
          for (const item of resp.data) {
            state.commit('UPDATE_FOLLOW_MAP', { login: item.login, following: true })
          }
        })
        .catch(err => { console.log(err) })
        .finally(() => state.commit('UPDATE_FOLLOW_DATA_LOADING', false))
    },
    followObject (state, login) {
      state.commit('UPDATE_FOLLOW_LOADING_MAP', { login, status: true })
      gateway(
        `/user/following/${login}`,
        'put',
        {
          Authorization: `token ${sessionStorage.getItem('token')}`,
          Accept: 'application/vnd.github.v3+json'
        }
      )
        .then(() => {
          state.commit('UPDATE_FOLLOW_MAP', { login, following: true })
        })
        .catch(err => console.log(err))
        .finally(() => state.commit('UPDATE_FOLLOW_LOADING_MAP', { login, status: false }))
    },
    unfollowObject (state, login) {
      state.commit('UPDATE_FOLLOW_LOADING_MAP', { login, status: true })
      gateway(
        `/user/following/${login}`,
        'delete',
        {
          Authorization: `token ${sessionStorage.getItem('token')}`,
          Accept: 'application/vnd.github.v3+json'
        }
      )
        .then(() => {
          state.commit('UPDATE_FOLLOW_MAP', { login, following: false })
        })
        .catch(err => console.log(err))
        .finally(() => state.commit('UPDATE_FOLLOW_LOADING_MAP', { login, status: false }))
    },
    loadUserRepos (state) {
      state.commit('UPDATE_USER_REPOS_LOADING', true)

      gateway(
        '/user/repos',
        'get',
        {
          Authorization: `token ${sessionStorage.getItem('token')}`
        })
        .then(resp => {
          state.commit('UPDATE_USER_REPOS', resp.data)
        })
        .catch(err => { console.log(err) })
        .finally(() => state.commit('UPDATE_USER_REPOS_LOADING', false))
    },
    starRepo (state, fullName) {
      state.commit('UPDATE_STAR_MAP', { fullName, status: true })
      gateway(
        `/user/starred/${fullName}`,
        'put',
        {
          Authorization: `token ${sessionStorage.getItem('token')}`,
          Accept: 'application/vnd.github.v3+json'
        }
      )
        .then(() => {
          state.dispatch('updateRepoData', { fullName, starred: true })
        })
        .catch(err => {
          console.log(err)
          state.commit('UPDATE_STAR_MAP', { fullName, status: false })
        })
    },
    unstarRepo (state, fullName) {
      state.commit('UPDATE_STAR_MAP', { fullName, status: true })
      gateway(
        `/user/starred/${fullName}`,
        'delete',
        {
          Authorization: `token ${sessionStorage.getItem('token')}`,
          Accept: 'application/vnd.github.v3+json'
        }
      )
        .then(() => {
          state.dispatch('updateRepoData', { fullName, starred: false })
        })
        .catch(err => {
          console.log(err)
          state.commit('UPDATE_STAR_MAP', { fullName, status: false })
        })
    },
    updateRepoData (state, { fullName, starred }) {
      gateway(
        `/repos/${fullName}`,
        'get',
        {
          Authorization: `token ${sessionStorage.getItem('token')}`,
          Accept: 'application/vnd.github.v3+json'
        }
      )
        .then((resp) => {
          state.commit('UPDATE_REPO_DATA', { fullName, data: resp.data })
          state.commit('UPDATE_STARRED_MAP', { fullName, starred })
        })
        .catch(err => { console.log(err) })
        .finally(() => state.commit('UPDATE_STAR_MAP', { fullName, status: false }))
    }
  }
}
