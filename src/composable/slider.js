import { useStore } from 'vuex'
import { computed } from 'vue'

export default (props) => {
  const store = useStore()

  const avatar = computed(() => store.getters['slider/getAvatar'](Number(props.idx)))
  const username = computed(() => store.getters['slider/getUsername'](Number(props.idx)))
  const fullName = computed(() => store.getters['slider/getFullName'](Number(props.idx)))
  const isLoading = computed(() => store.getters['slider/getLoadStatus'](props.fullNameProp))
  const readme = computed(() => store.getters['slider/getReadme'](props.fullNameProp))
  const isFollowed = computed(() => store.getters['user/getRepoStar'](props.fullNameProp))
  const starLoading = computed(() => store.getters['user/getStarLoadStatus'](props.fullNameProp))

  const followClick = () => {
    store.dispatch(
      isFollowed.value ? 'user/unstarRepo' : 'user/starRepo',
      props.fullNameProp
    )
  }

  return {
    avatar,
    readme,
    username,
    fullName,
    isLoading,
    isFollowed,
    followClick,
    starLoading
  }
}
