import { useStore } from 'vuex'
import { computed } from 'vue'

export default (props) => {
  const store = useStore()

  try {
    store.dispatch('user/loadUserData')
    store.dispatch('user/loadStarredRepos')
    store.dispatch('user/loadUserRepos')
  } catch (err) {
    console.log(err)
  }

  let starCountTrigger = 0

  const avatar = computed(() => store.getters['user/getAvatar'])
  const reposts = computed(() => store.getters['user/getReposts'])
  const watchers = computed(() => store.getters['user/getWatchers'])
  const nickname = computed(() => store.getters['user/getNickname'])
  const username = computed(() => store.getters['user/getUsername'])
  const userRepos = computed(() => store.getters['user/getUserRepos'])
  const userReposCount = computed(() => store.getters['user/getUserRepos'].length)
  const repostsLink = computed(() => store.getters['user/getRepostsLink'])
  const watchersLink = computed(() => store.getters['user/getWatchersLink'])
  const starredRepos = computed(() => store.getters['user/getStarredRepos'])
  const isStarred = computed(() => (fullName) => store.getters['user/getRepoStar'](fullName))
  const isUserDataLoading = computed(() => store.getters['user/getUserDataLoadStatus'])
  const isUserReposLoading = computed(() => store.getters['user/getUserReposLoadStatus'])
  const isStarredReposLoading = computed(() => store.getters['user/getStarredReposLoadStatus'])
  const starCount = computed(() => (fullName) => {
    // eslint-disable-next-line
    starCountTrigger
    return (store.getters['user/getRepoStarCount'](fullName)
      ? store.getters['user/getRepoStarCount'](fullName)
      : 0)
  })

  const onStar = (fullName) => {
    store.dispatch(
      isStarred.value(fullName) ? 'user/unstarRepo' : 'user/starRepo',
      fullName
    )
    starCountTrigger++
  }

  return {
    onStar,
    avatar,
    reposts,
    nickname,
    username,
    watchers,
    isStarred: isStarred.value,
    starCount: starCount.value,
    userRepos,
    repostsLink,
    watchersLink,
    starredRepos,
    userReposCount,
    isUserDataLoading,
    isUserReposLoading,
    isStarredReposLoading
  }
}
