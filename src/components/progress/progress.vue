<template>
  <div :class="{active: isActive}" class="c-progress">
    <div ref="indicator" class="indicator"></div>
  </div>
</template>

<script>
export default {
  name: 'c-progress',
  data () {
    return {
      isActive: false
    }
  },
  emits: ['onFinish'],
  methods: {
    emitOnFinish() {
      this.$emit('onFinish')
    }
  },
  mounted () {
    window.addEventListener('load', () => {
      this.isActive = true
    })

    this.$refs.indicator.addEventListener('transitionend', this.emitOnFinish)
  },
  beforeUnmount() {
    this.$refs.indicator.removeEventListener('transitionend', this.emitOnFinish)
  }
}
</script>

<style scoped lang='scss' src='./progress.scss'></style>
