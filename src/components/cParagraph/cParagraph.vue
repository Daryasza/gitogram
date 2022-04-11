<template>
  <div class="paragraph">
    <div class="paragraph-line" v-for="i in count" :key="i" />
  </div>
</template>

<script>
export default {
  name: 'c-paragraph',
  props: {
    count: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss" src="./cParagraph.scss" scoped></style>
