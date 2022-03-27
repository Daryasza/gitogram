<template>
  <button class="c-userName">
    <span class="avatar">
      <img :src="avatar" alt="user avatar" class="avatar-img">
    </span>
    <span class="username">{{ username }}</span>

  </button>
</template>

<script>
export default {
  props: {
    avatar: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang='scss' scoped src="./userName.scss"></style>
