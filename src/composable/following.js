import { useStore } from 'vuex'
import { computed } from 'vue'

export default (props) => {
  const store = useStore()

  try {
    store.dispatch('user/loadUserData')
    store.dispatch('user/loadFollowData')
  } catch (err) {
    console.log(err)
  }

  const avatar = computed(() => store.getters['user/getAvatar'])
  const reposts = computed(() => store.getters['user/getReposts'])
  const watchers = computed(() => store.getters['user/getWatchers'])
  const nickname = computed(() => store.getters['user/getNickname'])
  const username = computed(() => store.getters['user/getUsername'])
  const repostsLink = computed(() => store.getters['user/getRepostsLink'])
  const watchersLink = computed(() => store.getters['user/getWatchersLink'])
  const isUserDataLoading = computed(() => store.getters['user/getUserDataLoadStatus'])
  const objectFollow = computed(() => store.getters['user/getFollow'])
  const objectFollowMap = computed(() => (login) => store.getters['user/getFollowObject'](login))
  const followCount = computed(() => store.getters['user/getFollowCount'])
  const isFollowDataLoading = computed(() => store.getters['user/getFollowDataLoadStatus'])
  const isFollowObjectLoading = computed(() => (login) => store.getters['user/getFollowObjectLoadStatus'](login))

  const onFollow = (login) => {
    store.dispatch(
      objectFollowMap.value(login) ? 'user/unfollowObject' : 'user/followObject',
      login
    )
  }

  return {
    avatar,
    reposts,
    nickname,
    username,
    watchers,
    onFollow,
    objectFollow,
    followCount,
    repostsLink,
    watchersLink,
    objectFollowMap,
    isUserDataLoading,
    isFollowDataLoading,
    isFollowObjectLoading
  }
}
