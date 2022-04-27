<template>
  <div ref="cprogress" :class="{ 'c-progress-active': isActive }" class="c-progress">
    <div ref="indicator" class="indicator"></div>
  </div>
</template>

<script>
import { ref } from 'vue'
import progress from '../../composable/progress'

export default {
  name: 'c-progress',
  props: {
    active: {
      type: Boolean,
      required: true
    }
  },
  setup (props) {
    const cprogress = ref(null)
    const { isActive } = progress(props, cprogress)

    return {
      isActive,
      cprogress
    }
  }
}
</script>

<style scoped lang='scss' src='./progress.scss'></style>
