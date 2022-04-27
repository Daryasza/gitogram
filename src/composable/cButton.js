import { computed } from 'vue'

export default (hoverText) => {
  const withHoverText = computed(() => {
    return hoverText?.length
  })

  return {
    withHoverText
  }
}
