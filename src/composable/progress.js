import { computed, onMounted } from 'vue'

export default (props, cprogress) => {
  const isActive = computed(() => { return props.active })

  onMounted(() => {
    setTimeout(() => {
      if (props.active) {
        cprogress.value.classList.toggle('c-progress-active')
        setTimeout(() => {
          cprogress.value.classList.toggle('c-progress-active')
        }, 30)
      }
    }, 30)
  })

  return {
    isActive
  }
}
