import { useStore } from 'vuex'
import { computed } from 'vue'

export default (props) => {
  const store = useStore()

  try {
    store.dispatch('feeds/loadTrendings')
    store.dispatch('user/loadStarredRepos')
  } catch (err) {
    console.log(err)
  }

  const starCountTrigger = 0

  const avatar = computed(() => store.getters['feed/getAvatar'])
  const nickname = computed(() => store.getters['feed/getNickname'])
  const isLoading = computed(() => store.getters['feed/isLoading'])
  const isStarred = computed((fullName) => store.getters['feed/getRepoStar'](fullName))
  const starredRepos = computed(() => store.getters['feed/getStarredRepos'])
  const trendingRepos = computed(() => store.getters['feed/getRepos'])
  const isUserDataLoading = computed(() => store.getters['feed/getUserDataLoadStatus'])
  const isStarredReposLoading = computed(() => store.getters['feed/getStarredReposLoadStatus'])
  const starCount = computed((fullName) => {
    starCountTrigger
    store.getters['feed/getRepoStarCount'](fullName)
  })

  const onStar = (fullName) => {
    store.dispatch(
      this.isStarred(fullName) ? 'user/unstarRepo' : 'user/starRepo',
      fullName
    )
    starCountTrigger++
  }
  const onFork = (fullName) => {
    window.open(
      `https://github.com/${fullName}/fork`,
      '_blank'
    )
  }

  return {
    avatar,
    nickname,
    isLoading,
    isStarred,
    starCount,
    starredRepos,
    trendingRepos,
    isUserDataLoading,
    isStarredReposLoading
  }
}
