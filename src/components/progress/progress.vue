<template>
  <div ref="cprogress" :class="{ 'c-progress-active': isActive }" class="c-progress">
    <div ref="indicator" class="indicator"></div>
  </div>
</template>

<script>
export default {
  name: 'c-progress',
  props: {
    active: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    isActive () {
      return this.active
    }
  },
  mounted () {
    // This is a very dirty hack, but this is the only way
    setTimeout(() => {
      if (this.active) {
        this.$refs.cprogress.classList.toggle('c-progress-active')
        setTimeout(() => {
          this.$refs.cprogress.classList.toggle('c-progress-active')
        }, 30)
      }
    }, 30)
  }
}
</script>

<style scoped lang='scss' src='./progress.scss'></style>
