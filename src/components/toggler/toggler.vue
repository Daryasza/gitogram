<template>
  <div class="btn-wrapper">
    <button v-bind:class="['btn', { active: isOpened }]" @click="toggle">
      <span class="text">{{ isOpened ? 'Hide' : 'Show' }} issues</span>
      <span class="triangle">
        <userIcon name="iconTriangle" />
      </span>
    </button>
  </div>
</template>

<script>
import { ref } from 'vue'
import { userIcon } from '../../icons'

export default {
  name: 'toggler',
  components: {
    userIcon
  },
  emits: ['toggle'],
  setup (props, { emit }) {
    const isOpened = ref(false)
    const toggle = () => {
      isOpened.value = !isOpened.value
      emit('toggle', isOpened.value)
    }

    return {
      isOpened,
      toggle
    }
  }
}
</script>

<style lang='scss' src='./toggler.scss' scoped>

</style>
