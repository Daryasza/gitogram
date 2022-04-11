import gateway from '../../api/requests'

export default {
  namespaced: true,
  state: {
    issues: {},
    loadingStatuses: {}
  },
  getters: {
    getFormattedDate: (state) => (datetime) => {
      const monthNames = {
        1: 'JAN',
        2: 'FEB',
        3: 'MAR',
        4: 'APR',
        5: 'MAY',
        6: 'JUN',
        7: 'JUL',
        8: 'AUG',
        9: 'SEP',
        10: 'OCT',
        11: 'NOV',
        12: 'DEC'
      }
      const date = datetime.replace(/T.*Z/, '')

      const month = date[0] ? parseInt(date.substr(6, 2)) : parseInt(date.substr(5, 2))
      const day = date[0] ? parseInt(date.substr(8, 2)) : parseInt(date.substr(7, 2))

      return `${day} ${monthNames[month]}`
    },
    getLoadStatus: (state) => (fullName) => {
      return !!state.loadingStatuses[fullName]
    },
    getIssues: (state) => (fullName) => {
      return state.issues[fullName]
    }
  },
  mutations: {
    UPDATE_ISSUES (state, { fullName, issues }) {
      if (Array.isArray(issues)) {
        state.issues[fullName] = issues
      }
    },
    UPDATE_LOADING (state, { fullName, status }) {
      state.loadingStatuses[fullName] = !!status
    }
  },
  actions: {
    loadIssues (state, fullName) {
      state.commit('UPDATE_LOADING', { fullName: fullName, status: true })

      gateway(`/repos/${fullName}/issues`)
        .then(resp => {
          state.commit(
            'UPDATE_ISSUES', { fullName: fullName, issues: resp.data }
          )
          state.commit(
            'UPDATE_LOADING', { fullName: fullName, status: false }
          )
        })
        .catch(err => { console.log(err) })
    }
  }
}
