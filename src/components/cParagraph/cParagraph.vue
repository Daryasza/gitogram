<template>
  <div class="paragraph">
    <div class="paragraph-line" :style="{ width: item.width, height: item.height }" v-for="(item, i) in countObj" :key="i" />
  </div>
</template>

<script>
export default {
  name: 'c-paragraph',
  props: {
    countObj: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" src="./cParagraph.scss" scoped></style>
