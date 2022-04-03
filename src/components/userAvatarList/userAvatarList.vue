<template>
  <button class="c-user-avatar" v-on:click="$emit('onAvatarClick')">
    <div class="avatar">
      <img v-bind:src="avatar" alt="user avatar" class="avatar-img">
    </div>
    <div class="username">{{ username }}</div>
  </button>
</template>

<script>
export default {
  name: 'userAvatarList',
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

<style lang='scss' scoped src="./userAvatarList.scss"></style>
