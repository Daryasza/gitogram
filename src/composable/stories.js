import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default (props) => {
  const store = useStore()

  const idxLocal = ref(Number(props.idx))
  const idxLocalComputed = computed(() => idxLocal)
  const moveSlider = (val = 0) => {
    idxLocal.value = Number(idxLocal.value) + val
    const fullName = store.getters['slider/getFullName'](Number(idxLocal.value))
    const readme = store.getters['slider/getReadme'](fullName)
    if (!readme) store.dispatch('slider/loadReadme', fullName)
  }
  if (props.idx) moveSlider()

  const repos = computed(() => store.getters['feeds/getRepos'])
  if (!repos.value.length) store.dispatch('feeds/loadTrendings')

  const sliderShift = computed(() => `transform: translateX(${idxLocal.value ? idxLocal.value * -340 : 0}px)`)
  const activeBtns = computed(() => {
    if (idxLocal.value === 0) return ['next']
    if (idxLocal.value === repos.value.length - 1) return ['prev']
    return ['next', 'prev']
  })

  return {
    activeBtns,
    moveSlider,
    sliderShift,
    repos: repos.value,
    idxLocal: idxLocal.value,
    idxLocalComputed: idxLocalComputed.value
  }
}
