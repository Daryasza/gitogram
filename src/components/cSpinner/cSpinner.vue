<template>
  <div
    :style="{
      'width': size,
      'height': size,
      'border': '3px solid ' + color,
      'border-top': '3px solid transparent'
    }"
    class="spinner" />
</template>

<script>
export default {
  name: 'c-spinner',
  props: {
    size: {
      type: String,
      default: '62px'
    },
    color: {
      type: String,
      default: '#31AE54'
    }
  }
}
</script>

<style lang="scss" src="./cSpinner.scss" scoped></style>
