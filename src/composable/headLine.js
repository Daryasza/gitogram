import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default (props) => {
  const store = useStore()
  const router = useRouter()

  store.dispatch('user/loadUserData')

  const avatar = computed(() => store.getters['user/getAvatar'])
  const reposts = computed(() => store.getters['user/getReposts'])
  const username = computed(() => store.getters['user/getUsername'])
  const nickname = computed(() => store.getters['user/getNickname'])
  const watchers = computed(() => store.getters['user/getWatchers'])
  const repostsLink = computed(() => store.getters['user/getRepostsLink'])
  const watchersLink = computed(() => store.getters['user/getWatchersLink'])
  const isUserDataLoading = computed(() => store.getters['user/getUserDataLoadStatus'])

  const logout = () => {
    sessionStorage.removeItem('token')
    router.push({ name: 'auth' })
  }

  return {
    logout,
    avatar,
    reposts,
    username,
    nickname,
    watchers,
    repostsLink,
    watchersLink,
    isUserDataLoading
  }
}
