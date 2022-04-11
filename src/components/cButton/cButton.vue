<template>
  <button :class="['button', 'green-theme', {'hover-text': withHoverText}]">
    <span class="button__text">
      <slot></slot>
    </span>
  </button>
</template>s

<script>
export default {
  name: 'cButton',
  props: {
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
