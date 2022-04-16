<template>
  <button :class="['button', this.theme_color, {'hover-text': withHoverText}]">
    <span class="button__text">
      <slot></slot>
    </span>
  </button>
</template>s

<script>
export default {
  name: 'cButton',
  props: {
    theme_color: {
      type: String,
      default: 'green-theme'
    },
    hoverText: {
      type: String
    }
  },
  computed: {
    withHoverText () {
      return this.hoverText?.length
    }
  }
}
</script>

<style lang="scss" src="./cButton.scss" scoped></style>
