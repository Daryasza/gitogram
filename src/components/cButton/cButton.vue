<template>
  <button :class="['button', this.theme_color, {'hover-text': withHoverText}]">
    <span class="button__text">
      <slot></slot>
    </span>
  </button>
</template>s

<script>
import cButton from '../../composable/cButton'

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
  setup (props) {
    const { withHoverText } = cButton(props.hoverText)

    return {
      withHoverText
    }
  }
}
</script>

<style lang="scss" src="./cButton.scss" scoped></style>
