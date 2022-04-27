import { computed } from 'vue'
import { useStore } from 'vuex'

export default (props) => {
  const store = useStore()

  const formatCount = (count) => {
    return count >= 1000 ? Math.round(count / 100) / 10 + 'k' : count
  }
  const cStars = computed(() => props.stars)
  const starLoading = computed(() => store.getters['user/getStarLoadStatus'](props.fullName))

  return {
    cStars,
    formatCount,
    starLoading
  }
}
