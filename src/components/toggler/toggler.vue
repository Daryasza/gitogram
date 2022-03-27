<template>
  <button v-bind:class="['btn', { active: isOpened }]" v-on:click="toggle">
    <span class="text">{{ isOpened ? 'Hide' : 'View' }} issues</span>
    <span class="triangle">
      <userIcon name="iconTriangle" />
    </span>
  </button>
</template>

<script>

import { userIcon } from '../../icons'

export default {
  components: {
    userIcon
  },
  data () {
    return {
      isOpened: false
    }
  },
  methods: {
    toggle () {
      this.isOpened = !this.isOpened
      this.$emit('onToggle', this.isOpened)
    }
  }
}
</script>

<style lang='scss' src='./toggler.scss' scoped>

</style>
