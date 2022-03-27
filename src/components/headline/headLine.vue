<template>
  <div class="c-headline">
    <div class="x-container">
      <div class="topline">
      <slot name="topline" />
    </div>
    <div class="content" v-if="$slots.content">
      <slot name="content" />
    </div>
  </div>
  </div>
</template>

<style lang="scss" src="./headline.scss" scoped></style>
